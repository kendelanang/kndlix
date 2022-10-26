// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSamfw2adlUhTsvg97mg1ZF_BP5wG9VoQ",
  authDomain: "kendlix.firebaseapp.com",
  projectId: "kendlix",
  storageBucket: "kendlix.appspot.com",
  messagingSenderId: "593699634598",
  appId: "1:593699634598:web:f89a12fe2544c7ce2ae367"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)