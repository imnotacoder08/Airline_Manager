import { handleResponse, handleError } from "./apiUtils";
const baseUrl =
  "https://react-airline-fc30a-default-rtdb.firebaseio.com/flights/226de5d5-8bde-4b09-9a75-d5fd72224692/-NNkpaUdCw3dxU3lMUnX/";

export async function getAncillaryServices(flightId) {
  console.log(baseUrl + flightId + "/ancillaryServices.json");
  try {
    console.log(flightId);
    const response = await fetch(
      baseUrl + flightId + "/ancillaryServices.json"
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function saveAncillaryService(ancillaryService) {
  try {
    const response = await fetch(
      baseUrl + (ancillaryService.flight || "") + "/ancillaryServices.json",
      {
        method: ancillaryService.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(ancillaryService),
      }
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteAncillaryService(ancillaryService) {
  try {
    console.log(
      baseUrl +
        `${ancillaryService.flight}/ancillaryServices/${ancillaryService.id}` +
        ".json"
    );
    const response = await fetch(
      baseUrl +
        `${ancillaryService.flight}/ancillaryServices/${ancillaryService.id}` +
        ".json",
      {
        method: "DELETE",
      }
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}
