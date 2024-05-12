import React from 'react'
import "./style.css"
export default function FaqSeller() {
    return (
        <>
            <section className="faqSeller" style={{marginTop:"-30px"}} data-aos="fade-up" data-aos-delay="150">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card card-style1 border-0">
                                <div className="card-body p-4 p-md-5 p-xl-6">
                                    <div className="text-center mb-2-3 mb-lg-6">
                                        <span className="section-title text-primary">FAQ's Sellers</span>
                                        <h2 className="h1 mb-0 text-secondary">Frequently Asked Questions</h2>
                                    </div>
                                    <div id="accordion" className="accordion-style">
                                        <div className="card mb-3">
                                            <div className="card-header" id="headingOne">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><span className="text-theme-secondary me-2">Q.</span> How can I list my restaurant on your platform ?</button>
                                                </h5>
                                            </div>
                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                Listing your restaurant is easy. Simply sign up as a business owner, provide your restaurant details, menu, and other necessary information. Our team will review your submission before it goes live.                                                
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-3">
                                            <div className="card-header" id="headingTwo">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><span className="text-theme-secondary me-2">Q.</span> What benefits does partnering with your platform offer ?</button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                Partnering with us gives your restaurant increased visibility and access to a wide customer base. We also provide tools for managing orders, tracking performance, and engaging with customers.                                                
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-3">
                                            <div className="card-header" id="headingThree">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><span className="text-theme-secondary me-2">Q.</span> Can I customize my restaurant's menu and pricing ?</button>
                                                </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                Yes, you have full control over your menu and pricing. You can update them in real-time using our restaurant management dashboard.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-3">
                                            <div className="card-header" id="headingFour">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"><span className="text-theme-secondary me-2">Q.</span> How does the order fulfillment process work ?</button>
                                                </h5>
                                            </div>
                                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                When a customer places an order, you'll receive a notification. You can then prepare the order and update its status on our platform. The order will be delivered to the customer by our delivery partners.                                                
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-3">
                                            <div className="card-header" id="headingFive">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive"><span className="text-theme-secondary me-2">Q.</span> How can I handle customer reviews and feedback?</button>
                                                </h5>
                                            </div>
                                            <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                Embracing customer feedback is important. You can respond to reviews and engage with customers through our platform. Addressing their concerns and maintaining a positive relationship can help improve your restaurant's reputation.
                                                </div>
                                            </div>
                                        </div>
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
