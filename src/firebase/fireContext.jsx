// import React, { useContext, useState, useEffect } from "react";
// import { auth } from "./firebase";
// import * as firebase from "firebase/auth";

// const AuthContext = React.createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }
// export const AuthProvider = ({ children }) => {
//   const [CurrentUser, setCurrentUser] = useState();
//   useEffect(() => {
//     const unsubscribber = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//     });
//     return unsubscribber;
//   }, []);
//   function signup(email, password) {
//     return firebase.createUserWithEmailAndPassword(auth, email, password);
//   }
//   const value = { CurrentUser, signup, login, signOut, googleSignUp };
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
