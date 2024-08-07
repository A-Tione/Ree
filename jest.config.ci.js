const baseConfig = require('./jest.config.js');

const ciConfig = {
  ...baseConfig,
  reporters: [
    "default", 
    ["jest-junit", { "outputDirectory": "./test-results/jest", "outputName": "results.xml" }]],
}

module.exports = ciConfig