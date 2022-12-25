import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase";
import { ui_actions } from "./ui-slice";

const initialState = { currentUser: null, error: null };
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
      return state;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload.currentUser;
      return state;
    },
    setError(state, action) {
      state.error = action.payload;
      return state;
    },
  },
});

export const loginWIthGoogle = () => {
  return async (dispatch) => {
    dispatch(ui_actions.loggingIn());
    try {
      await firebase.signInWithPopup(auth);
      dispatch(user_actions.setError(null));
      toast.info("Log In Successful.", { position: "bottom-center" });
    } catch (error) {
      dispatch(user_actions.setError(error));
      console.log(error.message);
    }
    dispatch(ui_actions.loggingIn());
  };
};

export const SignInAction = (email, password) => {
  console.log(email);
  return async (dispatch) => {
    dispatch(ui_actions.loggingIn());
    try {
      await firebase.signInWithEmailAndPassword(auth, email, password);
      dispatch(user_actions.setError(null));
      toast.info("Log In Successful.", { position: "bottom-center" });
    } catch (error) {
      dispatch(user_actions.setError(error));
      console.log(error.message);
    }
    dispatch(ui_actions.loggingIn());
  };
};
export const LogoutAction = () => {
  return async (dispatch) => {
    dispatch(ui_actions.loggingOut());
    try {
      await firebase.signOut(auth);
      dispatch(user_actions.setError(null));
      toast.info("Log Out Successfully.", { position: "bottom-center" });
    } catch (error) {
      dispatch(user_actions.setError(error));
      console.log(error);
    }
    dispatch(ui_actions.loggingOut());
  };
};
export default userSlice;
export const user_actions = userSlice.actions;
// // trackUserAuth.ts
// firebase.onAuthStateChanged(auth, (user) => {
//   if (user) {
//     dispatch(user_actions.setLoginStatus(true));
//     dispatch(user_actions.setCurrentUser({ currentUser: user }));
//   } else {
//     dispatch(user_actions.setLoginStatus(true));
//   }
// });
// const usr = useSelector((state) => state.userSlice.currentUser);
// console.log(usr);
