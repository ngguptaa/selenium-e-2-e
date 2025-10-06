const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');
const { getDriver } = require('../driver');
const Timer = require('../utils/timer');
const { generateExcelReport } = require('../utils/reportGenerator');

let testResults = [];
let clickCount = 0;

describe('Dashboard Module', function() {
  this.timeout(60000);
  let driver;
  const timer = new Timer();

  before(async () => {
    driver = await getDriver();
    await driver.get('http://localhost:3000/');
  });

  after(async () => {
    await generateExcelReport(testResults);
    if (driver) await driver.quit();
  });

  it('should verify dashboard elements', async () => {
    timer.start();

    const element = await driver.wait(until.elementLocated(By.xpath('//h1[contains(text(),"Dashboard")]')), 5000);
    const visible = await element.isDisplayed();

    const duration = timer.stop();
    testResults.push({
      module: 'Dashboard',
      testCase: 'Dashboard visibility',
      time: duration,
      clicks: clickCount,
      status: visible ? 'Pass' : 'Fail'
    });

    expect(visible).to.be.true;
  });
});
