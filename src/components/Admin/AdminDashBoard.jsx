import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashBoard() {
  return (
    <>
      <meta
        name="description"
        content="Dashboard for admin here he can choose one of option between Anciliary services and Manage Passengers."
      />
      <Grid container spacing={4} justifyContent="center" textAlign="center">
        <Grid item xs={8} md={6}>
          <Card>
            <Link
              to="/manage-anciliary-services"
              style={{ textDecoration: "none", color: "black" }}
            >
              <CardContent>
                <Typography variant="h6" sm={{ padding: "2rem" }}>
                  Manage Anciliary Services
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={8} md={6}>
          <Card>
            <Link
              to="/manage-passangers"
              style={{ textDecoration: "none", color: "black" }}
            >
              <CardContent>
                <Typography variant="h6" sm={{ padding: "2rem" }}>
                  Manage Passengers
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
