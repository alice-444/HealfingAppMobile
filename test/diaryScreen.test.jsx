import React from "react";
import Diary from "./../screens/diary/diaryScreen.jsx";
import { render, fireEvent } from "@testing-library/react-native";

jest.mock("./../components/Menu.jsx", () => () => <></>);

describe("Diary Screen", () => {
  it("navigates back when back button is pressed", () => {
    const navigation = {
      goBack: jest.fn(),
    };

    const { getByTestId } = render(<Diary navigation={navigation} />);

    fireEvent.press(getByTestId("back-button"));

    expect(navigation.goBack).toHaveBeenCalledWith("Diary");
  });

  it("navigates to AddDataDiary when FAB is pressed", () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByTestId } = render(<Diary navigation={navigation} />);

    fireEvent.press(getByTestId("fab-button"));

    expect(navigation.navigate).toHaveBeenCalledWith("AddDataDiary");
  });
});
