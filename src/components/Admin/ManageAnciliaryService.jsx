import React, { useEffect } from "react";
import MaterialTable from "@material-table/core";
import { Container } from "@material-ui/core";
import Navbar from "../Navbar";
const { useState } = React;
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import ancillaryServices_slice from "../../store/anciliaryServices_slice";
import {
  deleteAncillaryService,
  saveAncillaryService,
} from "../../api/ancillaryServiceApi";

export default function ManageAnciliaryService() {
  const dispatch = useDispatch();
  const anc = useSelector(
    (state) => state.ancillaryServices_slice.ancillary_services
  );
  console.log(anc);
  const columns = [
    {
      title: "Flight",
      field: "flight",
      lookup: { 1: "Flight 1", 2: "Flight 2", 3: "Flight  3" },
    },
    {
      title: "Anciliary Services",
      field: "services",
      lookup: { 1: "Service 1", 2: "Service 2", 3: "Service 3" },
      // initialEditValue: null,
    },
    {
      title: "Shopping Itms",
      field: "shopping_itms",
      lookup: {
        1: "Shopping Itms",
        2: "Shopping Itms 2",
        3: "Shopping Itms 3",
      },
    },
  ];
  const initialData = useSelector(
    (state) => state.ancillaryServices_slice.ancillary_services
  );
  const [data, setData] = useState(initialData);
  console.log(data);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  return (
    <>
      <meta
        name="description"
        content="Page allows admin to update anciliary services for each flight."
      />
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <MaterialTable
          title="Editable Preview"
          columns={columns}
          data={data}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  saveAncillaryService(newData);
                  dispatch(
                    ancillaryServices_slice.actions.addAncillaryServices(
                      newData
                    )
                  );
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  newData.id = v4();
                  console.log(newData);
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);
                  saveAncillaryService(newData);
                  dispatch(
                    ancillaryServices_slice.actions.updateAncillaryServices(
                      newData
                    )
                  );
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.id;
                  setData([...dataDelete]);
                  deleteAncillaryService(oldData);
                  dispatch(
                    ancillaryServices_slice.actions.deleteAncillaryServices(
                      oldData
                    )
                  );
                  resolve();
                }, 1000);
              }),
          }}
        />
      </Container>
    </>
  );
}
