import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig={
    apiKey: "AIzaSyC-XZZ8eVwbiP8L6ExRvUFIavLfDsRGmEU",

    databaseURL:"https://byjus-f904b-default-rtdb.firebaseio.com/",

    authDomain: "byjus-f904b.firebaseapp.com",
  
    projectId: "byjus-f904b",
  
    storageBucket: "byjus-f904b.appspot.com",
  
    messagingSenderId: "421342593577",
  
    appId: "1:421342593577:android:ab76aabafc487413df9238",
  
    measurementId: "G-QSKE6NZMG7"
  
}
// if(!firebase.apps.length){
//     const app = initializeApp(firebaseConfig);
// }

const app = firebase.initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
const auth = getAuth.apply(app);
export {firebase,auth}

// const analytics = getAnalytics(app);