import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { db } from '../../Config/Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';

export default function Menu() {
    const [products, setProducts] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('*');
    const [loading, setLoading] = useState(true);

    const fetchFoodProducts = useCallback(async () => {
        try {
            const shopsSnapshot = await db.collection('itemsToSell').get();
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
            <section id="menu" className="menu" data-aos="fade-up" data-aos-delay="150">
                <div className="container">
                    <div className="section-header">
                        <h2>Check our fresh <span>Recommendations</span></h2>
                    </div>
                    <div className="row">
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

                    <div className="row menu-container mt-4">
                        {loading ? (
                            <Loader />
                        ) : (
                            filteredProducts.map((product, index) => (
                                <div className='col-lg-6 menu-item' key={index}>
                                    <img src={product.image} class="menu-img" alt=""></img>
                                    <div className="menu-content">
                                        <div className="dietary-preference">
                                            {product.title}
                                            <Link aria-current="page" to={`/${product.id}`}>{product.name}</Link>
                                        </div>
                                        <span>&#8377;{product.price}</span>
                                    </div>
                                    <div className="menu-ingredients">
                                        {product.details}
                                    </div>
                                </div>
                            )))}
                    </div>
                </div>
            </section>
        </>
    );
}
