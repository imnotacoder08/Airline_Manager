import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  seats: {
    1: "A1",
    2: "A2",
    3: "A3",
    4: "A4",
    5: "B1",
    6: "B2",
    7: "B3",
    8: "B4",
    9: "C1",
    10: "C2",
    11: "C3",
    12: "C4",
  },
  bookedSeats: { 1: [], 3: [], 2: [] },
  remainingSeats: { 1: [], 3: [], 2: [] },
};
const seat_slice = createSlice({
  name: "seat_slice",
  initialState,
  reducers: {
    bookedSeats(state, action) {
      state.bookedSeats = action.payload;
      return state;
    },
    remainingSeats(state, action) {
      state.remainingSeats = action.payload;
      return state;
    },
  },
});
export const seat_actions = seat_slice.actions;

export default seat_slice;
