// tests/main-test.js
const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const logger = require('./logger');
const loginAndOtp = require('./tests/modules/login');

(async function runTests() {
  let options = new firefox.Options();
  // options.headless(); // uncomment for CI
  let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();

  // const testUser = generateTestUser();

  try {
    logger.info("Test Suite Started");

    // await signup(driver, testUser);
    await loginAndOtp(driver, "123456");

    logger.info("All tests completed successfully!");
  } catch (err) {
    logger.error("Test Suite Failed" + err);
  } finally {
    await driver.quit();
    logger.info("Driver closed.");
  }
})();
