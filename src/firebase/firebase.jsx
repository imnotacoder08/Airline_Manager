import * as firebase from "firebase/auth";
import { initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore";
const firebaseConfig =
  import.meta.env.MODE === "development"
    ? {
        apiKey: "AIzaSyDEKKg7fdiyhhjdTmC0MvASAHKR2ug5QIY",
        authDomain: "react-airline-fc30a.firebaseapp.com",
        projectId: "react-airline-fc30a",
        storageBucket: "react-airline-fc30a.appspot.com",
        messagingSenderId: "543823767453",
        appId: "1:543823767453:web:9f414f11bbe1ee094ef174",
      }
    : {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_authDomain,
        projectId: import.meta.env.VITE_projectId,
        storageBucket: import.meta.env.VITE_storageBucket,
        messagingSenderId: import.meta.env.VITE_messagingSenderId,
        appId: import.meta.env.VITE_appId,
      };
const app = initializeApp(firebaseConfig);
export const auth = firebase.getAuth(app);
export const db = firestore.getFirestore(app);
export default app;
