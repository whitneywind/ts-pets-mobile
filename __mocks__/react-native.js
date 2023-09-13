const ReactNative = jest.requireActual("react-native");

const mockBackHandler = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  // Mock other methods or properties used by BackHandler if needed
};

const mockProgressBarAndroid = jest.requireActual(
  "@react-native-community/progress-bar-android"
);

module.exports = {
  ...ReactNative,
  BackHandler: mockBackHandler,
  ProgressBarAndroid: mockProgressBarAndroid,
};
