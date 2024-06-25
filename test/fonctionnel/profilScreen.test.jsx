import React from "react";
import Profil from "../../screens/profileScreen.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";

const mockNavigation = {
  navigate: jest.fn(),
};

describe("Profil Screen", () => {
  it("renders header correctly", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <Profil navigation={mockNavigation} />
      </NavigationContainer>
    );

    expect(getByText("Nom et prénom")).toBeTruthy();

    const notificationIcon = getByTestId("notification-icon");
    expect(notificationIcon).toBeTruthy();
  });

  it("renders stats correctly", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Profil navigation={mockNavigation} />
      </NavigationContainer>
    );

    expect(getByText("Temps joué :")).toBeTruthy();
    expect(getByText("Temps sur L’application")).toBeTruthy();
    expect(getByText("Expérience totale Gagnée")).toBeTruthy();
    expect(getByText("Exercices totaux Accomplis")).toBeTruthy();

    expect(getByText("20 h")).toBeTruthy();
    expect(getByText("25 h")).toBeTruthy();
    expect(getByText("50 XP")).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
  });

  it("navigates to Menu screen on footer press", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Profil navigation={mockNavigation} />
      </NavigationContainer>
    );

    const menuFooter = getByTestId("menu-footer");
    fireEvent.press(menuFooter);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Menu");
  });
});
