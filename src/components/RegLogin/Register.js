import React, { useContext, useState, useRef } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "../../Config/Config";
import { ToastContainer } from 'react-toastify';
import { AuthContext } from "../Context/AuthContext";
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const navigate = useNavigate();
  const { dispatch, setUserType } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const scrollRef = useRef();

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
        name: name,
        email: email,
        contact: contact,
      });

      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      toast.success("Signup Successful. Please check your email for verification. You will be redirect to Login Page!!");
      setName("");
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
                The best place <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  for your exchanges
                </span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                Welcome to Exchange Hub, Where Students Buy, Sell, and Rent with Ease.Empowering Student Transactions, Simplifying Campus Life.
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
                    <input type="name" id="userName" className="form-control" required onChange={(e) => setName(e.target.value)} value={name} />
                    <label className="form-label" htmlFor="userName">
                      Name
                      <span
                        className="required-field"
                        style={{ color: "var(--color-primary)" }}
                      >
                        *
                      </span>
                    </label>
                  </div>
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
                    <input type="phone" id="userContact" className="form-control" required onChange={(e) => setContact(e.target.value)} value={contact} />
                    <label className="form-label" htmlFor="userContact">
                      Contact Number
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
                    Sign Up
                  </button>

                  <div className="text-center">
                    <p>
                      Already have an account?{" "}
                      <Link aria-current="page" to="/login">
                        Login
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
