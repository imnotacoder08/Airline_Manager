import { handleResponse, handleError } from "./apiUtils";
const baseUrl =
  "https://react-airline-fc30a-default-rtdb.firebaseio.com/checkInPassengers/";

export async function getCheckInPassengers() {
  try {
    const response = await fetch(baseUrl);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function saveCheckInPassenger(checkInPassengers) {
  try {
    const response = await fetch(
      baseUrl + (checkInPassengers.id || "") + ".json",
      {
        method: checkInPassengers.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(checkInPassengers),
      }
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteCheckInPassenger(checkInPassengersId) {
  try {
    const response = await fetch(baseUrl + checkInPassengersId + ".json", {
      method: "DELETE",
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
