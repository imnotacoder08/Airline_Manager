import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function StaffDashboard() {
  return (
    <>
      <meta
        name="description"
        content="Page allows staff to choose between InFlight and check in Passengers info."
      />
      <Grid container spacing={4} justifyContent="center" textAlign="center">
        <Grid item xs={8} md={6}>
          <Card>
            <Link
              to="/check-in"
              style={{ textDecoration: "none", color: "black" }}
            >
              <CardContent>
                <Typography variant="h6" sm={{ padding: "2rem" }}>
                  Check In
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={8} md={6}>
          <Card>
            <Link
              to="/in-flight"
              style={{ textDecoration: "none", color: "black" }}
            >
              <CardContent>
                <Typography variant="h6" sm={{ padding: "2rem" }}>
                  In Flight
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
