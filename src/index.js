import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { AuthContextProvider } from "./components/Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
);

reportWebVitals();
serviceWorkerRegistration.register();
