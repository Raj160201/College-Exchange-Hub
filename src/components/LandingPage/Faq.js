import React from 'react';
import "./style.css";

export default function Faq() {
    return (
        <div className="container-faq" data-aos="fade-up" data-aos-delay="50">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row justify-content-center mt-4">
                                <div className="col-xl-5 col-lg-8">
                                    <div className="section-header">
                                        <h2>Frequently Asked Questions</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-2">
                                <div className="col-12">
                                    <ul className="nav nav-tabs nav-tabs-custom nav-justified justify-content-center faq-tab-box" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-genarel-tab" data-bs-toggle="pill" data-bs-target="#pills-genarel" type="button" role="tab" aria-controls="pills-genarel" aria-selected="true">
                                                <span className="font-size-16">Sellers</span>
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-privacy_policy-tab" data-bs-toggle="pill" data-bs-target="#pills-privacy_policy" type="button" role="tab" aria-controls="pills-privacy_policy" aria-selected="false">
                                                <span className="font-size-16">Buyers</span>
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-privacy_faq-tab" data-bs-toggle="pill" data-bs-target="#pills-privacy_faq" type="button" role="tab" aria-controls="pills-privacy_faq" aria-selected="false">
                                                <span className="font-size-16">Renters</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-12">
                                    <div className="tab-content pt-3" id="pills-tabContent">
                                        <div className="tab-pane fade active show" id="pills-genarel" role="tabpanel" aria-labelledby="pills-genarel-tab">
                                            <div className="row g-4 mt-2">
                                                <div className="col-lg-6">
                                                    <h5>How do I list an item for sale ?</h5>
                                                    <p className="text-muted">It&#39;s easy! Simply create an account and click &quot;Sell an Item.&quot; Take clear photos of your
                                                        item, write a detailed description, and set your price.</p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h5>What can I sell on College Exchange Hub ?</h5>
                                                    <p className="text-muted">You can sell almost anything a student might need! Textbooks, furniture, electronics,
                                                        clothes - the possibilities are endless. Just be sure it&#39;s in good condition and legal to sell.</p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h5>How do I get paid for my items ?</h5>
                                                    <p className="text-muted">Once you list an item, interested buyers will contact you through your contact
                                                        information (Hence, make sure you provide correct contact information) and then you
                                                        can meet them in person to make the deal.</p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h5>How do I contact College Exchange Hub for support ?</h5>
                                                    <p className="text-muted">We&#39;re happy to help! You can find our contact information on the Help Center page
                                                        within the platform.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-privacy_policy" role="tabpanel" aria-labelledby="pills-privacy_policy-tab">
                                            <div className="row g-4 mt-2">
                                                <div className="col-lg-6">
                                                    <h5>How do I search for items I need ?</h5>
                                                    <p className="text-muted">Browse through our extensive listings by category or typing keyword in search bar. Use
                                                        the filters to narrow down your search and find exactly what you&#39;re looking for.</p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h5>How can I tell if an item is for sale or rent ?</h5>
                                                    <p className="text-muted">Each listing will clearly state whether the item is available for purchase (&quot;Sell&quot;) or
                                                        temporary use (&quot;Rent&quot;).</p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h5>How do I contact a seller if I have questions ?</h5>
                                                    <p className="text-muted">You will be provided with the contact information of the seller on which you can contact
                                                        seller and have a conversation with them.</p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h5>How do I purchase an item ?</h5>
                                                    <p className="text-muted">Once you&#39;ve found the perfect item, then you can contact the respective owners
                                                        showcasing your interest and your offer price, rest is dependent on your negotiating
                                                        skills.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-privacy_faq" role="tabpanel" aria-labelledby="pills-privacy_faq-tab">
                                            <div className="row g-4 mt-2">
                                                <div className="col-lg-6">
                                                    <h5>What happens if I need to cancel my rental early ?</h5>
                                                    <p className="text-muted">Cancellation policies are set by each seller. Be sure to clear the doubts with the seller
                                                        before booking. Some sellers may offer partial refunds for early cancellations.</p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h5>How do I pick up and return a rented item ?</h5>
                                                    <p className="text-muted">YYou&#39;ll communicate pick-up and return details directly with the seller through the
                                                        provided contact information. Be sure to confirm a time and location that works for both
                                                        of you.</p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h5>What if the rented item isn&#39;t as described ?</h5>
                                                    <p className="text-muted">If there&#39;s a discrepancy between the listing and the actual item, contact the seller
                                                        immediately and reach an agreement.</p>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h5>What if I have a problem with my order?</h5>
                                                    <p className="text-muted">Our support team is here to help! Contact us through the Help Center page within the
                                                        platform and we&#39;ll do our best to resolve your issue.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
