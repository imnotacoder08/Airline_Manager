import { Container } from "@mui/material";
import React from "react";
import AdminDashBoard from "./Admin/AdminDashBoard";
import StaffDashBoard from "./Staff/StaffDashBoard";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
export default function Dashboard() {
  const isAdmin = useSelector((state) => state.ui_slice.isAdmin);
  return (
    <>
      <Navbar />
      {isAdmin !== null && (
        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: "#1976d2ba",
            marginTop: "32px",
            padding: "32px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isAdmin ? <AdminDashBoard /> : <StaffDashBoard />}
        </Container>
      )}
    </>
  );
}
