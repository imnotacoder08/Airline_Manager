import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router";
import LoginAs from "./components/Login/LoginAs";
import ManagePassangers from "./components/Admin/ManagePassengers";
import ManageAnciliaryCervices from "./components/Admin/ManageAnciliaryService";
import CheckIn from "./components/Staff/CheckIn";
import InFlight from "./components/Staff/InFlight";
import { auth } from "./firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { user_actions } from "./store/firebaseStore";
import UserType from "./APIs/UserType";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { seat_actions } from "./store/seat_slice";
import { useEffect } from "react";
import PassengerData from "./APIs/PassengerData";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscriber = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        dispatch(user_actions.setCurrentUser({ currentUser: user }));
        UserType(user, dispatch);
        PassengerData(dispatch);
      } else {
        dispatch(user_actions.setCurrentUser({ currentUser: user }));
      }
    });
    return unSubscriber;
  }, []);

  const initialData = useSelector((state) => state.passenger_slice.Passengers);
  useEffect(() => {
    dispatch(seat_actions.bookedSeats(bookedSeats));
    dispatch(seat_actions.remainingSeats(remainingseats));
  }, [initialData]);
  console.log(initialData);
  const bookedSeats = { 1: [], 2: [], 3: [] };
  let remainingseats = {
    1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  };
  Object.keys(initialData).forEach((key) => {
    const flight = initialData[key].flight;
    const seat = initialData[key].seat;
    bookedSeats[flight].push(seat);
    remainingseats[flight] = remainingseats[flight].filter(
      (rs) => rs !== Number(seat)
    );
  });

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginAs />} />
        <Route path="/manage-passangers" element={<ManagePassangers />} />
        <Route
          path="/manage-anciliary-services"
          element={<ManageAnciliaryCervices />}
        />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/in-flight" element={<InFlight />} />
      </Routes>
    </div>
  );
}

export default App;
