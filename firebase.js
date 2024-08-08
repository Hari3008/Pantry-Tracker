// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkUc65llEbfF7D_dFtr_N4ec5Lab1GcjI",
  authDomain: "inventory-app-6135c.firebaseapp.com",
  projectId: "inventory-app-6135c",
  storageBucket: "inventory-app-6135c.appspot.com",
  messagingSenderId: "734013117938",
  appId: "1:734013117938:web:bee418387753c45722476b",
  measurementId: "G-GDL4EJVQKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export { firestore };