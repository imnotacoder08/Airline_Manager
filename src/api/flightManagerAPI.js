import { handleResponse, handleError } from "./apiUtils";
import { uuidv4 } from "@firebase/util";

const baseUrl =
  "https://react-airline-fc30a-default-rtdb.firebaseio.com/flights/226de5d5-8bde-4b09-9a75-d5fd72224692/";

export async function getFlights() {
  try {
    const response = await fetch(baseUrl + "-NNkpaUdCw3dxU3lMUnX/" + ".json");
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function saveFlights(Flight) {
  try {
    const response = await fetch(baseUrl + "-NNkpaUdCw3dxU3lMUnX/" + ".json", {
      method: Flight.id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Flight),
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function getBookedSeats() {
  try {
    const response = await fetch(baseUrl + "/bookedSeats.json");
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function bookFlight(seatInfo) {
  try {
    const response = await fetch(
      baseUrl +
        "/bookedSeats/" +
        seatInfo.flight +
        "/" +
        seatInfo.seat +
        ".json",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(seatInfo),
      }
    );
    return handleResponse(response);
  } catch {
    return handleError(error);
  }
}

export async function cancelFlight(seatInfo) {
  try {
    const response = await fetch(
      baseUrl +
        "/bookedSeats/" +
        seatInfo.flight +
        "/" +
        seatInfo.seat +
        ".json",
      {
        method: "DELETE",
      }
    );
    return handleResponse(response);
  } catch {
    return handleError(error);
  }
}
