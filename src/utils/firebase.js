// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYtVQTFBQvBNwH4fv8F7ZZXkyI0khdOKk",
  authDomain: "netflix--on.firebaseapp.com",
  projectId: "netflix--on",
  storageBucket: "netflix--on.firebasestorage.app",
  messagingSenderId: "368495750357",
  appId: "1:368495750357:web:acf49419a4fb908e41465c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();