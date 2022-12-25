import { configureStore } from "@reduxjs/toolkit";
import ui_slice from "./ui-slice";
import passenger_slice from "./passengers-slice";
import ancillaryServices_slice from "./anciliaryServices_slice";
import userSlice from "./firebaseStore";
import seat_slice from "./seat_slice";
const store = configureStore({
  reducer: {
    ui_slice: ui_slice.reducer,
    passenger_slice: passenger_slice.reducer,
    ancillaryServices_slice: ancillaryServices_slice.reducer,
    userSlice: userSlice.reducer,
    seat_slice: seat_slice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
export default store;
