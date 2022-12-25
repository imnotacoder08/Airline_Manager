import React from "react";

export default function Test() {
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <div>
                  <List>
                    <ListItem>
                      <Button
                        variant="contained"
                        color={selectedFlight === 1 ? "primary" : "default"}
                        className={classes.button}
                        startIcon={<FlightIcon />}
                        onClick={(event) => {
                          setFlight(1);
                        }}
                      >
                        Flight 1 (10:00 AM)
                      </Button>

                      <Button
                        variant="contained"
                        color={selectedFlight === 2 ? "primary" : "default"}
                        className={classes.button}
                        startIcon={<FlightIcon />}
                        onClick={(event) => {
                          setFlight(2);
                        }}
                      >
                        Flight 2 (12:00 PM)
                      </Button>
                      <Button
                        variant="contained"
                        color={selectedFlight === 3 ? "primary" : "default"}
                        className={classes.button}
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
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              Filter:
              <Checkbox
                checked={filter.weelchair}
                onChange={(event) => {
                  handleWeelChairFilter(event);
                }}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <AccessibleIcon /> Passenger required weelchair
              <Checkbox
                checked={filter.infant}
                onChange={(event) => {
                  handleInfantFilter(event);
                }}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <ChildFriendlyIcon /> Passenger with infant
              <Checkbox
                checked={filter.specialMeals}
                onChange={(event) => {
                  handleSpecialMealsFilter(event);
                }}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <RestaurantMenuIcon /> Passenger requested special meal
              <Checkbox
                checked={filter.checkedIn}
                onChange={(event) => {
                  handleCheckedInFilter(event);
                }}
                inputProps={{
                  "aria-label": "primary checkbox",
                }}
              />
              <CheckCircleIcon /> Passenger checked in
            </Paper>
          </Grid>
          <Grid item xs={8} justify="space-between">
            {seatColumns.map((seatColumn) => (
              // eslint-disable-next-line react/jsx-key
              <Paper className={classes.paper}>
                {seatRows.map((seatRow) =>
                  isPassengerCheckedIn(seatColumn + seatRow)
                )}
              </Paper>
            ))}
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
