// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNPgoSuYjyd_Ln5_vOp-EYdxKL0ovKuik",
  authDomain: "foodflow-1a2eb.firebaseapp.com",
  databaseURL: "https://foodflow-1a2eb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "foodflow-1a2eb",
  storageBucket: "foodflow-1a2eb.appspot.com",
  messagingSenderId: "323643009181",
  appId: "1:323643009181:web:8e4835bbb9caace5b8cc74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export {app,auth,database}
