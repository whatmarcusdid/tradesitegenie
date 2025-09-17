// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvE-BO2puKDD6ZF0fz9IVCpMnLRqGD6n4",
  authDomain: "tradesitegenie.firebaseapp.com",
  databaseURL: "https://tradesitegenie-default-rtdb.firebaseio.com",
  projectId: "tradesitegenie",
  storageBucket: "tradesitegenie.firebasestorage.app",
  messagingSenderId: "692679763264",
  appId: "1:692679763264:web:25bad17a7b382b7554c6a5",
  measurementId: "G-FHP4F9D318"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
