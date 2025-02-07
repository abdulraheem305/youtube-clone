import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF0mZrwJirC-dAEHuf1Yb0yvmmIGTuicg",
  authDomain: "fir-341c4.firebaseapp.com",
  projectId: "fir-341c4",
  storageBucket: "fir-341c4.appspot.com",
  messagingSenderId: "490697138000",
  appId: "1:490697138000:web:caa393e2e7ee2db2afd655",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
