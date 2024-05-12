import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../Config/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import './style.css'

export default function RentProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('*');


    const fetchFoodProducts = useCallback(async () => {
        try {
            const shopsSnapshot = await db.collection('requestedItems').get();
            const allProducts = [];

            shopsSnapshot.forEach((shopDoc) => {
                const product = shopDoc.data();
                allProducts.push({
                    id: shopDoc.uid || '',
                    category: product.category || '',
                    phone: product.contactNumber || '',
                    email: product.emailAddress || '',
                    image: product.imageURL || '',
                    details: product.itemDetails || '',
                    price: product.productPrice || '',
                    title: product.productTitle || '',
                    userId: product.userId || '',
                    name: product.name || '',
                });
            });
            setProducts(allProducts);
        } catch (error) {
            toast.error('Error fetching products. Please Try After Sometime!!');
        }
    }, []);

    useEffect(() => {
        const fetchAndSetProducts = async () => {
            setLoading(true);
            await fetchFoodProducts();
            setLoading(false);
        };

        fetchAndSetProducts();
    }, [fetchFoodProducts]);

    const filteredProducts = selectedFilter === '*'
        ? products
        : products.filter((product) => product.category === selectedFilter);

    return (
        <>
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
            <div className="breadcrumbs" data-aos="fade-in">
                <div className="container">
                    <h2>Rent Products</h2>
                </div>
            </div>
            <section className="team" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
                <div className="container">
                    <div className="row mb-4 mt-0">
                        <div className="col-lg-12 d-flex justify-content-center">
                            {loading ? (
                                <Loader />
                            ) : (
                                <ul id="menu-flters">
                                    <li
                                        data-filter="*"
                                        className={selectedFilter === '*' ? 'filter-active' : ''}
                                        onClick={() => setSelectedFilter('*')}
                                    >
                                        All
                                    </li>
                                    <li
                                        data-filter=".filter-furniture"
                                        className={selectedFilter === 'Furniture' ? 'filter-active' : ''}
                                        onClick={() => setSelectedFilter('Furniture')}
                                    >
                                        Furniture
                                    </li>
                                    <li
                                        data-filter=".filter-electronics"
                                        className={selectedFilter === 'Electronics' ? 'filter-active' : ''}
                                        onClick={() => setSelectedFilter('Electronics')}
                                    >
                                        Electronics
                                    </li>
                                    <li
                                        data-filter=".filter-clothing"
                                        className={selectedFilter === 'Clothing' ? 'filter-active' : ''}
                                        onClick={() => setSelectedFilter('Clothing')}
                                    >
                                        Clothing
                                    </li>
                                    <li
                                        data-filter=".filter-shoes"
                                        className={selectedFilter === 'Shoes' ? 'filter-active' : ''}
                                        onClick={() => setSelectedFilter('Shoes')}
                                    >
                                        Shoes
                                    </li>
                                    <li
                                        data-filter=".filter-stationary"
                                        className={selectedFilter === 'Stationery' ? 'filter-active' : ''}
                                        onClick={() => setSelectedFilter('Stationery')}
                                    >
                                        Stationary
                                    </li>
                                    <li
                                        data-filter=".filter-others"
                                        className={selectedFilter === 'Others' ? 'filter-active' : ''}
                                        onClick={() => setSelectedFilter('Others')}
                                    >
                                        Others
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        < div className="row menu-container mt-4">
                            {loading ? (
                                <Loader />
                            ) : (
                                filteredProducts.map((product, index) => (
                                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch" key={index}>
                                        <div className="member">
                                          
                                            <div className="member-info">
                                                <h4>{product.title}</h4>
                                                <span>{product.category}</span>
                                                <p><span style={{ fontWeight: 'bold', color: 'black', lineHeight: '15px' }}>{product.details}</span></p>
                                                <p><span style={{ fontWeight: 'w300', color: 'green' }}>Requested by: {product.name}</span></p>
                                                <p><span style={{ fontWeight: 'w300', color: 'red' }}>Contact: {product.phone}</span></p>
                                                <p style={{ fontWeight: 'bold', textAlign: 'justify' }}>&#8377;{product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                )))}
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
