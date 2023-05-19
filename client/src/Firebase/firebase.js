import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLNsFsX6qUg-NNZ084fjZpkPa5SHu2QZk",
  authDomain: "veganworld-2aef9.firebaseapp.com",
  projectId: "veganworld-2aef9",
  storageBucket: "veganworld-2aef9.appspot.com",
  messagingSenderId: "700564277416",
  appId: "1:700564277416:web:244cd35953fb18b08d5a9d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export var autho = getAuth();

export const googleProvider = new GoogleAuthProvider();

export const gitProvider = new GithubAuthProvider();
