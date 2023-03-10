import { createSlice } from "@reduxjs/toolkit";
const ancillary_services = [
  // { flight: 2, services: 1, shopping_itms: 3 },
  // { flight: 1, services: 3, shopping_itms: 2 },
];
const lookup = [
  { 1: "Flight 1", 2: "Flight 2", 3: "Flight  3" },
  { 1: "Service 1", 2: "Service 2", 3: "Service 3" },
  {
    1: "Shopping Itms",
    2: "Shopping Itms 2",
    3: "Shopping Itms 3",
  },
  {
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
];
const initialState = { ancillary_services, lookup };
const ancillaryServices_slice = createSlice({
  name: "ancillaryServices_slice",
  initialState,
  reducers: {
    fetchAncService(state, action) {
      console.log(action.payload);
      state.ancillary_services.push(...action.payload);
      return state;
    },
    addAncillaryServices(state, action) {
      console.log(action.payload);
      state.ancillary_services.push(action.payload);
      return state;
    },
    updateAncillaryServices(state, action) {
      const targetService = state.ancillary_services.find(
        (ancillary_service) => ancillary_service.id === action.payload.id
      );
      const filteredResult = state.ancillary_services.filter(
        (ancillary_service) => ancillary_service.id !== action.payload.id
      );

      state.ancillary_services = [...filteredResult, targetService];
      return state;
    },
    deleteAncillaryServices(state, action) {
      const filteredResult = state.ancillary_services.filter(
        (ancillary_service) => {
          console.log(ancillary_service, action.payload);
          return ancillary_service.id !== action.payload.id;
        }
      );
      state.ancillary_services = filteredResult;
      return state;
    },
  },
});

export const ancillaryServices_actions = ancillaryServices_slice.actions;
export default ancillaryServices_slice;
