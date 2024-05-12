import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from "../../Config/Config";
import { serverTimestamp, addDoc, collection, updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";

export default function ContactUs() {
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);

    const navigate = useNavigate();
    const scrollRef = useRef();
    const form = useRef();

    const getUserDetails = async (userId) => {
        const userRef = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            return userSnapshot.data();
        }
        return null;
    };

    useEffect(() => {
        const unsubscribeAuthStateChange = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                const user = await getUserDetails(currentUser.uid);
                setUserDetails(user);
            }
            setIsLoading(false);
        });

        return () => {
            unsubscribeAuthStateChange();
        };
    }, []);

    const sendEmail = async (e) => {
        e.preventDefault();
        const formFields = form.current.elements;
        const isFormValid = Array.from(formFields).every((field) => field.value.trim());
        if (!isFormValid) {
            toast.error('Please fill all the required fields.');
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        setIsLoading(true);

        const currentUser = auth.currentUser;

        if (!currentUser) {
            toast.error('Please log in to send a message.');
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }

        const userDetails = await getUserDetails(currentUser.uid);

        const queryData = {
            userID: currentUser.uid,
            name: userDetails.name,
            email: userDetails.email,
            phoneNumber: userDetails.contact,
            subject: formFields.subject.value,
            message: formFields.message.value,
            status: '',
            timestamp: serverTimestamp(),
        };

        try {
            const queryCollectionRef = collection(db, 'QueryUsers');
            const queryDocRef = await addDoc(queryCollectionRef, queryData);

            const userDocRef = doc(db, currentUser.userType === 'businessUser' ? 'businessUsers' : 'users', currentUser.uid);
            await updateDoc(userDocRef, {
                queriesID: arrayUnion(queryDocRef.id)
            });

            setIsLoading(false);
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            toast.success('Query Send Successfully. Our Team will contact you soon!!');
            form.current.reset();
        } catch (error) {
            setIsLoading(false);
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            toast.error('Error Sending Query. Please try again later.');
        }
    };
    return (
        <>
            <div ref={scrollRef}></div>
            <ToastContainer />
            <section id="contact" className="contact">
                {isLoading && <Loader />}
                <div data-aos="fade-up">
                    <iframe title="Map" style={{ border: "0", width: "100%", height: "500px" }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14286.087557786579!2d73.12240940000001!3d26.47113625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3941eb503dfe3405%3A0xaf4fefb973fa386d!2sIIT%20Jodhpur!5e0!3m2!1sen!2sin!4v1715415692189!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="container" data-aos="fade-up">
                    <div className="row mt-2">
                        <div className="col-lg-4">
                            <div className="info">
                                <div className="address">
                                    <Link aria-current="page" to="https://www.google.com/maps/dir//Department+of+Chemical+Engineering,+IIT+JODHPUR+F4H8%2BQPJ+Jheepasani,+Rajasthan+342027/@26.479463,73.1167625,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3941eb6948155ff7:0xa9e0e0bb6d7a1c5d!2m2!1d73.1167625!2d26.479463" target="_blank" rel="noopener noreferrer"><i className="bi bi-geo-alt"></i></Link>
                                    <h4>Location:</h4>
                                    <p>NH 62, Surpura Bypass Rd</p>
                                    <p>Karwar, Jodhpur, Rajasthan</p>
                                    <p>342030</p>
                                </div>
                                <div className="email">
                                    <Link aria-current="page" to="mailto: office_che@iitj.ac.inn" target="_blank" rel="noopener noreferrer"><i className="bi bi-envelope"></i></Link>
                                    <h4>Email:</h4>
                                    <p>exchangeIITJ@gmail.com</p>
                                </div>
                                <div className="phone">
                                    <Link aria-current="page" to="tel:+91-291-2801702"><i className="bi bi-phone"></i></Link>
                                    <h4>Call:</h4>
                                    <p>+91 865-742-0799</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 mt-5 mt-lg-0 ">
                            <form ref={form} onSubmit={sendEmail} className="php-email-form">
                                <div className="row">
                                    <div className="form-group mt-3">
                                        <input type="text" name="user_name" className="form-control" id="name" placeholder="Full Name" value={userDetails ? userDetails.name : ''} readOnly required />
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "1rem" }}>
                                    <div className="col-md-6 form-group mt-3 mt-md-0">
                                        <input type="email" className="form-control" name="user_email" id="email" placeholder="Registered Email Address" value={userDetails ? userDetails.email : ''} readOnly required />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <input type="text" name="phone_number" className="form-control" id="phone_number" placeholder="Mobile Number" value={userDetails ? `${'+91'} ${userDetails.contact}` : ''} readOnly required />
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                                </div>
                                <div className="form-group mt-3">
                                    <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                                </div>
                                <div className="text-center"><button type="submit" value="Send">Send Message</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};
