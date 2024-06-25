import React from "react";
import Home from "../screens/homeScreen.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";

const mockNavigate = jest.fn();

const createTestProps = (props) => ({
  navigation: {
    navigate: mockNavigate,
    ...props,
  },
});

describe("Home Screen", () => {
  let props;

  beforeEach(() => {
    props = createTestProps({});
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Home {...props} />
      </NavigationContainer>
    );
    expect(getByText("Bienvenue Esther !")).toBeTruthy();
  });

  it("navigates to Profile screen on header press", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Home {...props} />
      </NavigationContainer>
    );
    fireEvent.press(getByText("Bienvenue Esther !"));
    expect(mockNavigate).toHaveBeenCalledWith("Profile");
  });

  it("navigates to DailyMissions screen on daily mission press", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Home {...props} />
      </NavigationContainer>
    );
    fireEvent.press(getByText("Mission du jour"));
    expect(mockNavigate).toHaveBeenCalledWith("DailyMissions");
  });

  it("navigates to Profile screen on scroll", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Home {...props} />
      </NavigationContainer>
    );
    const scrollView = getByTestId("scroll-view");
    fireEvent.scroll(scrollView, {
      nativeEvent: { contentOffset: { y: 100 } },
    });
    expect(mockNavigate).toHaveBeenCalledWith("Profile");
  });
});
