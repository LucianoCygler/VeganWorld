import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";
// Your web app's Firebase configuration

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export var autho = getAuth();

export const googleProvider = new GoogleAuthProvider();

export const gitProvider = new GithubAuthProvider();
