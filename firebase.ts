// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAngmO9v4MTol7NNshEinpmcW6SGO4tcmI",
    authDomain: "green-shop-d1087.firebaseapp.com",
    projectId: "green-shop-d1087",
    storageBucket: "green-shop-d1087.firebasestorage.app",
    messagingSenderId: "395218563279",
    appId: "1:395218563279:web:bfadff4e097f64422507ba",
    measurementId: "G-HHNK19SYD9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
};

export { signInWithGoogle };
