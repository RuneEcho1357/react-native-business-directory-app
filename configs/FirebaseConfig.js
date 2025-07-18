// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsIiv_DmVbxrV3WP1xprxVPBn5bNdxGLk",
  authDomain: "startups-48a08.firebaseapp.com",
  projectId: "startups-48a08",
  storageBucket: "startups-48a08.firebasestorage.app",
  messagingSenderId: "606503891812",
  appId: "1:606503891812:web:4466247cde4b63df794071",
  measurementId: "G-4QBF5SYRBH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);