import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { MemoryRouter } from "react-router";
import store from "./store";
export function renderWithProviders(ui) {
  render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}
