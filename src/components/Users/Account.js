import React, { useState, useEffect } from 'react'
import "./style.css";
import { auth, db } from "../../Config/Config";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, serverTimestamp, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function Account() {
    const [user, setUser] = useState(null);
    const [data, setData] = useState({ contact: '' });
    const [selectedColleges, setSelectedColleges] = useState([]);
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        renewPassword: ''
    });
    const [reauthPassword, setReauthPassword] = useState('');

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribeAuthStateChange = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const uid = user.uid;
                    const userRef = doc(db, 'users', uid);

                    setIsLoading(true);

                    const docSnapshot = await getDoc(userRef);

                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        setUser(userData);
                        setData({ contact: userData.contact });
                    } else {
                        setUser({
                            name: '',
                            email: '',
                            contact: '',
                        });
                    }
                } catch (error) {
                    toast.error(error.message);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        });

        return () => {
            unsubscribeAuthStateChange();
        };
    }, []);

    const handleEditProfileSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const currentUser = auth.currentUser;

        if (currentUser) {
            const uid = currentUser.uid;
            const userRef = doc(db, 'users', uid);

            try {
                await updateDoc(userRef, {
                    ...data,
                });
                toast.success(
                    'Successfully Updated. You will now automatically get redirected to the Home page'
                );
                setTimeout(() => {
                    navigate('/');
                }, 2200);
            } catch (err) {
                toast.error(err.message);
            }
        }
        setIsLoading(false);
    };

    const handleChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value });
    };

    const handlePasswordChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setPasswordData({ ...passwordData, [id]: value });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const { newPassword, renewPassword } = passwordData;

        if (newPassword !== renewPassword) {
            toast.error("The entered new passwords do not match!");
            setPasswordData({
                newPassword: '',
                renewPassword: ''
            })
            setReauthPassword('')
            return;
        }

        if (reauthPassword === newPassword) {
            toast.info("Your password remains unchanged as it matches your current password!");
            setPasswordData({
                newPassword: '',
                renewPassword: ''
            })
            setReauthPassword('')
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(auth.currentUser.email, reauthPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);

            await auth.currentUser.updatePassword(newPassword);

            toast.success("Your password has been successfully updated!");
            setPasswordData({
                newPassword: '',
                renewPassword: ''
            })
            setReauthPassword('')
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            toast.error("Current Password is wrong!");
            setPasswordData({
                newPassword: '',
                renewPassword: ''
            })
            setReauthPassword('')
        }
    };

    return (
        <>
            <section className="section profile" style={{ marginTop: '30px' }}>
                {isLoading && <Loader />}
                <ToastContainer
                    position="top-right"
                    autoClose={2400}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" />
                <div className="row">
                    <div className="col-xl-8" style={{ margin: 'auto' }}>
                        <div className="card">
                            <div className="card-body pt-3">
                                <ul className="nav nav-tabs nav-tabs-bordered">

                                    <li className="nav-item">
                                        <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                                    </li>

                                    <li className="nav-item">
                                        <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                                    </li>

                                </ul>
                                <div className="tab-content pt-2">

                                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                        <h5 className="card-title">Profile Details</h5>
                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label ">Name</div>
                                            <div className="col-lg-9 col-md-8">{user ? user.name : ''}</div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Phone</div>
                                            <div className="col-lg-9 col-md-8">+91 {user ? user.contact : ''}</div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Email</div>
                                            <div className="col-lg-9 col-md-8">{user ? user.email : ''}</div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-lg-3 col-md-4 label">My Reviews</div>
                                            <div className="col-lg-9 col-md-8">
                                                {user && user.myReviews && user.myReviews.length > 0 ? (
                                                    <ul>
                                                        {user.myReviews.map((review, index) => (
                                                            <li key={index}>{review}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No reviews available</p>
                                                )}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                        <form onSubmit={handleEditProfileSubmit}>
                                            <div className="row mb-3">
                                                <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Name</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input name="fullName" type="text" className="form-control" id="fullName" value={user ? user.name : ''} readOnly />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="contact" className="col-md-4 col-lg-3 col-form-label">Phone<span className="required-field" style={{ color: "var(--color-primary)" }}>*</span></label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input name="phone" type="text" className="form-control" id="contact" value={data.contact} onChange={handleChange} required />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Email </label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input name="email" type="email" className="form-control" id="Email" value={user ? user.email : ''} readOnly />
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="tab-pane fade pt-3" id="profile-change-password">
                                        <form onSubmit={handleChangePassword}>
                                            <div className="row mb-3">
                                                <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password<span className="text-danger"> *</span></label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input
                                                        name="reauthPassword"
                                                        type="password"
                                                        className="form-control"
                                                        id="reauthPassword"
                                                        autoComplete="current-password"
                                                        value={reauthPassword}
                                                        onChange={(e) => setReauthPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password<span className="text-danger"> *</span></label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input
                                                        name="newPassword"
                                                        type="password"
                                                        className="form-control"
                                                        id="newPassword"
                                                        autoComplete="new-password"
                                                        value={passwordData.newPassword}
                                                        onChange={handlePasswordChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password<span className="text-danger"> *</span></label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input
                                                        name="renewPassword"
                                                        type="password"
                                                        className="form-control"
                                                        id="renewPassword"
                                                        autoComplete="renew-password"
                                                        value={passwordData.renewPassword}
                                                        onChange={handlePasswordChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary">Change Password</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
