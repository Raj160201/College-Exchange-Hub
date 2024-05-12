import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from "../../Config/Config";
import Loader from '../Loader/Loader';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoAds from './NoAds';


export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [orderRatings, setOrderRatings] = useState({});
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribeAuthStateChange = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const uid = user.uid;
                const userRef = db.collection('users').doc(uid);

                const unsubscribe = userRef.onSnapshot(async (doc) => {
                    if (doc.exists) {
                        setIsLoading(true);

                        const ordersID = doc.data().myItems || [];
                        const promises = ordersID.map((orderID) => {
                            const orderRef = db.collection('itemsToSell').doc(orderID);
                            return orderRef.onSnapshot((orderDoc) => {
                                if (orderDoc.exists) {
                                    const orderData = orderDoc.data();
                                    const updatedOrderData = {
                                        orderId: orderID,
                                        ...orderData
                                    };
                                    setOrders(prevOrders => [updatedOrderData, ...prevOrders]);
                                }
                            });
                        });

                        await Promise.all(promises);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                    }
                }, (error) => {
                    toast.error("Error Fetching Orders History. Please try after sometime!!");
                    setIsLoading(false);
                });

                AOS.init({
                    duration: 1000,
                    delay: 70,
                });

                return () => {
                    if (unsubscribe) {
                        unsubscribe();
                    }
                };
            } else {
                setIsLoading(false);
            }
        });

        return () => {
            unsubscribeAuthStateChange();
        };
    }, []);

    const handleDelete = async (orderId) => {
        try {
            await db.collection("itemsToSell").doc(orderId).delete();
            toast.success("Item deleted successfully!");
        } catch (error) {
            toast.error("Error deleting item. Please try again later.");
        }
    };

    return (
        <>
            {orders.map((order, index) => (
                <>
                    <div className="modal fade" id={`invoiceModal${index}`} tabIndex="-1" aria-labelledby={`invoiceModalLabel${index}`} aria-hidden="true" key={`invoice${order.orderId}`}>
                        <div className="modal-dialog">
                            <div className="modal-content" style={{ borderRadius: '15px', borderTop: '3px solid #f37a27', borderBottom: '3px solid #f37a27' }}>
                                <div className="modal-header">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body text-start text-black p-4">
                                    <h5 className="modal-title text-uppercase text-center mb-4" id="invoiceModalLabel" style={{ color: "#f37a27", fontWeight: 'bold' }}>Summary</h5>
                                    <div className="row">
                                        <div className="col mb-1">
                                            <p className="small text-muted mb-1">Seller</p>
                                            <p>{order.name}</p>
                                        </div>
                                        <div className="col mb-1">
                                            <p className="small text-muted mb-1">Product ID</p>
                                            <p>{order.orderId}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col mb-1">
                                            <p className="small text-muted mb-1">Phone Number</p>
                                            <p>+91 {order.contactNumber}</p>
                                        </div>
                                        <div className="col mb-1">
                                            <p className="small text-muted mb-1">User Email</p>
                                            <p>{order.emailAddress}</p>
                                        </div>
                                    </div>
                                    <h4 className="mb-0" style={{ color: "#35558a" }}>Product Details</h4>
                                    <hr className="mt-2 mb-2" style={{ height: "0", backgroundColor: "transparent", opacity: ".75", bordertop: "2px dashed #9e9e9e" }} />
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-0">Title</p>
                                        <p className="mb-0">{order.productTitle}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="mb-0">Category</p>
                                        <p className="mb-0">{order.category}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="mb-0">Details</p>
                                        <p className="mb-0">{order.itemDetails}</p>
                                    </div>

                                    <div className="d-flex justify-content-between pb-1">
                                        <p className="mb-0">Price</p>
                                        <p className="mb-0">&#8377; {order.productPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </>
            ))}
            <div className="container" style={{ marginTop: '100px', paddingBottom: '100px' }}>
                <ToastContainer
                    position="top-right"
                    autoClose={2400}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" />
                {isLoading && <Loader />}
                <div className="row">
                    <div className="col-md-12">
                        <div className="osahan-account-page-right shadow-sm bg-white p-4 h-100">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                                    <h2 className="font-weight-bold mt-0 mb-4">My ADS</h2>
                                    {!isLoading && orders.length === 0 && <NoAds />}
                                    {!isLoading && orders.length > 0 && (
                                        orders.map((order, index) => (
                                            <div className="row mb-4" key={index} data-aos="zoom-in" data-aos-delay={20 * (index + 1)}>
                                                <div className="col-md-4">
                                                    <div className="bg-white card order-list shadow-sm" style={{ borderRadius: '20px' }}>
                                                        <div className="p-4">
                                                            <img style={{ width: '75%', alignContent: 'center' }} src={order.imageURL} className="menu-img" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="bg-white card order-list shadow-sm" style={{ borderRadius: '20px' }}>
                                                        <div className="p-4">
                                                            <h4 className="mb-2">
                                                                <Link aria-current="page" to={`/${order.orderID}`}>
                                                                    {order.productTitle}
                                                                </Link>
                                                            </h4>
                                                            <div className="d-flex flex-column align-items-start mb-3">
                                                                <div className="d-flex justify-content-between mb-1">
                                                                    <i className="icofont-list me-2 text-success">ID #{order.orderId}</i>
                                                                </div>
                                                                <div className="d-flex justify-content-between mb-1">
                                                                    <i className="icofont-list me-2 text-success">Category: {order.category}</i>
                                                                </div>
                                                                <div className="d-flex justify-content-between mb-1">
                                                                    <i className="icofont-list me-2 text-success">Product Details: {order.itemDetails}</i>
                                                                </div>
                                                                <div className="d-flex align-items-center mb-1">
                                                                    <i className="icofont-location-arrow me-2 text-secondary">Seller: {order.name}</i>
                                                                </div>
                                                                <div className="d-flex align-items-center mb-1">
                                                                    <i className="icofont-location-arrow me-2 text-secondary">Product Price: &#8377;{order.productPrice}</i>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-3">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-light btn-sm"
                                                                    onClick={() => navigate('/contact')}
                                                                >
                                                                    <i className="icofont-headphone-alt me-1"></i> HELP
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-outline-danger me-4"
                                                                    onClick={() => handleDelete(order.orderId)}
                                                                >
                                                                    <i className="icofont-ui-delete"></i> Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
