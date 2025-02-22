// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1Ws_pNigyfuw6T7-_bsCzUegsuBB0gIo",
    authDomain: "task-management-1f884.firebaseapp.com",
    projectId: "task-management-1f884",
    storageBucket: "task-management-1f884.firebasestorage.app",
    messagingSenderId: "704088712829",
    appId: "1:704088712829:web:a38e8b6290fb8d5205f314",
    measurementId: "G-8BSD66SSVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);