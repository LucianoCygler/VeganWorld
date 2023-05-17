import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB03m1l8HeQiSN_0FfsJqI9J9EHuUOjlTM",
  authDomain: "veganworld-19e36.firebaseapp.com",
  projectId: "veganworld-19e36",
  storageBucket: "veganworld-19e36.appspot.com",
  messagingSenderId: "598882143729",
  appId: "1:598882143729:web:7c53a4f9e4b28ecb57c850",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const gitProvider = new GithubAuthProvider();
