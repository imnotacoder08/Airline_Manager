import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  seats: {},
  bookedSeats: {},
  remainingSeats: {},
};
const seat_slice = createSlice({
  name: "seat_slice",
  initialState,
  reducers: {
    seats(state, action) {
      state.seats = action.payload;
      return state;
    },
    bookedSeats(state, action) {
      state.bookedSeats = action.payload;
      state.remainingSeats = {};
      Object.keys(state.seats).forEach((flight) => {
        if (Object.keys(state.bookedSeats).includes(flight)) {
          state.remainingSeats[flight] = state.seats[flight].filter(
            (s) => !state.bookedSeats[flight].includes(s)
          );
        } else {
          state.remainingSeats[flight] = state.seats[flight];
        }
      });
      return state;
    },
  },
});
export const seat_actions = seat_slice.actions;

export default seat_slice;
