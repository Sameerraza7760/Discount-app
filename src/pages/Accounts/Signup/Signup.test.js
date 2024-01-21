import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Signup from "./Signup";

test("renders the heading with correct text and style", () => {
  render(<Signup />);
  const heading = screen.getByText(/SAYLANI WELFARE/i);
  const paragraph = screen.getByText("ONLINE DISCOUNT STORE");
  const allTextFields = screen.getAllByRole("textbox");
  const textFieldByLabel = screen.getByLabelText("FullName");
  const fullNameInput = screen.getByLabelText("FullName");
  const emailInput = screen.getByLabelText("Email");
  const passwordInput = screen.getByLabelText("Password");
  const contactInput = screen.getByLabelText("Contact");
  const buttonSignup = screen.getByRole("button");

  fireEvent.change(fullNameInput, { target: { value: "Test User" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "testpassword" } });
  fireEvent.change(contactInput, { target: { value: "1234567890" } });
  expect(buttonSignup).toBeInTheDocument();
  const textFieldByPlaceholder = screen.getByPlaceholderText(
    "Enter Your FullName"
  );

  expect(heading).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
  expect(textFieldByLabel).toBeInTheDocument();
  expect(heading).toHaveStyle({ color: "#61b846" });
  expect(heading).toHaveClass("green-text", "mt-5");
  allTextFields.forEach((textField, index) => {
    expect(textField).toBeInTheDocument();
  });
});
