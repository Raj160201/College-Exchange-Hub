import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Config/Config";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import "../Contact/style.css";

export default function PasswordReset() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        try {
            if (!email) {
                toast.error('Please enter your email address.');
                return;
            }

            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent. Check your email inbox.');
            setTimeout(() => {
                navigate('/login');
            }, 2500);
        } catch (error) {
            toast.error(error.message);
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
                    theme="light" />
                <div className="card text-center" style={{ width: '500px' }}>
                    <div className="card-header h5 text-white bg-primary">Password Reset</div>
                    <div className="card-body px-5">
                        <p className="card-text py-2">
                            Enter your email address and we'll send you an email with instructions to reset your password.
                        </p>
                        <div className="form-outline">
                            <input
                                type="email"
                                id="typeEmail"
                                className="form-control my-3"
                                placeholder='Registered Email Address'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="form-label" htmlFor="typeEmail"></label>
                        </div>
                        <button className="btn btn-primary w-100" onClick={handleForgotPassword}>
                            Reset password
                        </button>
                        <div className="d-flex justify-content-between mt-4">
                            <Link aria-current="page" to="/login">Login</Link>
                            <Link aria-current="page" to="/register">Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
