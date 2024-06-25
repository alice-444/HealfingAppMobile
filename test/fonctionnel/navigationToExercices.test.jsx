import React from "react";
import Profil from "../../screens/profileScreen.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe("Profil Screen", () => {
  it("displays user stats correctly", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Profil />
      </NavigationContainer>
    );

    expect(getByText("Temps joué :")).toBeTruthy();
    expect(getByText("20 h")).toBeTruthy();
    expect(getByText("Temps sur L’application")).toBeTruthy();
    expect(getByText("25 h")).toBeTruthy();
    expect(getByText("Expérience totale Gagnée")).toBeTruthy();
    expect(getByText("50 XP")).toBeTruthy();
    expect(getByText("Exercices totaux Accomplis")).toBeTruthy();
    expect(getByText("10")).toBeTruthy();
  });

  it("navigates to Categories List Exercises screen when menu item is pressed", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Profil />
      </NavigationContainer>
    );

    const exercicesMenuItem = getByText("Exercices");
    fireEvent.press(exercicesMenuItem);

    expect(mockNavigate).toHaveBeenCalledWith("Categories List Exercises");
  });
});
