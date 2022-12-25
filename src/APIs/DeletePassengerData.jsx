import { db } from "../firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";

import { toast } from "react-toastify";
export default async function DeletePassengerData(id) {
  try {
    toast.success("Passenger Data Deleted.", { position: "bottom-center" });
    await deleteDoc(doc(db, "passengers", id));
  } catch (error) {
    toast.error("Failed to Delete the Data.", { position: "bottom-center" });
  }
}
