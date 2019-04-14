module.exports = {
  roots: [
      "<rootDir>/src",
      "<rootDir>/__tests__"
  ],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  collectCoverage: true,
  verbose: true
};
