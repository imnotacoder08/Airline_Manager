import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  editPassengers: false,
  addNewPassengers: false,
  isAdmin: null,
  loggingIn: false,
  loggingOut: false,
};
const ui_slice = createSlice({
  name: "ui_slice",
  initialState,
  reducers: {
    loggingIn(state) {
      state.loggingIn = !state.loggingIn;
    },
    loggingOut(state) {
      state.loggingOut = !state.loggingOut;
    },
    setEditPassengers(state) {
      state.editPassengers = !state.editPassengers;
      return state;
    },
    setAddNewPassengers(state) {
      state.addNewPassengers = !state.addNewPassengers;
      console.log(state.addNewPassengers);
      return state;
    },
    CheckInEdit(state, action) {
      state.currentPass = action.payload.currentPass;
    },
    isAdmin(state, action) {
      state.isAdmin = action.payload;
      return state;
    },
  },
});
export const ui_actions = ui_slice.actions;
export default ui_slice;
