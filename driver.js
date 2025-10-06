const { Builder } = require('selenium-webdriver');

async function getDriver() {
  const driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();
  return driver;
}

module.exports = { getDriver };
