import React from "react";
import { render, renderHook, screen, fireEvent } from "@testing-library/react";
import Signin from "./../Signin/Signin";

import "@testing-library/jest-dom/extend-expect";

test("renders SAYLANI WELFARE with the correct styles", () => {
  // Render your component
  render(<Signin />);

  // Get the h1 element by its text content and class name
  const h1Element = screen.getByText("SAYLANI WELFARE");
  const paragraph = screen.getByText("ONLINE DISCOUNT STORE");
  const EmailInput = screen.getByLabelText("Email");
  const PasswordInput = screen.getByLabelText("Password");
  const buttonSignin = screen.getByRole("button");
  expect(h1Element).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
  expect(h1Element).toHaveClass("green-text");
  expect(h1Element).toHaveStyle({ color: "#61b846" });
  expect(PasswordInput).toBeInTheDocument();
  expect(buttonSignin).toBeInTheDocument()
  expect(EmailInput).toBeInTheDocument();
  // fireEvent.change(EmailInput, { target: { value: "test@example.com" } });
  // fireEvent.change(PasswordInput, { target: { value: "testpassword" } });
});
