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
                                <span>Cravee<span style={{ color: 'var(--color-primary)' }}>.</span></span>
                            </Link>
                            <p style={{ textAlign: "justify" }}>Cravee is the digital gateway to streamlined business growth. We're dedicated to empowering emerging businesses with cost-effective and reliable solutions, facilitating easy access to new opportunities, problem-solving strategies, and sustainable growth.</p>
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
                                <li><Link aria-current="page" to="/privacyPolicy">Privacy policy</Link></li>
                                <li><Link aria-current="page" to="/terms&Conditions">Terms & Conditions</Link></li>
                                <li><Link aria-current="page" to="/deliveryPolicy">Delivery Policy</Link></li>
                                <li><Link aria-current="page" to="/cancellation&Refund">Cancellation & Refund Policy</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-6 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li><Link aria-current="page" to="/Pyqo8xQntmaZxLCkzq8raT30aXV2">The Highway Cafe</Link></li>
                                <li><Link aria-current="page" to="/9IdmZLR4T5UL7mIZRg5S9og6m0z2">Pizza Planet</Link></li>
                                <li><Link aria-current="page" to="/Zx6OcdP2x6d24JkcG49gKUCSn2Z2">IITJ Canteen</Link></li>
                                <li><Link aria-current="page" to="/ShjLKJqCCPctajUaCFtLj4Oc0M12">Food Pipers</Link></li>
                                <li><Link aria-current="page" to="/dEDaKfUwdRhtuvu05YogEap4SxG3">Rukmani Enterprises</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                            <h4>Contact Us</h4>
                            <p>NH 62, Surpura Bypass Rd</p>
                            <p>Karwar, Jodhpur, 342030</p>
                            <p>Rajasthan, India</p>
                            <p className="mt-4"><strong>Phone:</strong> <span>+91 865 742 0799</span></p>
                            <p><strong>Email:</strong> <span>exchangeIITJ@gmail.com</span></p>
                        </div>

                    </div>
                </div>

                <div className="container copyright text-center mt-0">
                    <p>&copy; <span>Copyright</span> <strong className="px-1">Cravee</strong> <span>All Rights Reserved</span></p>
                    <div className="credits">
                        Designed by <Link aria-current="page" to="/">Cravee</Link>
                    </div>
                </div>
            </footer>
        </>
    )
}
