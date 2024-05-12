import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from './Context/AuthContext'

export default function Error() {

    const { currentUser } = useContext(AuthContext);
    const homePath = currentUser?.userType === 'businessUser' ? '/business' : '/';

    return (
        <>
            <div className="container-xxl container-p-y">
                <div className="misc-wrapper">
                    <h2 className="mb-2 mx-2" style={{ color: '#566a7f', fontWeight: '600', lineHeight: '1.1' }}>Page Not Found :(</h2>
                    <p className="mb-4 mx-2" style={{ color: '#566a7f', fontSize: '18px' }}>Oops! 😖 The requested URL was not found on this server.</p>
                    <div className="mt-3">
                        <img
                            src={require("../assets/Img/error404.svg").default}
                            alt="page-misc-error-light"
                            width="500"
                            className="img-fluid"
                            data-app-dark-img="page-misc-error-dark.png"
                            data-app-light-img="page-misc-error-light.png"
                        />
                    </div>
                    <Link aria-current="page" to={homePath} className="btn btn-primary mt-5 mb-3">Back to home</Link>
                </div>
            </div>
        </>
    )
}
