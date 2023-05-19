import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_KEY,
  authDomain: process.env.REACT_APP_FIRE_BASE_DOMAIN,
  projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_BASE_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export var autho = getAuth();

export const googleProvider = new GoogleAuthProvider();

export const gitProvider = new GithubAuthProvider();
