import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import ads from '../../assets/Img/ads.webp';

export default function NoRent() {

    return (
        <>
            <div className="container-xxl container-p-y">
                <div className="misc-wrapper" style={{ minHeight: '0px' }}>
                    <div className="mb-4">
                        <img
                            src={ads}
                            alt="page-misc-error-light"
                            width="300"
                            className="img-fluid"
                            data-app-dark-img="page-misc-error-dark.png"
                            data-app-light-img="page-misc-error-light.png"
                        />
                    </div>
                    <h2 className="mb-2 mx-2" style={{ color: '#566a7f', fontWeight: '600', lineHeight: '1.1' }}>You haven't listed anything yet :(</h2>
                    <p className="mb-2 mx-2" style={{ color: '#566a7f', fontSize: '18px' }}>Let go of what you don't use anymore</p>
                    <Link aria-current="page" to='/requestForRent' className="btn btn-primary mt-5 mb-3">Start Renting</Link>
                </div>
            </div>
        </>
    )
}
