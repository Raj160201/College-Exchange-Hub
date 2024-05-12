import React from 'react'
import { Link } from "react-router-dom";
import '../PolicyPages/style.css';

export default function FooterComp() {
    return (
        <>
            <footer id="footer" className="footer">
                <div className="container-footer footer-top">
                    <div className="row gy-4">
                        <div className="col-lg-4 col-md-12 footer-about">
                            <Link aria-current="page" to="/" className="logo d-flex align-items-center">
                                <span>Exchange Hub<span style={{ color: 'var(--color-primary)' }}>.</span></span>
                            </Link>
                            <p style={{ textAlign: "justify" }}>Your Gateway to Seamless College Exchanges. We're committed to empowering student transactions with efficient and dependable solutions, enabling easy access to buying, selling, and renting opportunities, problem-solving platforms, and sustainable student exchange growth.</p>
                            <div className="social-links d-flex mt-4">
                                <Link aria-current="page" to="/"><i className="bi bi-twitter"></i></Link>
                                <Link aria-current="page" to="/"><i className="bi bi-facebook"></i></Link>
                                <Link aria-current="page" to="/"><i className="bi bi-instagram"></i></Link>
                                <Link aria-current="page" to="/"><i className="bi bi-linkedin"></i></Link>
                            </div>
                        </div>

                        <div className="col-lg-2 col-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><Link aria-current="page" to="/contact">Contact Us</Link></li>
                                <li><Link aria-current="page" to="/">Privacy policy</Link></li>
                                <li><Link aria-current="page" to="/">Terms & Conditions</Link></li>
                              
                            </ul>
                        </div>

                        <div className="col-lg-2 col-6 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li><Link aria-current="page" to="/buyProducts">Buy</Link></li>
                                <li><Link aria-current="page" to="/sell">Sell</Link></li>
                                <li><Link aria-current="page" to="/requestForRent">Request for Rent</Link></li>
                               
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                            <h4>Contact Us</h4>
                            <p>NH 62, Surpura Bypass Rd</p>
                            <p>Karwar, Jodhpur, 342030</p>
                            <p>Rajasthan, India</p>
                            <p className="mt-4"><strong>Phone:</strong> <span>+91 935 237 0533</span></p>
                            <p><strong>Email:</strong> <span>exchangeIITJ@gmail.com</span></p>
                        </div>

                    </div>
                </div>

                <div className="container copyright text-center mt-0">
                    <p>&copy; <span>Copyright</span> <strong className="px-1">Exchange Hub</strong> <span>All Rights Reserved</span></p>
                    <div className="credits">
                        Designed by <Link aria-current="page" to="/">Exchange Hub</Link>
                    </div>
                </div>
            </footer>
        </>
    )
}
