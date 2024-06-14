import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Client from "../Client";

describe("Client Component", () => {
  test("renders input and button", () => {
    render(<Client />);
    const inputElement = screen.getByPlaceholderText(/Enter message/i);
    const buttonElement = screen.getByText(/Ping/i);

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("handles input and displays response", async () => {
    render(<Client />);
    const inputElement = screen.getByPlaceholderText(/Enter message/i);
    const buttonElement = screen.getByText(/Ping/i);

    fireEvent.change(inputElement, { target: { value: "Hello" } });
    fireEvent.click(buttonElement);

    // Mock the gRPC client call
    await screen.findByText(/Hello/i);
  });
});
