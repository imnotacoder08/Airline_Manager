import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router";
import LoginAs from "./components/Login/LoginAs";
import ManagePassangers from "./components/Admin/ManagePassengers";
import ManageAnciliaryCervices from "./components/Admin/ManageAnciliaryService";
import CheckIn from "./components/Staff/CheckIn";
import InFlight from "./components/Staff/InFlight";
import { auth } from "./firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { user_actions } from "./store/firebaseStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { seat_actions } from "./store/seat_slice";
import { useEffect, useState } from "react";
import { getPassengers } from "./api/passengerApi";
import passenger_slice from "./store/passengers-slice";
import { getBookedSeats, getFlights } from "./api/flightManagerAPI";
import { getAncillaryServices } from "./api/ancillaryServiceApi";
import { ancillaryServices_actions } from "./store/anciliaryServices_slice";

function App() {
  const [flights, setFlights] = useState([]);
  // const seats = {
  //   1: "A1",
  //   2: "A2",
  //   3: "A3",
  //   4: "A4",
  //   5: "B1",
  //   6: "B2",
  //   7: "B3",
  //   8: "B4",
  //   9: "C1",
  //   10: "C2",
  //   11: "C3",
  //   12: "C4",
  // };
  // const bookedSeats = { 1: [], 3: [], 2: [] };
  // const remainingSeats = { 1: [], 3: [], 2: [] };
  // const obj = {
  //   1: {
  //     seats,
  //     bookedSeats,
  //     remainingSeats,
  //   },
  //   2: {
  //     seats,
  //     bookedSeats,
  //     remainingSeats,
  //   },
  //   3: {
  //     seats,
  //     bookedSeats,
  //     remainingSeats,
  //   },
  // };
  // // saveFlights(obj);
  // const seatInfo = {
  //   flight: 1,
  //   seat: "A1",
  // };
  // const seatInfo2 = {
  //   flight: 1,
  //   seat: "A2",
  // };
  //bookFlight(seatInfo2);
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscriber = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(user_actions.setCurrentUser({ currentUser: user }));
      }
      return unSubscriber;
    });

    getFlights().then((data) => {
      const totalSeats = {};
      Object.keys(data).forEach((key) => {
        if (data[key])
          totalSeats[key] = Object.values(data[key].seats).filter(
            (s) => s !== null
          );
      });
      setFlights(Object.keys(totalSeats));
      dispatch(seat_actions.seats(totalSeats));
    });

    getPassengers().then((data) => {
      const finalData = [];
      if (data)
        Object.values(data).forEach((passenger) => {
          finalData.push(passenger);
        });
      dispatch(passenger_slice.actions.fetchPassengers(finalData));
    });

    getBookedSeats().then((data) => {
      const bookedSeats = {};
      if (data)
        Object.keys(data).forEach((key) => {
          if (data[key])
            bookedSeats[key] = Object.keys(data[key]).filter((s) => s !== null);
        });
      dispatch(seat_actions.bookedSeats(bookedSeats));
    });
  }, []);

  useEffect(() => {
    let d = [];
    flights.forEach(async (flight) => {
      await getAncillaryServices(flight).then((data) => {
        console.log(data);
        const finalData = [];
        data &&
          Object.keys(data).forEach((key) => {
            data[key].id = key;
            console.log(data[key]);
            finalData.push(data[key]);
          });
        d.push(...finalData);
      });
      dispatch(ancillaryServices_actions.fetchAncService(d));
      d = [];
    });
  }, [flights]);
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
