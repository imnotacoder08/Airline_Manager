import React, { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { ui_actions } from "../../store/ui-slice";
import { Link } from "react-router-dom";
import { LogoutAction } from "../../store/firebaseStore";

export default function LoginAs() {
  const isLoading = useSelector((state) => state.ui_slice.loggingOut);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.currentUser);
  async function logoutHanlder() {
    dispatch(LogoutAction());
    dispatch(ui_actions.isAdmin(null));
  }
  const [logInAs, setLogInAs] = useState("");
  return (
    <div>
      <meta
        name="description"
        content="Airline Manager App's Login Page that Prompts user to tell how they would like to log in."
      />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ text: "center", marginTop: "10rem", textAlign: "center" }}
      >
        {!user ? (
          <>
            {logInAs === "" ? (
              <>
                <Typography variant="h3">LoginAs</Typography>
                <Button
                  aria-label="logging in as Staff"
                  variant="contained"
                  color="primary"
                  sx={{ margin: "1rem" }}
                  onClick={() => setLogInAs("Staff")}
                >
                  Login As Staff
                </Button>
                <Button
                  aria-label="logging in as Admin"
                  variant="outlined"
                  color="primary"
                  onClick={() => setLogInAs("Admin")}
                >
                  Login As Admin
                </Button>
              </>
            ) : (
              <Login logInAs={logInAs} />
            )}
          </>
        ) : (
          <>
            <Button
              aria-label="logging out"
              disabled={isLoading}
              variant="contained"
              color="primary"
              onClick={logoutHanlder}
            >
              Logout
            </Button>
            <Button
              aria-label="Taking to Dashboard"
              color="primary"
              variant="outlined"
              sx={{ margin: "0 0 0 2rem", color: "gray" }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                Go To Dashboard
              </Link>
            </Button>
          </>
        )}
      </Container>
    </div>
  );
}
