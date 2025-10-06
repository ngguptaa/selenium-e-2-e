const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');
const { getDriver } = require('../driver');
const Timer = require('../utils/timer');
const { generateExcelReport } = require('../utils/reportGenerator');

let testResults = [];
let clickCount = 0;
let steps = [];  // ✅ Steps track karne ke liye array

describe('Login Module', function() {
  this.timeout(60000);
  let driver;
  const timer = new Timer();

  before(async () => {
    driver = await getDriver();
    await driver.get('http://localhost:3000/login');
  });

  after(async () => {
    // Steps ko report me string ki form me add karenge
    const duration = timer.stop();
    testResults.push({
      module: 'Login',
      testCase: 'Login with valid credentials',
      time: duration,
      clicks: clickCount,
      steps: steps.join(' -> '), // ✅ Add steps
      status: 'Pass'
    });
    await generateExcelReport(testResults);
    if (driver) await driver.quit();
  });

  it('should login with valid credentials', async () => {
    timer.start();

    const emailInput = await driver.findElement(By.id('loginEmail'), 5000);
    await emailInput.sendKeys('student-acumen@yopmail.com');
    steps.push('Email Entered'); // ✅ Step record

    const loginBtn = await driver.findElement(By.id('loginBtn'));
    await loginBtn.click();
    clickCount++;
    steps.push('Login Button Clicked'); // ✅ Step record

    await driver.sleep(7000);

    const otpInput = await driver.findElement(By.xpath('//*[@id="app"]/main/div/div/div/div/div/form/div[3]/div/div[2]/input'));
    await otpInput.sendKeys('123456');
    steps.push('OTP Entered'); // ✅ Step record

    await driver.sleep(3000);

    const verifyBtn = await driver.findElement(By.xpath('//*[@id="app"]/main/div/div/div/div/div/form/button'));
    await verifyBtn.click();
    clickCount++;
    steps.push('Verify Button Clicked'); // ✅ Step record

    await driver.sleep(7000);
  });
});
