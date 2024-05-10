import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDH3SMPE9yhgDAGsgy09U8gPhDjQioyI2o",
    authDomain: "bookit-8861d.firebaseapp.com",
    projectId: "bookit-8861d",
    storageBucket: "bookit-8861d.appspot.com",
    messagingSenderId: "565906414431",
    appId: "1:565906414431:web:4de352252dd4204334b4ea"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp); // Initialize auth

export { firebaseApp, db, auth }; // Export auth along with firebaseApp and db
