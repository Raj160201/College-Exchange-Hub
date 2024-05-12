import React, { useState, useEffect } from 'react';
import { addDoc, getDoc, collection, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { auth, db, storage } from "../../Config/Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

export default function AddNewProduct() {
    const [data, setData] = useState({
        productTitle: '',
        itemDetails: '',
        category: '',
        productPrice: '',
        contactNumber: '',
        emailAddress: '',
        imageURL: '',
        name: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        if (image) {
            console.log(image);
            const storageRef = ref(storage, `images/${image.name}`);
            uploadBytes(storageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setData({ ...data, imageURL: url });
                });
            });
        }
    };

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value });
    };

    const handleCategoryInput = (event) => {
        const selectedServices = event.target.value;
        setData({ ...data, category: selectedServices });
    };

    useEffect(() => {
        const currentUser = auth.currentUser;

        const fetchUserCategories = async () => {
            if (currentUser) {
                const uid = currentUser.uid;
                const userRef = doc(db, 'users', uid);

                try {
                    const docSnapshot = await getDoc(userRef);
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        setData({ ...data, name: userData.name, emailAddress: userData.email, contactNumber: userData.contact });
                    }
                } catch (err) {
                    console.error(err.message);
                }
            }
        };

        fetchUserCategories();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const currentUser = auth.currentUser;

        if (currentUser) {
            const uid = currentUser.uid;
            const orderCollectionRef = collection(db, 'itemsToSell');

            try {
                const newItem = {
                    userId: uid,
                    productTitle: data.productTitle,
                    itemDetails: data.itemDetails,
                    category: data.category,
                    productPrice: data.productPrice,
                    contactNumber: data.contactNumber,
                    emailAddress: data.emailAddress,
                    imageURL: data.imageURL,
                    name: data.name,
                };
                const orderDocRef = await addDoc(orderCollectionRef, newItem);

                const userDocRef = doc(db, 'users', uid);
                await updateDoc(userDocRef, {
                    myItems: arrayUnion(orderDocRef.id)
                });

                setIsLoading(false);
                toast.success(
                    'Successfully Added the Product. You will now automatically get redirected to the Product page'
                );
                setTimeout(() => {
                    navigate('/');
                }, 2500);
            } catch (err) {
                setIsLoading(false);
                toast.error(err.message);
            }
        }
    };

    return (
        <>
            <div className="home">
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
                <div className="homeContainer mt-4">
                    <div className="container-fluid px-1 py-5 mx-auto">
                        <div className="row d-flex justify-content-center mt-4">
                            <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center mt-4">
                                <div className="prdcard" style={{ padding: '20px' }}>
                                    <h1>POST YOUR AD</h1>
                                    <form className="form-card mt-4" onSubmit={handleAdd}>
                                        <div className="row justify-content-between text-left">
                                            <div className="form-group col-sm-6 flex-column d-flex mt-3">
                                                <InputLabel htmlFor="productTitle" className="form-control-label px-3">
                                                    Product Title<span className="text-danger"> *</span>
                                                </InputLabel>
                                                <TextField
                                                    type="text"
                                                    id="productTitle"
                                                    name="productTitle"
                                                    placeholder="Product Title"
                                                    onChange={handleInput}
                                                    value={data.productTitle}
                                                    variant="outlined"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-sm-6 flex-column d-flex mt-3">
                                                <InputLabel htmlFor="itemDetails" className="form-control-label px-3">
                                                    Product Detail<span className="text-danger"> *</span>
                                                </InputLabel>
                                                <TextField
                                                    type="text"
                                                    id="itemDetails"
                                                    name="itemDetails"
                                                    placeholder="Product Detail"
                                                    onChange={handleInput}
                                                    value={data.itemDetails}
                                                    variant="outlined"
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-content-between text-left">
                                            <div className="form-group col-sm-6 flex-column d-flex mt-3">
                                                <InputLabel htmlFor="category" className="form-control-label px-3">
                                                    Category<span className="text-danger"> *</span>
                                                </InputLabel>
                                                <FormControl variant="outlined" fullWidth>
                                                    <InputLabel id="category">Category</InputLabel>
                                                    <Select
                                                        id="category"
                                                        name="category"
                                                        onChange={handleCategoryInput}
                                                        value={data.category}
                                                        label="Category"
                                                        required
                                                    >
                                                        <MenuItem value="" disabled>Select Product Category</MenuItem>
                                                        <MenuItem value="Furniture">Furniture</MenuItem>
                                                        <MenuItem value="Electronics">Electronics</MenuItem>
                                                        <MenuItem value="Stationery">Stationary</MenuItem>
                                                        <MenuItem value="Clothing">Clothing</MenuItem>
                                                        <MenuItem value="Footwear">Footwear</MenuItem>
                                                        <MenuItem value="Sports Equipment">Sports Equipment</MenuItem>
                                                        <MenuItem value="Musical Instruments">Musical Instruments</MenuItem>
                                                        <MenuItem value="Others">Others</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="form-group col-sm-6 flex-column d-flex mt-3">
                                                <InputLabel htmlFor="productPrice" className="form-control-label px-3">
                                                    Price<span className="text-danger"> *</span>
                                                </InputLabel>
                                                <TextField
                                                    type="number"
                                                    id="productPrice"
                                                    name="productPrice"
                                                    placeholder="Price"
                                                    onChange={handleInput}
                                                    value={data.productPrice}
                                                    variant="outlined"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-content-between text-left">
                                            <div className="form-group col-sm-6 flex-column d-flex mt-3">
                                                <InputLabel htmlFor="contactNumber" className="form-control-label px-3">
                                                    Contact Number<span className="text-danger"> *</span>
                                                </InputLabel>
                                                <TextField
                                                    type="text"
                                                    id="contactNumber"
                                                    name="contactNumber"
                                                    placeholder="Contact Number"
                                                    onChange={handleInput}
                                                    value={data.contactNumber}
                                                    variant="outlined"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-sm-6 flex-column d-flex mt-3">
                                                <InputLabel htmlFor="emailAddress" className="form-control-label px-3">
                                                    Email Address<span className="text-danger"> *</span>
                                                </InputLabel>
                                                <TextField
                                                    type="text"
                                                    id="emailAddress"
                                                    name="emailAddress"
                                                    placeholder="Email Address"
                                                    onChange={handleInput}
                                                    value={data.emailAddress}
                                                    variant="outlined"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="form-group col-sm-6 mt-3">
                                                <InputLabel htmlFor="image" className="form-control-label px-3">
                                                    Image<span className="text-danger"> *</span>
                                                </InputLabel>
                                                <TextField
                                                    type="file"
                                                    id="image"
                                                    name="image"
                                                    onChange={handleImageChange}
                                                    variant="outlined"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center mt-5">
                                            <div className="form-group col-sm-6"> <button type="submit" className="btn-block btn-primary">Submit</button> </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <Loader />}
        </>
    )
}
