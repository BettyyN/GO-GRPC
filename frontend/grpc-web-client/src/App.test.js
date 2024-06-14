import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders Ping Client heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Ping Client/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders input and button", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter message/i);
  const buttonElement = screen.getAllByText(/Ping/i)[1]; // Select the button, not the heading

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test("handles input and displays response", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter message/i);
  const buttonElement = screen.getAllByText(/Ping/i)[1]; // Select the button, not the heading

  fireEvent.change(inputElement, { target: { value: "Hello" } });
  fireEvent.click(buttonElement);

  // Assuming the response message is set immediately for the example
  const responseElement = await screen.findByText(/Hello/i);
  expect(responseElement).toBeInTheDocument();
});
