import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1F56FU1rYYRt8NAg6GxJESAziXn8Unq4",
  authDomain: "auth-ac5fe.firebaseapp.com",
  projectId: "auth-ac5fe",
  storageBucket: "auth-ac5fe.firebasestorage.app",
  messagingSenderId: "641093711229",
  appId: "1:641093711229:web:28e440b7e453e2f15a0814",
  measurementId: "G-C9QVF5GSE4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Aquí obtienes los datos del usuario
      const user = result.user;
      console.log("Bienvenido:", user.displayName);
      //   document.getElementById('userProfile').innerHTML = `Hola, ${user.displayName}`;
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error.message);
    });
};
