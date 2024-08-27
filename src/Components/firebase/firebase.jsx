// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTesUH8vVI_qGDzeOrzJ95bUCJbwjPvVY",
  authDomain: "interarea-e8475.firebaseapp.com",
  projectId: "interarea-e8475",
  storageBucket: "interarea-e8475.appspot.com",
  messagingSenderId: "870153199166",
  appId: "1:870153199166:web:e9ade6937a2065384cfb6f",
  measurementId: "G-E6WRL1ZKWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const provider= new GoogleAuthProvider();





export {auth,provider}