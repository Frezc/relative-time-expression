
module.exports = {
  ...require('./jest.config.base'),
  coverageDirectory: "coverage",
  projects: ["packages/*/jest.config.js"],
};
