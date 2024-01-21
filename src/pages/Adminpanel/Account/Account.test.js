import { render, screen,fireEvent } from "@testing-library/react";
import Account from "./../Account/Account";

test("testing the AccountFile", () => {
  render(<Account />);
  const settingsParagraph = screen.getByText("Settings");
  expect(settingsParagraph).toBeInTheDocument();
  const fullNameInput = screen.getByPlaceholderText("Update Fullname");
  const categaryName = screen.getByPlaceholderText("Category Name");
  const addButton = screen.getByText("Add");
  expect(addButton).toBeInTheDocument();
  fireEvent.click(addButton);
  expect(fullNameInput).toBeInTheDocument();
  expect(categaryName).toBeInTheDocument();
});
