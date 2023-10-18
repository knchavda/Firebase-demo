import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBjHh63GbLZnJOw6BdVeU1L4ZV-zgvP6eo",
  authDomain: "fir-demo-93c5f.firebaseapp.com",
  projectId: "fir-demo-93c5f",
  storageBucket: "fir-demo-93c5f.appspot.com",
  messagingSenderId: "38446041344",
  appId: "1:38446041344:web:5ceb197d91bef9d5334be5",
  measurementId: "G-7HHLNVHSYN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
