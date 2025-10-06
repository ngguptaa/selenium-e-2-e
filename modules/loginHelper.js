const { By, until } = require("selenium-webdriver");

async function login(driver, email, otp, clickCountObj, steps) {
  // ===== Email =====
  const emailInput = await driver.wait(until.elementLocated(By.id("loginEmail")), 10000);
  await emailInput.sendKeys(email);
  steps.push("Email Entered");

  // ===== Login Button =====
  const loginBtn = await driver.findElement(By.id("loginBtn"));
  await loginBtn.click();
  clickCountObj.count++;
  steps.push("Login Button Clicked");

  // ===== OTP =====
  const otpInput = await driver.wait(
    until.elementLocated(
      By.xpath('//*[@id="app"]/main/div/div/div/div/div/form/div[3]/div/div[2]/input')
    ),
    10000
  );
  await otpInput.sendKeys(otp);
  steps.push("OTP Entered");

  // ===== Verify Button =====
  const verifyBtn = await driver.findElement(
    By.xpath('//*[@id="app"]/main/div/div/div/div/div/form/button')
  );
  await verifyBtn.click();
  clickCountObj.count++;
  steps.push("Verify Button Clicked");

  await driver.sleep(5000); // dashboard load wait
}

module.exports = { login };

