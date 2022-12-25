import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "2rem" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              AirLine-Manager
            </Link>
          </Typography>
          <Link to="/login">
            <Button aria-label="Taking to login page." color="inherit">
              <AccountCircleIcon />
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
