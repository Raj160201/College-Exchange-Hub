import React, { useState, useContext, useRef } from "react";
import { GoogleButton } from 'react-google-button';
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "../../Config/Config";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../Context/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserRegister() {
    const navigate = useNavigate();
    const { dispatch, setUserType } = useContext(AuthContext);

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const scrollRef = useRef();

    const handleGoogleClick = async () => {
        try {
            const data = await signInWithPopup(auth, provider);
            const user = data.user;
            const userRef = db.collection('users').doc(user.uid);
            setUserType("user");
            dispatch({ type: "LOGIN", payload: user });

            const docSnapshot = await userRef.get();

            if (docSnapshot.exists) {
                const existingData = docSnapshot.data();
                await userRef.update({
                    FirstName: user.displayName.split(' ')[0],
                    LastName: user.displayName.split(' ')[1],
                    Email: user.email,
                    Address: existingData.Address || '',
                    Phone: existingData.Phone || '',
                });
            } else {
                await userRef.set({
                    FirstName: user.displayName.split(' ')[0],
                    LastName: user.displayName.split(' ')[1],
                    Email: user.email,
                    GoogleUID: user.uid,
                    userType: 'user',
                    Address: '',
                    Phone: '',
                });
            }
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            toast.success('Login Successful. You will now automatically get redirected to the Home page');

            setTimeout(() => {
                navigate('/');
            }, 3300);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordsMatch(confirmPassword === newPassword);
    };

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        setPasswordsMatch(password === newConfirmPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (password !== confirmPassword) {
                setPasswordsMatch(false);
                return;
            }

            const credentials = await auth.createUserWithEmailAndPassword(email, password);
            await credentials.user.sendEmailVerification();

            await db.collection("users").doc(credentials.user.uid).set({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                userType: 'user',
                Address: '',
                Phone: '',
            });

            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            toast.success("Signup Successful. Please check your email for verification. You will be redirect to Login Page!!");
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 3500);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <div ref={scrollRef}></div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                        <input
                            type="text"
                            id="userFirstName"
                            className="form-control"
                            required
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstName}
                        />
                        <label className="form-label" htmlFor="userFirstName">
                            First Name
                            <span
                                className="required-field"
                                style={{ color: "var(--color-primary)" }}
                            >
                                *
                            </span>
                        </label>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="form-outline">
                        <input
                            type="text"
                            id="userLastName"
                            className="form-control"
                            required
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastName}
                        />
                        <label className="form-label" htmlFor="userLastName">
                            Last Name
                            <span
                                className="required-field"
                                style={{ color: "var(--color-primary)" }}
                            >
                                *
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="form-outline mb-4">
                <input
                    type="email"
                    id="userEmail"
                    className="form-control"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label className="form-label" htmlFor="userEmail">
                    Email Address
                    <span
                        className="required-field"
                        style={{ color: "var(--color-primary)" }}
                    >
                        *
                    </span>
                </label>
            </div>

            <div className="form-outline mb-4">
                <input
                    type="password"
                    id="userPass"
                    className={`form-control ${passwordsMatch ? "" : "is-invalid"}`}
                    onChange={handlePasswordChange}
                    value={password}
                    required
                />
                <label className="form-label" htmlFor="userPass">
                    Password
                    <span
                        className="required-field"
                        style={{ color: "var(--color-primary)" }}
                    >
                        *
                    </span>
                </label>
                {!passwordsMatch && (
                    <div className="invalid-feedback">Passwords do not match.</div>
                )}
            </div>

            <div className="form-outline mb-4">
                <input
                    type="password"
                    id="confirmPass"
                    className={`form-control ${passwordsMatch ? "" : "is-invalid"}`}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
                <label className="form-label" htmlFor="confirmPass">
                    Confirm Password
                    <span
                        className="required-field"
                        style={{ color: "var(--color-primary)" }}
                    >
                        *
                    </span>
                </label>
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-block mb-4"
                onClick={handleSubmit}
            >
                Sign up as User
            </button>

            <div className="text-center">
                <p>
                    Already have an account?{" "}
                    <Link aria-current="page" to="/login">
                        Login
                    </Link>
                </p>
                <p>or sign in with:</p>
                <div className='max-w-[240px] py-3' style={{ margin: 'auto auto auto 115px' }}>
                    <GoogleButton onClick={handleGoogleClick} />
                </div>
            </div>
        </>
    );
}
