import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../Config/Config";
import { AuthContext } from "./Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NavMenu() {
  const location = useLocation();
  const [isMobileNavActive, setMobileNavActive] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const toggleMobileNav = () => {
    setMobileNavActive((prevState) => !prevState);
  };

  const closeMobileNav = () => {
    setMobileNavActive(false);
  };

  useEffect(() => {
    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll("#navmenu a").forEach((navmenu) => {
      navmenu.addEventListener("click", () => {
        closeMobileNav();
      });
    });
  }, []);

  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              const userData = snapshot.data();
              if (userData && userData.name) {
                setUser(userData.name);
              } else {
                setUser(null);
              }
            })
            .catch((error) => {
              toast.error("Error fetching user data. Please Try After Sometime!!");
              setUser(null);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const user = GetCurrentUser();
  let formattedUserName;
  if (user) {
    formattedUserName = user.split(" ")[0];
  }
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    });
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
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
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link
          aria-current="page"
          to="/"
          className="logo d-flex align-items-center me-auto me-xl-0"
        >
          <h1 style={{ marginLeft: '20px' }}>Collegiate Exchange Hub</h1>
          <span>.</span>
        </Link>

        <nav
          id="navmenu"
          className={`navmenu ${isMobileNavActive ? "mobile-nav-active" : ""}`} style={{ display: 'flex' }}
        >
          <ul onClick={closeMobileNav}>
            <li>
              <Link
                aria-current="page"
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                aria-current="page"
                to="/contact"
                className={location.pathname === "/contact" ? "active" : ""}
              >
                Contact
              </Link>
            </li>
          </ul>
          <i
            className={`mobile-nav-toggle d-xl-none bi ${isMobileNavActive ? "bi-x" : "bi-list"
              }`}
            onClick={toggleMobileNav}
          ></i>
        </nav>

        <nav className="header-nav">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown">
              <Link
                className="nav-link nav-icon"
                aria-current="page"
                to="/"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-circle-plus"></i>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="message-item">
                  <Link aria-current="page" to="/sell">
                    <i className="fa-brands fa-shopify"></i>
                    <div>
                      <h4>Sell Item</h4>
                    </div>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <Link aria-current="page" to="/requestForRent ">
                    <i className="fa-brands fa-shopify"></i>
                    <div>
                      <h4>Rent Item</h4>
                    </div>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </li>
            {/* <li className="nav-item dropdown">
              <Link
                className="nav-link nav-icon"
                aria-current="page"
                to="/"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-question-circle"></i>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="message-item">
                  <Link aria-current="page" to="/faqBuyer">
                    <i className="bi bi-chat-left-text"></i>
                    <div>
                      <h4>FAQ Buyers</h4>
                    </div>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <Link aria-current="page" to="/faqSeller">
                    <i className="bi bi-chat-left-text"></i>
                    <div>
                      <h4>FAQ Sellers</h4>
                    </div>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </li> */}
            {!user ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link nav-icon"
                  aria-current="page"
                  to="/"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle"></i>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                  <li className="message-item">
                    <Link aria-current="page" to="/login">
                      <i className="bi bi-box-arrow-in-right"></i>
                      <div>
                        <h4>Login</h4>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="message-item">
                    <Link aria-current="page" to="/register">
                      <i className="bi bi-r-circle"></i>
                      <div>
                        <h4>Register</h4>
                      </div>
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link nav-icon"
                  aria-current="page"
                  to="/"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-person-circle"></i>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                  <li className="message-item">
                    <Link aria-current="page" to="/account">
                      <i className="fa-solid fa-user"></i>
                      <div>
                        <h4>{formattedUserName}</h4>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="message-item">
                    <Link aria-current="page" to="/myads">
                      <i className="fa-solid fa-store"></i>
                      <div>
                        <h4>My ADS</h4>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="message-item">
                    <Link aria-current="page" to="/rentHistory">
                      <i className="fa-solid fa-store"></i>
                      <div>
                        <h4>Requested ADS</h4>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="message-item">
                    <Link aria-current="page" onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <div>
                        <h4>Log Out</h4>
                      </div>
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
