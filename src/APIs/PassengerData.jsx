import { db } from "../firebase/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { passenger_actions } from "../store/passengers-slice";
export default async function PassengerData(passengerDataDispatch) {
  console.log("started fetching");
  try {
    const queryData = query(collection(db, "passengers"));
    const unsubscribe = onSnapshot(queryData, (querySnapShot) => {
      let passenger_details = [];
      querySnapShot.forEach((doc) => {
        passenger_details.push({ ...doc.data(), id: doc.id });
      });
      passengerDataDispatch(
        passenger_actions.fetchPassengers(passenger_details)
      );
    });
    return () => unsubscribe();
  } catch (error) {
    console.log(error);
  }
}
