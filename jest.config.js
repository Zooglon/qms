module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  moduleNameMapper: {
    "^wix-data$": "<rootDir>/tests/mocks/wixDataMock.js",
  },
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
