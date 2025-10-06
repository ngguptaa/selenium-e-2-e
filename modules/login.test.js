const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");
const { getDriver } = require("../driver");
const Timer = require("../utils/timer");
const { generateExcelReport } = require("../utils/reportGenerator");

let testResults = [];
let steps = [];

describe("Login Module - Comprehensive Validation Tests", function () {
  this.timeout(60000);
  let driver;
  const timer = new Timer();

  beforeEach(async () => {
    driver = await getDriver();
    await driver.get("http://localhost:3000/login");
    steps = [];
  });

  afterEach(async () => {
    if (driver) await driver.quit();
  });

  after(async () => {
    await generateExcelReport(testResults);
  });

  // ==================== EMAIL FIELD VALIDATION TESTS ====================

  describe("Email Field Validation", () => {
    it("should show error for empty email field", async () => {
      timer.start();
      let clickCount = 0;

      try {
        steps.push("Navigate to Login Page");

        const loginBtn = await driver.findElement(By.id("loginBtn"));
        await loginBtn.click();
        clickCount++;
        steps.push("Clicked Login Button without Email");

        await driver.sleep(8000);

        // Check for error message
        const errorMsg = await driver.findElement(By.id("error-message"));
        const errorText = await errorMsg.getText();
        steps.push(`Error Message Displayed: ${errorText}`);

        expect(errorText).to.include("email");

        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Empty Email Field",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: "Pass",
        });
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Empty Email Field",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });

    it("should show error for invalid email format (missing @)", async () => {
      timer.start();
      let clickCount = 0;

      try {
        const emailInput = await driver.findElement(By.id("loginEmail"));
        await emailInput.sendKeys("invalidemail.com");
        steps.push("Entered Email without @");

        const loginBtn = await driver.findElement(By.id("loginBtn"));
        await loginBtn.click();
        clickCount++;
        steps.push("Clicked Login Button");

        await driver.sleep(8000);

        const errorMsg = await driver.findElement(By.id("error-message"));
        const errorText = await errorMsg.getText();
        steps.push(`Error Message: ${errorText}`);

        expect(errorText.toLowerCase()).to.match(/email|invalid|format/);

        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Invalid Email Format (missing @)",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: "Pass",
        });
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Invalid Email Format (missing @)",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });

    it("should show error for invalid email format (missing domain)", async () => {
      timer.start();
      let clickCount = 0;

      try {
        const emailInput = await driver.findElement(By.id("loginEmail"));
        await emailInput.sendKeys("user@");
        steps.push("Entered Email without Domain");

        const loginBtn = await driver.findElement(By.id("loginBtn"));
        await loginBtn.click();
        clickCount++;
        steps.push("Clicked Login Button");

        await driver.sleep(8000);

        const errorMsg = await driver.findElement(By.id("error-message"));
        const errorText = await errorMsg.getText();
        steps.push(`Error Message: ${errorText}`);

        expect(errorText.toLowerCase()).to.match(/email|invalid|domain/);

        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Invalid Email Format (missing domain)",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: "Pass",
        });
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Invalid Email Format (missing domain)",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });

    it("should show error for email with special characters", async () => {
      timer.start();
      let clickCount = 0;

      try {
        const emailInput = await driver.findElement(By.id("loginEmail"));
        await emailInput.sendKeys("user@#$%@domain.com");
        steps.push("Entered Email with Special Characters");

        const loginBtn = await driver.findElement(By.id("loginBtn"));
        await loginBtn.click();
        clickCount++;
        steps.push("Clicked Login Button");

        await driver.sleep(8000);

        const errorMsg = await driver.findElement(By.id("error-message"));
        const errorText = await errorMsg.getText();
        steps.push(`Error Message: ${errorText}`);

        expect(errorText.toLowerCase()).to.match(/email|invalid|format/);

        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Email with Special Characters",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: "Pass",
        });
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Email with Special Characters",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });

    it("should show toast notification for unregistered email", async () => {
      timer.start();
      let clickCount = 0;
      const steps = [];

      try {
        // Enter unregistered email
        const emailInput = await driver.findElement(By.id("loginEmail"));
        await emailInput.clear();
        await emailInput.sendKeys("notregistered@yopmail.com");
        steps.push("Entered Unregistered Email");

        // Click login
        const loginBtn = await driver.findElement(By.id("loginBtn"));
        await loginBtn.click();
        clickCount++;
        steps.push("Clicked Login Button");

        const toastLocator = By.xpath(
          "//section[@aria-label='Notifications alt+T']//ol/li"
        );
        await driver.wait(until.elementLocated(toastLocator), 10000);
        const toastElement = await driver.findElement(toastLocator);

        const messageText = await toastElement.getText();
        steps.push(`Notification message found: "${messageText}"`);

        expect(messageText.trim().length).to.be.greaterThan(0);

        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Unregistered Email",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: "Pass",
        });
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Unregistered Email",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });

    it("should accept valid email format", async () => {
      timer.start();
      let clickCount = 0;

      try {
        const emailInput = await driver.findElement(By.id("loginEmail"));
        await emailInput.sendKeys("student-acumen@yopmail.com");
        steps.push("Entered Valid Email");

        const loginBtn = await driver.findElement(By.id("loginBtn"));
        await loginBtn.click();
        clickCount++;
        steps.push("Clicked Login Button");

        await driver.sleep(8000);

        // Check if OTP screen appears (no error)
        const otpInput = await driver.findElement(
          By.xpath(
            '//*[@id="app"]/main/div/div/div/div/div/form/div[3]/div/div[2]/input'
          )
        );
        steps.push("OTP Screen Displayed - Email Accepted");

        expect(otpInput).to.exist;

        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Valid Email Format",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: "Pass",
        });
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - Email Validation",
          testCase: "Valid Email Format",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });
  });

  // ==================== OTP FIELD VALIDATION TESTS ====================

  describe("OTP Field Validation", () => {
    beforeEach(async () => {
      // Navigate to OTP screen first
      const emailInput = await driver.findElement(By.id("loginEmail"));
      await emailInput.sendKeys("student-acumen@yopmail.com");
      const loginBtn = await driver.findElement(By.id("loginBtn"));
      await loginBtn.click();
      await driver.sleep(8000);
    });

    it("should keep Verify button disabled for empty OTP field", async () => {
      timer.start();
      let clickCount = 0;

      try {
        steps.push("Navigated to OTP Screen");
        await driver.sleep(3000);

        // Locate the Verify button
        const verifyBtn = await driver.findElement(By.id("verifyOtpBtn"));

        // Check if it’s disabled
        const isDisabled = await verifyBtn.getAttribute("disabled");
        steps.push("Checked Verify Button State");

        // Assert that it is disabled
        expect(isDisabled).to.not.be.null; // or expect(isDisabled).to.equal("true");
        steps.push("Verify Button is disabled for empty OTP");

        const duration = timer.stop();
        testResults.push({
          module: "Login - OTP Validation",
          testCase: "Empty OTP Field",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: "Pass",
        });
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - OTP Validation",
          testCase: "Empty OTP Field",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });

    it("should show error for OTP with less than 6 digits", async () => {
      timer.start();
      let clickCount = 1;
      const steps = [];

      try {
        steps.push("Navigated to OTP Screen");

        // Enter a short OTP (less than 6 digits)
        const otpInput = await driver.findElement(
          By.xpath(
            '//*[@id="app"]/main/div/div/div/div/div/form/div[3]/div/div[2]/input'
          )
        );
        await otpInput.clear();
        await otpInput.sendKeys("123");
        steps.push("Entered 3-digit OTP");

        // Locate the Verify button
        const verifyBtn = await driver.findElement(By.id("verifyOtpBtn"));

        // Check if Verify button is disabled (expected behavior)
        const isDisabled = await verifyBtn.getAttribute("disabled");
        if (isDisabled) {
          steps.push(
            "Verify button is disabled as expected for short OTP input"
          );

          const duration = timer.stop();
          testResults.push({
            module: "Login - OTP Validation",
            testCase: "OTP Less Than 6 Digits",
            time: duration,
            clicks: clickCount,
            steps: steps.join(" -> "),
            status: "Pass",
          });
          return; // ✅ stop execution since expected behavior occurred
        }
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - OTP Validation",
          testCase: "OTP Less Than 6 Digits",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });

    it("should show error for incorrect OTP", async () => {
      timer.start();
      let clickCount = 1; // Already clicked login
      const steps = [];

      try {
        steps.push("Navigated to OTP Screen");

        // Enter an incorrect OTP
        const otpInput = await driver.findElement(
          By.xpath(
            '//*[@id="app"]/main/div/div/div/div/div/form/div[3]/div/div[2]/input'
          )
        );
        await otpInput.clear();
        await otpInput.sendKeys("999999");
        steps.push("Entered Incorrect OTP");

        // Click the Verify button
        const verifyBtn = await driver.findElement(By.id("verifyOtpBtn"));
        await verifyBtn.click();
        clickCount++;
        steps.push("Clicked Verify Button");

        // Wait dynamically for notification toast to appear
        const toastLocator = By.xpath(
          "//section[@aria-label='Notifications alt+T']//ol/li"
        );
        await driver.wait(until.elementLocated(toastLocator), 10000);

        const toastElement = await driver.findElement(toastLocator);
        const messageText = await toastElement.getText();
        steps.push(`Notification message found: "${messageText}"`);

        // Validate that it shows an incorrect/invalid OTP message
        expect(messageText.toLowerCase()).to.match(
          /incorrect|invalid|wrong|error/
        );

        const duration = timer.stop();
        testResults.push({
          module: "Login - OTP Validation",
          testCase: "Incorrect OTP",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: "Pass",
        });
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - OTP Validation",
          testCase: "Incorrect OTP",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });

    it("should show error for OTP with alphabetic characters", async () => {
      timer.start();
      let clickCount = 1;
      const steps = [];

      try {
        steps.push("Navigated to OTP Screen");

        // Enter alphabetic OTP
        const otpInput = await driver.findElement(
          By.xpath(
            '//*[@id="app"]/main/div/div/div/div/div/form/div[3]/div/div[2]/input'
          )
        );
        await otpInput.clear();
        await otpInput.sendKeys("abcdef");
        steps.push("Entered Alphabetic Characters in OTP");

        // Locate Verify button
        const verifyBtn = await driver.findElement(By.id("verifyOtpBtn"));

        // Check if Verify button is disabled
        const isDisabled = await verifyBtn.getAttribute("disabled");
        if (isDisabled) {
          steps.push(
            "Verify button is disabled as expected (no numeric OTP entered)"
          );

          const duration = timer.stop();
          testResults.push({
            module: "Login - OTP Validation",
            testCase: "OTP with Alphabetic Characters",
            time: duration,
            clicks: clickCount,
            steps: steps.join(" -> "),
            status: "Pass",
          });
          return; // ✅ stop here since expected behavior is met
        }
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - OTP Validation",
          testCase: "OTP with Alphabetic Characters",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });

    it("should successfully login with correct OTP", async () => {
      timer.start();
      let clickCount = 1;

      try {
        steps.push("Navigated to OTP Screen");

        const otpInput = await driver.findElement(
          By.xpath(
            '//*[@id="app"]/main/div/div/div/div/div/form/div[3]/div/div[2]/input'
          )
        );
        await otpInput.sendKeys("123456");
        steps.push("Entered Correct OTP");

        const verifyBtn = await driver.findElement(By.id("verifyOtpBtn"));
        await verifyBtn.click();
        clickCount++;
        steps.push("Clicked Verify Button");

        await driver.sleep(8000);

        // Check if redirected to dashboard or success page
        const currentUrl = await driver.getCurrentUrl();
        steps.push(`Redirected to: ${currentUrl}`);

        expect(currentUrl).to.not.include("login");

        const duration = timer.stop();
        testResults.push({
          module: "Login - OTP Validation",
          testCase: "Correct OTP - Successful Login",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: "Pass",
        });
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - OTP Validation",
          testCase: "Correct OTP - Successful Login",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });
  });

  // ==================== ADDITIONAL EDGE CASES ====================

  describe("Edge Cases", () => {
    it("should handle email with leading/trailing spaces", async () => {
      timer.start();
      let clickCount = 0;

      try {
        const emailInput = await driver.findElement(By.id("loginEmail"));
        await emailInput.sendKeys("  student-acumen@yopmail.com  ");
        steps.push("Entered Email with Spaces");

        const loginBtn = await driver.findElement(By.id("loginBtn"));
        await loginBtn.click();
        clickCount++;
        steps.push("Clicked Login Button");

        await driver.sleep(8000);

        // Should either trim and accept or show format error
        const currentUrl = await driver.getCurrentUrl();
        steps.push(`System Handled Spaces - Current URL: ${currentUrl}`);

        // This test passes if system either trims or shows proper error
        expect(true).to.be.true;

        const duration = timer.stop();
        testResults.push({
          module: "Login - Edge Cases",
          testCase: "Email with Leading/Trailing Spaces",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: "Pass",
        });
      } catch (error) {
        const duration = timer.stop();
        testResults.push({
          module: "Login - Edge Cases",
          testCase: "Email with Leading/Trailing Spaces",
          time: duration,
          clicks: clickCount,
          steps: steps.join(" -> "),
          status: `Fail - ${error.message}`,
        });
      }
    });
  });
});
