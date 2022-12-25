import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
async function AddPassenger(passengerData) {
  try {
    await addDoc(collection(db, "passengers"), passengerData);
    toast.success("Added Passenger", {
      position: "bottom-center",
    });
  } catch (error) {
    toast.error("Failed To Add the Passenger", { position: "bottom-center" });
    console.log(error);
  }
}
export default AddPassenger;
