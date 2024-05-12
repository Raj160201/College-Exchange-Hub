import React from "react";
import "./style.css";
import background from '../../assets/Img/bgimage.jpg';

export default function Banner() {
    return (
        <>
            <section id="hero" className="d-flex align-items-center">
                <div className="container" data-aos="fade-up">
                    <div
                        className="row gy-4 d-flex justify-content-between"
                        data-aos="fade-up"
                        data-aos-delay="150"
                    >
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h1>
                                Your Lightning Fast Delivery Partner<span>.</span>
                            </h1>
                            <h2>Delivering Convenience, One Order at a Time.</h2>
                            <h2>Navigating a Realm of Convenience in Everyday Essentials.</h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
