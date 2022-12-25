import { db } from "../firebase/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { ui_actions } from "../store/ui-slice";
export default function UserType(user, dispatch) {
  try {
    if (user === null) {
      dispatch(ui_actions.isAdmin(null));
      return;
    }
    const queryData = query(collection(db, "users"));
    const unsubscribe = onSnapshot(queryData, (querySnapShot) => {
      let users;
      querySnapShot.forEach((doc) => {
        if (user.email === doc.data().email)
          users = { ...doc.data(), id: doc.id };
      });
      dispatch(ui_actions.isAdmin(users.isAdmin));
    });
    return () => unsubscribe();
  } catch (error) {
    console.log(error);
  }
}
