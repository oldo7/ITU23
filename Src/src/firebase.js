//Autor: Martin Packa

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk0nP1UATFPOxaBBv04PkqnEEeCcRYnyk",
  authDomain: "ituvut-6f301.firebaseapp.com",
  projectId: "ituvut-6f301",
  storageBucket: "ituvut-6f301.appspot.com",
  messagingSenderId: "685820856675",
  appId: "1:685820856675:web:826dd6e84aadae92852b56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
