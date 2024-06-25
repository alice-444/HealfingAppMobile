import React from "react";
import Login from "../screens/auth/loginScreen.jsx";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: "dummy-token" }),
  })
);

describe("LoginScreen", () => {
  it("should render correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <Login navigation={{ navigate: jest.fn() }} />
    );

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Mot de passe")).toBeTruthy();
    expect(getByText("Connexion")).toBeTruthy();
  });

  it("should show an error message with invalid credentials", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      })
    );

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Login navigation={{ navigate: jest.fn() }} />
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "invalid@test.com");
    fireEvent.changeText(
      getByPlaceholderText("Mot de passe"),
      "invalidpassword"
    );
    fireEvent.press(getByText("Connexion"));

    await waitFor(() => {
      expect(getByTestId("error-message")).toHaveTextContent(
        "Invalid credentials"
      );
    });
  });

  it("should navigate to home screen with valid credentials", async () => {
    const navigate = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Login navigation={{ navigate }} />
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "valid@test.com");
    fireEvent.changeText(getByPlaceholderText("Mot de passe"), "validpassword");
    fireEvent.press(getByText("Connexion"));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("Home");
    });
  });
});
