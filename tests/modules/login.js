// login-otp.js
const { By, until, Key } = require("selenium-webdriver");
const logger = require("../../logger.js");

async function loginAndOtp(driver, otp = "123456") {
  try {
    // ---------- LOGIN ----------
    await driver.get("http://localhost:3000/login");
    await driver.wait(until.elementLocated(By.id("loginEmail")), 5000);
    await driver
      .findElement(By.id("loginEmail"))
      .sendKeys("student-acumen@yopmail.com");
    await driver.findElement(By.id("loginSubmit")).click();

    await driver.wait(until.urlContains("/otp"), 10000);
    logger.info("Login successful, OTP page reached");

    //--------------------------OTP------------------------------

    // Wait for OTP input to be ready
    await driver.wait(
      until.elementLocated(By.css('input[data-input-otp]')),
      5000
    );
    
    await driver.sleep(500); // Let component fully initialize

    // Method 1: Direct hidden input manipulation (Most reliable)
    const otpFilled = await driver.executeScript(`
      // Find the hidden input field
      const hiddenInput = document.querySelector('input[data-input-otp]');
      if (!hiddenInput) {
        throw new Error('Hidden OTP input not found');
      }

      // Set the value
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      ).set;
      nativeInputValueSetter.call(hiddenInput, '${otp}');

      // Trigger React events
      const inputEvent = new Event('input', { bubbles: true });
      const changeEvent = new Event('change', { bubbles: true });
      
      hiddenInput.dispatchEvent(inputEvent);
      hiddenInput.dispatchEvent(changeEvent);

      // Also update the slots for visual feedback
      const slots = document.querySelectorAll('div[data-slot="input-otp-slot"]');
      '${otp}'.split('').forEach((digit, i) => {
        if (slots[i]) {
          slots[i].textContent = digit;
          slots[i].setAttribute('data-active', 'true');
        }
      });

      return hiddenInput.value === '${otp}';
    `);

    if (!otpFilled) {
      throw new Error('Failed to fill OTP');
    }

    logger.info("OTP filled successfully");
    await driver.sleep(500); // Let React state update

    // Wait for button to be enabled
    await driver.wait(async () => {
      const button = await driver.findElement(By.id("verifyOtpBtn"));
      const isDisabled = await button.getAttribute("disabled");
      return isDisabled === null;
    }, 5000, "Verify button did not enable");

    logger.info("Verify button enabled, clicking now");

    // Click the verify button
    const verifyBtn = await driver.findElement(By.id("verifyOtpBtn"));
    await verifyBtn.click();

    // Wait for dashboard
    await driver.wait(until.urlIs("http://localhost:3000/"), 15000);
    
    const dashboardVisible = await driver
      .findElement(By.id("dashboard"))
      .isDisplayed()
      .catch(() => false);
      
    if (!dashboardVisible) {
      throw new Error("Dashboard not visible after OTP verification!");
    }

    logger.info("OTP verified, login successful Dashboard reached");
  } catch (err) {
    logger.error("Login/OTP failed: " + err);
    
    // Debug info
    try {
      const buttonState = await driver.executeScript(`
        const btn = document.getElementById('verifyOtpBtn');
        const input = document.querySelector('input[data-input-otp]');
        return {
          buttonDisabled: btn ? btn.disabled : 'not found',
          inputValue: input ? input.value : 'not found',
          inputLength: input ? input.value.length : 0
        };
      `);
      logger.error("Debug info:", JSON.stringify(buttonState));
    } catch (debugErr) {
      // Ignore debug errors
    }
    
    throw err;
  }
}

module.exports = loginAndOtp;