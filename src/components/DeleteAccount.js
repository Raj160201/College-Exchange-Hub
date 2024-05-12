import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Config/Config';
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { query, deleteDoc, doc, where, collection, getDocs } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import './Contact/style.css';

export default function DeleteAccount() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authInstance = getAuth();
    const user = authInstance.currentUser;

    const handleDeleteAccount = async () => {
        if (!email || !password) {
            toast.error('Please enter both email and password.');
            return;
        }

        const userQuery = query(collection(db, 'users'), where('Email', '==', email));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
            toast.error('User with the provided email not found.');
            return;
        }

        const userDocument = userSnapshot.docs[0];
        const userDocRef = doc(db, 'users', userDocument.id);

        // Reauthenticate user before deletion
        const credential = EmailAuthProvider.credential(email, password);

        try {
            await reauthenticateWithCredential(user, credential);

            await deleteDoc(userDocRef);
            await deleteUser(user);

            toast.success('Account Deleted Successfully!!');
            setTimeout(() => {
                navigate('/login');
            }, 2500);
        } catch (error) {
            toast.error('Authentication failed. Please check your email and password.');
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center" style={{ margin: '130px' }}>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="card text-center" style={{ width: '500px' }}>
                    <div className="card-header h5 text-white bg-primary">Delete Account</div>
                    <div className="card-body px-5">
                        <p className="card-text py-3">
                            Enter the email address and password associated with the account you want to delete. All user data like name, phone, email related to the account will be deleted.
                        </p>
                        <div className="form-outline">
                            <input
                                type="email"
                                id="typeEmail"
                                className="form-control my-3"
                                placeholder="Registered Email Address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="form-label" htmlFor="typeEmail"></label>
                        </div>
                        <div className="form-outline mb-0">
                            <input
                                type="password"
                                id="typePassword"
                                className="form-control my-3"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="form-label" htmlFor="typePassword"></label>
                        </div>
                        <button className="btn btn-primary w-100" onClick={handleDeleteAccount}>
                            Delete Account
                        </button>
                        <div className="d-flex justify-content-between mt-4">
                            <Link aria-current="page" to="/login">
                                Login
                            </Link>
                            <Link aria-current="page" to="/register">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
