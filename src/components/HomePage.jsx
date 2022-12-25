import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import LoginAs from "./Login/LoginAs";
export default function HomePage() {
  const user = useSelector((state) => state.userSlice.currentUser);
  return <div>{user ? <Dashboard /> : <LoginAs LogInAs="Staff" />}</div>;
}
