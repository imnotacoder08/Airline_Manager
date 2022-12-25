import { createSlice } from "@reduxjs/toolkit";
const Passengers = [];
const initialState = { Passengers };
const passenger_slice = createSlice({
  name: "passenger_slice",
  initialState,
  reducers: {
    fetchPassengers(state, action) {
      state.Passengers = action.payload;
      return state;
    },
    addPassenger(state, action) {
      state.Passengers.push(action.payload);
      return state;
    },
    updatePassenger(state, action) {
      const unChangedInfo = state.Passengers.filter(
        (pass) => pass.id !== action.payload.id
      );
      state.Passengers = [...unChangedInfo, action.payload];
      console.log(state.Passengers);
      return state;
    },
    deletePassenger(state, action) {
      console.log(action.payload);
      state.Passengers = [...action.payload];
      return state;
    },
  },
});

export const passenger_actions = passenger_slice.actions;
export default passenger_slice;
