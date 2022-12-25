import style from "./style";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Navbar";
import AccessibleIcon from "@material-ui/icons/Accessible";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import Checkbox from "@material-ui/core/Checkbox";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import FlightIcon from "@material-ui/icons/Flight";
import { Container } from "@mui/system";
import InFlightInfo from "./InFlightInfo";
import SeatLayout from "./SeatLayout";
export default function InFlight() {
  let Passengers = useSelector((state) => state.passenger_slice.Passengers);
  const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [flight, setFlight] = useState(1);
  const [filtering, setFiltering] = useState({
    anciliary_service: false,
    wheelchair: false,
    infant: false,
    splmeal: false,
  });
  Passengers = Passengers.filter((pass) => {
    return (
      pass.checkedIn &&
      flight === Number(pass.flight) &&
      (filtering.wheelchair ? pass.wheelChair : true) &&
      (filtering.infant ? pass.infants : true) &&
      (filtering.splmeal ? pass.splMeals : true) &&
      (filtering.checkIn ? pass.checkedIn : true)
    );
  });
  const currentEditablePassenger = useSelector(
    (state) => state.ui_slice.currentPass
  );
  console.log(Passengers);
  const seatLookup = useSelector((state) => state.seat_slice.seats);
  const [editing, setEditing] = useState(false);
  return (
    <>
      <meta
        name="description"
        content="Page allows staff to manage Passengers onboarded on each flight."
      />
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{
          overflow: "hidden",
        }}
      >
        <React.Fragment>
          <div className={style.root}>
            <Grid container spacing={1}>
              {/* Flights */}
              <Grid item xs={12}>
                <Paper sx={style.paper}>
                  <Grid item xs={12}>
                    <div>
                      <List>
                        <ListItem sx={style.listItem}>
                          <Button
                            aria-label="Selecting flight 1"
                            variant="contained"
                            color={flight === 1 ? "primary" : "inherit"}
                            sx={style.button}
                            startIcon={<FlightIcon />}
                            onClick={(event) => {
                              setFlight(1);
                            }}
                          >
                            Flight 1 (10:00 AM)
                          </Button>
                          <Button
                            aria-label="Selecting flight 2"
                            variant="contained"
                            color={flight === 2 ? "primary" : "inherit"}
                            sx={style.button}
                            startIcon={<FlightIcon />}
                            onClick={(event) => {
                              setFlight(2);
                            }}
                          >
                            Flight 2 (12:00 PM)
                          </Button>
                          <Button
                            aria-label="Selecting flight 3"
                            variant="contained"
                            color={flight === 3 ? "primary" : "inherit"}
                            sx={style.button}
                            startIcon={<FlightIcon />}
                            onClick={(event) => {
                              setFlight(3);
                            }}
                          >
                            Flight 3 (18:00 PM)
                          </Button>
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                </Paper>
              </Grid>
              {/* filtering */}
              <Grid item xs={12}>
                <Paper sx={style.paper}>
                  Filter:
                  <div className={style.div}>
                    <Checkbox
                      checked={filtering.wheelchair}
                      onChange={(event) => {
                        setFiltering((prev) => {
                          return { ...prev, wheelchair: !filtering.wheelchair };
                        });
                        // handleWeelChairFilter(event);
                      }}
                      inputProps={{
                        "aria-label": "primary checkbox",
                      }}
                    />
                    <AccessibleIcon /> Passenger required weelchair
                  </div>
                  <div className={style.div}>
                    <Checkbox
                      checked={filtering.infant}
                      onChange={(event) => {
                        setFiltering((prev) => {
                          return { ...prev, infant: !filtering.infant };
                        });
                        // handleInfantFilter(event);
                      }}
                      inputProps={{
                        "aria-label": "primary checkbox",
                      }}
                    />
                    <ChildFriendlyIcon /> Passenger with infant
                  </div>
                  <div
                    className={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={filtering.splmeal}
                      onChange={(event) => {
                        setFiltering((prev) => {
                          return { ...prev, splmeal: !filtering.splmeal };
                        });
                        // handleSpecialMealsFilter(event);
                      }}
                      inputProps={{
                        "aria-label": "primary checkbox",
                      }}
                    />
                    <RestaurantMenuIcon /> Passenger requested special meal
                  </div>
                </Paper>
              </Grid>
              {/* Seat Layout */}
              <Grid item xs={12} justify="space-between">
                <Paper sx={style.paper}>
                  <Grid container>
                    {seats.map((seat) => {
                      return (
                        <SeatLayout
                          key={seat}
                          seat={seat}
                          setEditing={setEditing}
                          editing={editing}
                          Passengers={Passengers}
                          seatLookup={seatLookup}
                        />
                      );
                    })}
                  </Grid>
                </Paper>
                ;
              </Grid>
            </Grid>
          </div>
          {/* Editing */}
          {editing && (
            <Dialog onClose={() => setEditing(!editing)} open={editing}>
              <DialogTitle>Check Passenger's Info</DialogTitle>
              <Grid container>
                <InFlightInfo
                  onClick={() => setEditing(!editing)}
                  passengerInfo={currentEditablePassenger}
                />
              </Grid>
            </Dialog>
          )}
        </React.Fragment>
      </Container>
    </>
  );
}
