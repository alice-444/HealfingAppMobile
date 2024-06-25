import React from "react";
import Contact from "../screens/contactScreen.jsx";
import { render, fireEvent } from "@testing-library/react-native";

jest.mock("./../components/Menu.jsx", () => () => <></>);

describe("Contact Screen", () => {
  it("navigates back when back button is pressed", () => {
    const navigation = {
      goBack: jest.fn(),
    };

    const { getByTestId } = render(<Contact navigation={navigation} />);

    fireEvent.press(getByTestId("back-button"));

    expect(navigation.goBack).toHaveBeenCalledWith("homeScreen");
  });

  it('updates active section to "contactPro" when Contact Pro icon is pressed', () => {
    const navigation = {
      goBack: jest.fn(),
    };

    const { getByText } = render(<Contact navigation={navigation} />);

    fireEvent.press(getByText("Contact Pro"));

    expect(getByText("Doctolib")).toBeTruthy();
    expect(getByText("Mondocteur")).toBeTruthy();
    expect(getByText("Therapeute.com")).toBeTruthy();
    expect(getByText("Resalib")).toBeTruthy();
  });

  it('updates active section to "emergencyNumbers" when Emergency Numbers icon is pressed', () => {
    const navigation = {
      goBack: jest.fn(),
    };

    const { getByText } = render(<Contact navigation={navigation} />);

    fireEvent.press(getByText("Numéros D'urgence"));

    expect(getByText("SOS Suicide Phénix")).toBeTruthy();
    expect(getByText("SOS Amitié")).toBeTruthy();
    expect(getByText("Fil Santé Jeunes")).toBeTruthy();
    expect(getByText("SAMU")).toBeTruthy();
    expect(getByText("Numéro européen d'urgence")).toBeTruthy();
  });
});
