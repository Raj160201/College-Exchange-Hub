import React, { useState, useEffect } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Service() {

    return (
        <>
            <section id="service" className="services pt-0">
                <div className="container" data-aos="fade-up">
                    <div className="section-header">
                        <h2>Our Services</h2>
                    </div>
                    <div className="row gy-4" style={{ justifyContent: 'center' }}>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="card">
                                <div className="card-img">
                                    <Link aria-current="page" to='/sellProducts'>
                                        <img
                                            src={`../../assets/Img/product.png`}
                                            alt=""
                                            className="img-fluid"
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                                <h3>
                                    <Link aria-current="page" to='/buyProducts'>
                                        Buy Products
                                    </Link>
                                </h3>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="card">
                                <div className="card-img">
                                    <Link aria-current="page" to='/buyProducts'>
                                        <img
                                            src={`../../assets/Img/product.png`}
                                            alt=""
                                            className="img-fluid"
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                                <h3>
                                    <Link aria-current="page" to='/rentProducts'>
                                        Rent Products
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}
