import { screen } from "@testing-library/react";
import Navbar from "./components/Navbar";
import App from "./App";
import { renderWithProviders } from "./RenderWithProvider";
import Login from "./components/Login/Login";

describe("Test App", () => {
  it("should render Navbar", () => {
    renderWithProviders(<Navbar />);
    const title = screen.getByText(/AirLine-Manager/i);
    expect(title).toBeInTheDocument();
  });
  it("should render App", () => {
    renderWithProviders(<App />);
    const title = screen.getByText(/LoginAs/i);
    expect(title).toBeInTheDocument();
  });
  it("Button click should take us to actual login page.", () => {
    renderWithProviders(<App />);
    const title = screen.getByText(/LoginAs/i);
    expect(title).toBeInTheDocument();
  });
  it("Button click should take us to actual login page.", () => {
    renderWithProviders(<Login logInAs={"my app"} />);
    const title = screen.getByText(/my app/i);
    expect(title).toBeInTheDocument();
  });
  it("Button click should take us to actual login page.", () => {
    renderWithProviders(<Login logInAs={"my app"} />);
    const title = screen.getByText("Sign In");
    expect(title).toBeInTheDocument();
  });
});
