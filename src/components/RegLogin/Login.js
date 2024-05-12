import React, { useContext, useState, useRef } from "react";
import { GoogleButton } from 'react-google-button';
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "../../Config/Config";
import { doc, getDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../Context/AuthContext";
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();
  const { dispatch, setUserType } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        setIsLoading(true);
        const user = userCredential.user;

        if (user.emailVerified) {
          const userDocRef = doc(db, "users", user.uid);

          try {
            const userDocSnapshot = await getDoc(userDocRef);
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });

            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              setUserType("users");
              dispatch({ type: "LOGIN", payload: user });
              toast.success('Login Successful. You will now automatically get redirected to the Home page.');
              setTimeout(() => {
                navigate('/');
              }, 2700);
            } else {
              toast.error('User data not found.');
            }
            setEmail('');
            setPassword('');
            setIsLoading(false);
          } catch (error) {
            toast.error(error.message);
          }
        } else {
          toast.error('Please verify your email address before logging in.');
          setIsLoading(false);
        }
      })
      .catch(error => toast.error(error.message));
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    navigate("/passwordReset");
  };

  return (
    <>
      <div ref={scrollRef}></div>
      {isLoading && <Loader />}
      <section className="background-radial-gradient overflow-hidden" data-aos="fade-up" data-aos-delay="150">
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
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                The best offer <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  for your business
                </span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                Welcome to Cravee Jodhpur, your one-stop destination for local food businesses to showcase and sell their delectable products. Discover a wide range of culinary delights right at your doorstep, making it convenient for residents to savor the flavors of Jodhpur's finest offerings!
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <div className="form-outline mb-4">
                    <input type="email" id="userEmailID" className="form-control" required onChange={(e) => setEmail(e.target.value)} value={email} />
                    <label className="form-label" htmlFor="userEmailID">
                      Email address
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
                      type="password" id="userPass" className="form-control" required onChange={(e) => setPassword(e.target.value)} value={password} />
                    <label className="form-label" htmlFor="userPass">
                      Password
                      <span
                        className="required-field"
                        style={{ color: "var(--color-primary)" }}
                      >
                        *
                      </span>
                    </label>
                  </div>

                  <div className="form-check d-flex justify-content-center">
                    <p>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={handleForgotPassword}
                        style={{ marginLeft: '-45px' }}
                      >
                        Forgot Password
                      </button>
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                    onClick={handleLogin}
                  >
                    Login
                  </button>

                  <div className="text-center">
                    <p>
                      Don't have an account?{" "}
                      <Link aria-current="page" to="/register">
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
