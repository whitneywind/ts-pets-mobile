import * as ReactNavigation from "@react-navigation/native";

// Mock any specific dependencies you are using from React Navigation
jest.mock("@react-navigation/native", () => {
  return {
    ...ReactNavigation,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    // Add more mocks for any other React Navigation dependencies you use
  };
});
