import React, { useEffect } from "react";
import MaterialTable from "@material-table/core";
import { Container, Select } from "@material-ui/core";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "@mui/material";
import { deletePassenger, savePassenger } from "../../api/passengerApi";
import { passenger_actions } from "../../store/passengers-slice";
import { cancelFlight } from "../../api/flightManagerAPI";
import { seat_actions } from "../../store/seat_slice";
const { useState } = React;

export default function ManagePassengers() {
  const dispatch = useDispatch();
  const initialData = useSelector((state) => state.passenger_slice.Passengers);
  const [data, setData] = useState(initialData);
  console.log(data);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  const remainingseats = useSelector(
    (state) => state.seat_slice.remainingSeats
  );
  let bookedSeats = useSelector((state) => state.seat_slice.bookedSeats);
  const Lookup = useSelector((state) => state.ancillaryServices_slice.lookup);
  const [flightLookup, serviceLookup, shoppingLookup, seatLookup] = Lookup;
  const columns = [
    { title: "Name", field: "name" },
    {
      title: "Spl Meals",
      field: "splMeals",
      type: "boolean",
    },
    { title: "Infants", field: "infants", type: "boolean" },
    {
      title: "WheelChair",
      field: "wheelChair",
      type: "boolean",
    },
    {
      title: "Flight",
      field: "flight",
      lookup: { ...flightLookup },
      editComponent: ({ value, onRowDataChange, rowData }) => (
        <Select
          value={value ? value : ""}
          onChange={(event) => {
            onRowDataChange({
              ...rowData,
              flight: event.target.value ?? "",
              seat: "",
            });
          }}
        >
          {Object.keys(flightLookup).map((flight) => (
            <MenuItem key={flight} value={flight}>
              {flightLookup[flight]}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      title: "Seat Number",
      field: "seat",
      editComponent: ({ value, onChange, rowData }) => (
        <Select
          value={value ? value : ""}
          onChange={(event) => onChange(event.target.value)}
        >
          {rowData.seat && (
            <MenuItem key={rowData.seat} value={rowData.seat}>
              {seatLookup[rowData.seat]}
            </MenuItem>
          )}
          {rowData.flight &&
            remainingseats[rowData.flight].map((seat) => {
              seat = seat ? seat : rowData.seat;
              return (
                <MenuItem key={seat} value={seat}>
                  {seatLookup[seat]}
                </MenuItem>
              );
            })}
        </Select>
      ),
    },
    {
      title: "Anciliary Service",
      field: "anciliary_service",
      lookup: { ...serviceLookup },
    },
    {
      title: "Shopping item",
      field: "shop",
      lookup: { ...shoppingLookup },
    },
  ];
  console.log(data);
  const style = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
    },
  };
  return (
    <>
      <meta
        name="description"
        content="Page allows admin to update Passenger's data for each flight."
      />
      <Navbar />
      <Container maxWidth="lg" sx={style.container}>
        <MaterialTable
          title="Passengers List"
          columns={columns}
          data={data}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise(async (resolve, reject) => {
                setData([...data, newData]);
                savePassenger(newData);
                dispatch(passenger_actions.addPassenger(newData));
                dispatch(
                  seat_actions.bookedSeats({
                    ...bookedSeats,
                    [newData.flight]: [
                      ...(bookedSeats[newData.flight] || []),
                      newData.seat,
                    ],
                  })
                );
                resolve();
              }),

            onRowUpdate: (newData, oldData) =>
              new Promise(async (resolve, reject) => {
                const dataUpdate = [...data];
                data.forEach((pass, idx) => {
                  if (pass.id === newData.id) dataUpdate[idx] = newData;
                });
                setData([...dataUpdate]);
                delete newData.tableData;
                savePassenger({ ...newData });
                dispatch(passenger_actions.updatePassenger(newData));
                resolve();
              }),

            onRowDelete: (oldData) =>
              new Promise(async (resolve, reject) => {
                const dataDelete = [...data];
                const index = oldData.id;
                const seatInfo = dataDelete.find((d) => d.id === index);
                const filteredData = dataDelete.filter(
                  (data) => data.id !== index
                );
                deletePassenger(index);
                cancelFlight(seatInfo);
                setData([...filteredData]);
                dispatch(passenger_actions.deletePassenger(filteredData));
                bookedSeats = {
                  ...bookedSeats,
                  [seatInfo.flight]: bookedSeats[seatInfo.flight].filter(
                    (seat) => seat !== seatInfo.seat
                  ),
                };
                dispatch(seat_actions.bookedSeats(bookedSeats));
                resolve();
              }),
          }}
        />
      </Container>
    </>
  );
}
