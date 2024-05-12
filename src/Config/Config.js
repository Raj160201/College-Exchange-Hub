import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAe3v5PWKbn7zlK0LYY9gZcq0KNr-ZkTMI",
    authDomain: "college-exchange-hub.firebaseapp.com",
    projectId: "college-exchange-hub",
    storageBucket: "college-exchange-hub.appspot.com",
    messagingSenderId: "300253388761",
    appId: "1:300253388761:web:5d181addc64f188bce43c8",
    measurementId: "G-ZMKPMVP6Q3"
};

const initialize = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new GoogleAuthProvider();

export { initialize, auth, db, storage, provider }