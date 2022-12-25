import { Button, Grid } from "@mui/material";
import React from "react";
import AccessibleIcon from "@material-ui/icons/Accessible";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import style from "./style";
import { useDispatch } from "react-redux";
import { ui_actions } from "../../store/ui-slice";

export default function SeatLayout({
  seat,
  setEditing,
  editing,
  Passengers,
  seatLookup,
}) {
  const dispatch = useDispatch();
  const matched = Passengers.find((pass) => pass.seat == seat);
  return (
    <Grid item xs={6} md={3} lg={2}>
      <Button
        aria-label={`Selecting passenger on seat  ${
          (matched && matched.seat) || "random passenger"
        }`}
        disabled={!matched}
        sx={style.button}
        variant={matched ? "contained" : "outlined"}
        onClick={() => {
          if (!setEditing) return;
          dispatch(ui_actions.CheckInEdit({ currentPass: matched }));
          setEditing(!editing);
        }}
      >
        {seatLookup[seat]}
        {
          <AccessibleIcon
            color={matched && matched.wheelChair ? "inherit" : "disabled"}
          />
        }
        {
          <ChildFriendlyIcon
            color={matched && matched.infants ? "inherit" : "disabled"}
          />
        }
        {
          <RestaurantMenuIcon
            color={matched && matched.splMeals ? "inherit" : "disabled"}
          />
        }
        {
          <CheckCircleIcon
            color={matched && matched.checkedIn ? "inherit" : "disabled"}
          />
        }
      </Button>
    </Grid>
  );
}
