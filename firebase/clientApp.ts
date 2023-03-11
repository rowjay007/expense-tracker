// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZBdFkwl4_TYns3_HX2Ld7WyY7BwOy31o",
  authDomain: "expended-8d9fd.firebaseapp.com",
  projectId: "expended-8d9fd",
  storageBucket: "expended-8d9fd.appspot.com",
  messagingSenderId: "834946152738",
  appId: "1:834946152738:web:1af8efc1a74f43b3af8d7b",
  measurementId: "G-DNZZKHRWT3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
