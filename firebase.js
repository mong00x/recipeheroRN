// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/";
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsD332knlV9Tt0CoU6Y556Wb0ktkXLv8I",
  authDomain: "ocr-47178.firebaseapp.com",
  projectId: "ocr-47178",
  databaseURL:
    "https://ocr-47178-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "ocr-47178.appspot.com",
  messagingSenderId: "335041156527",
  appId: "1:335041156527:web:ec699fc50be2b159ab8b5a",
  measurementId: "G-BME0C9BJJ6",
};

// console.log(firebase);

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// console.log(app);

const database = firebase.database();
console.log(database);

const auth = firebase.auth();
console.log(auth);

export { auth };
