import { handleResponse, handleError } from "./apiUtils";
import { uuidv4 } from "@firebase/util";
import { toast } from "react-toastify";
import { bookFlight } from "./flightManagerAPI";

const baseUrl =
  "https://react-airline-fc30a-default-rtdb.firebaseio.com/passengers/";

export async function getPassengers() {
  try {
    const response = await fetch(baseUrl + ".json");
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function savePassenger(passenger) {
  passenger.id = passenger.id || uuidv4();
  try {
    const response = await fetch(baseUrl + (passenger.id || "") + ".json", {
      method: passenger.id ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(passenger),
    });
    toast.success("Saved Passenger Info.", {
      position: "bottom-center",
    });
    await bookFlight(passenger);
    return handleResponse(response);
  } catch (error) {
    toast.error("Failed to Save Passenger Info.", {
      position: "bottom-center",
    });
    return handleError(error);
  }
}

export async function deletePassenger(passengerId) {
  try {
    const response = await fetch(baseUrl + passengerId + ".json", {
      method: "DELETE",
    });
    toast.success("Deleted Passenger Info.", {
      position: "bottom-center",
    });
    return handleResponse(response);
  } catch (error) {
    toast.error("failed to Delete Passenger Info.", {
      position: "bottom-center",
    });
    return handleError(error);
  }
}
