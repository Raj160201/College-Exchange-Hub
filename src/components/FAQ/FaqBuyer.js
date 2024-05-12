import React from 'react'
import "./style.css"

export default function FaqBuyer() {
    return (
        <>
            <section className="faqBuyer" style={{marginTop:"-30px"}} data-aos="fade-up" data-aos-delay="150">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card card-style1 border-0">
                                <div className="card-body p-4 p-md-5 p-xl-6">
                                    <div className="text-center mb-2-3 mb-lg-6">
                                        <span className="section-title text-primary">FAQ's Buyers</span>
                                        <h2 className="h1 mb-0 text-secondary">Frequently Asked Questions</h2>
                                    </div>
                                    <div id="accordion" className="accordion-style">
                                        <div className="card mb-3">
                                            <div className="card-header" id="headingOne">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><span className="text-theme-secondary me-2">Q.</span> How does the ordering process work on your platform ?</button>
                                                </h5>
                                            </div>
                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                Ordering is simple! Just enter your location, browse through the available restaurants, select your items, and proceed to checkout. Your order will be prepared and delivered to your doorstep.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-3">
                                            <div className="card-header" id="headingTwo">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><span className="text-theme-secondary me-2">Q.</span> Can I track my order ?</button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                Yes, you can track your order in real-time once it's confirmed. We'll provide you with updates on the status of your order from preparation to delivery.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-3">
                                            <div className="card-header" id="headingThree">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><span className="text-theme-secondary me-2">Q.</span> How do I pay for my order ?</button>
                                                </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                Simply scan the provided QR code at the time of payment. We offer a seamless and cashless transaction process, allowing you to conveniently settle your order using your preferred digital payment method. 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-3">
                                            <div className="card-header" id="headingFour">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"><span className="text-theme-secondary me-2">Q.</span> How can I provide feedback about my experience ?</button>
                                                </h5>
                                            </div>
                                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                We value your feedback! You can rate and review restaurants based on your experience, helping others make informed decisions. Additionally, you can always reach out to our support team.                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingFive">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive"><span className="text-theme-secondary me-2">Q.</span> What if I have allergies or specific dietary preferences ?</button>
                                                </h5>
                                            </div>
                                            <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-bs-parent="#accordion">
                                                <div className="card-body">
                                                Many restaurants provide detailed information about their dishes. You can also add special instructions to your order to communicate your preferences directly to the restaurant.
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
