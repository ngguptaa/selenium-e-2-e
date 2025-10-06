const { By, until } = require('selenium-webdriver');
const logger = require('../../logger.js');
async function signup(driver, testUser) {
  await driver.get("http://localhost:3000/signup");

  await driver.wait(until.elementLocated(By.id("firstName")), 5000);
  await driver.wait(until.elementLocated(By.id("lastName")), 5000);
  await driver.wait(until.elementLocated(By.id("email")), 5000);
  await driver.wait(until.elementLocated(By.id("mobile")), 5000);
  
  await driver.findElement(By.id("firstName")).sendKeys(testUser.firstName);
  await driver.findElement(By.id("lastName")).sendKeys(testUser.lastName);
  await driver.findElement(By.id("email")).sendKeys(testUser.email);
  await driver.findElement(By.id("mobile")).sendKeys(testUser.phone);

  await driver.findElement(By.id("agreeToTerms")).click();
  await driver.findElement(By.id("receiveUpdates")).click();
  await driver.findElement(By.id("signupSubmit")).click();

  await driver.wait(until.urlContains("/login"), 10000);
  
  // 2. Check success message (agar app show kar raha ho)
  const successMsg = await driver.findElement(By.id("signupSuccess")).getText().catch(() => null);
  if (successMsg) {
    console.log("Signup success message:", successMsg);
  }

  // 3. Check input fields are cleared (optional)
}

module.exports = signup