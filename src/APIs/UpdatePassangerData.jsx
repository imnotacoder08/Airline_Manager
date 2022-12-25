import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
async function updatePassengerData(passengerData) {
  try {
    const user = doc(db, "passengers", passengerData.id);
    await updateDoc(user, passengerData);
    toast.success("Updated successfully.", { position: "bottom-right" });
  } catch (error) {
    console.log(error);
    toast.error("Update failed.", { position: "bottom-right" });
  }
}
export default updatePassengerData;
