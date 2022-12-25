import React, { useEffect } from "react";
import MaterialTable from "@material-table/core";
import { Container, Select } from "@material-ui/core";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import AddPassenger from "../../APIs/AddPassengerData";
import DeletePassengerData from "../../APIs/DeletePassengerData";
import updatePassengerData from "../../APIs/UpdatePassangerData";
import { MenuItem } from "@mui/material";
const { useState } = React;

export default function ManagePassengers() {
  const initialData = useSelector((state) => state.passenger_slice.Passengers);
  const [data, setData] = useState(initialData);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  const remainingseats = useSelector(
    (state) => state.seat_slice.remainingSeats
  );

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
      title: "Anciliary Service",
      field: "anciliary_service",
      lookup: { ...serviceLookup },
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
      title: "Shopping item",
      field: "shop",
      lookup: { ...shoppingLookup },
    },
  ];

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
                await AddPassenger(newData);
                resolve();
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(async (resolve, reject) => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index - 1] = newData;
                setData([...dataUpdate]);
                console.log([...dataUpdate]);
                const updatedData = { ...newData };
                delete updatedData.tableData;
                await updatePassengerData(updatedData);
                resolve();
              }),
            onRowDelete: (oldData) =>
              new Promise(async (resolve, reject) => {
                const dataDelete = [...data];
                const index = oldData.id;
                const filteredData = dataDelete.filter(
                  (data) => data.id !== index
                );
                await DeletePassengerData(index);
                setData([...filteredData]);
                resolve();
              }),
          }}
        />
      </Container>
    </>
  );
}
