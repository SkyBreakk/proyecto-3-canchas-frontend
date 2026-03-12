import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAztlBXTvLfGjPEud-VvRN3_IZBz79Opso",
  authDomain: "auth-ac5fe-d5512.firebaseapp.com",
  projectId: "auth-ac5fe-d5512",
  storageBucket: "auth-ac5fe-d5512.firebasestorage.app",
  messagingSenderId: "831121148453",
  appId: "1:831121148453:web:a9a1f8da54d48b1d2f4dcc",
  measurementId: "G-XX1EW0MYPK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    return {
      ok: true,
      email: user.email,
      name: user.displayName,
    };

  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
