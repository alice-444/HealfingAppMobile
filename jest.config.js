module.exports = {
  preset: "jest-expo",
  setupFiles: ["./jestSetupFile.js"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
