// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBCoHNLnqj6rIokLQKfSChoBtNk5V_NoA",
  authDomain: "byjus-51251.firebaseapp.com",
  projectId: "byjus-51251",
  storageBucket: "byjus-51251.appspot.com",
  messagingSenderId: "316683267786",
  appId: "1:316683267786:web:065ef38d96502eb7af0e33",
  measurementId: "G-QSKE6NZMG7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth.apply(app);