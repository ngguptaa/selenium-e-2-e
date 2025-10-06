const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");
const { getDriver } = require("../driver");
const Timer = require("../utils/timer");
const { generateExcelReport } = require("../utils/reportGenerator");

describe("Signup Module - Complete Test Suite", function () {
  this.timeout(90000);
  let driver;
  const timer = new Timer();
  let testResults = [];
  let steps = [];

  beforeEach(async () => {
    driver = await getDriver();
    await driver.get("http://localhost:3000/signup");
    steps = [];
  });

  afterEach(async () => {
    if (driver) await driver.quit();
  });

  after(async () => {
    await generateExcelReport(testResults);
  });

  // ========================================
  // FIRST NAME VALIDATION TEST CASES
  // ========================================

  it("TC_FN_01: Should show error when first name is empty", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("lastName")).sendKeys("Doe");
      await driver.findElement(By.id("email")).sendKeys("test@example.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const fnameError = await driver.findElement(By.id("firstName-error"));
      const errorText = await fnameError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.include("required");
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "Empty First Name",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "Empty First Name",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_FN_02: Should show error for single character first name", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("A");
      await driver.findElement(By.id("lastName")).sendKeys("Smith");
      await driver.findElement(By.id("email")).sendKeys("a@example.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const fnameError = await driver.findElement(By.id("firstName-error"));
      const errorText = await fnameError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.include("at least 2");
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "Single Character First Name",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "Single Character First Name",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_FN_03: Should accept minimum valid first name (2 characters)", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("Jo");
      await driver.findElement(By.id("lastName")).sendKeys("Smith");
      await driver.findElement(By.id("email")).sendKeys(`test${Date.now()}@yopmail.com`);
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      const toastLocator = By.xpath("//section[@aria-label='Notifications alt+T']//ol/li");
      await driver.wait(until.elementLocated(toastLocator), 10000);
      steps.push("Success toast appeared");

      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "Minimum Length First Name",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "Minimum Length First Name",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_FN_04: Should show error for first name with numbers", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("John123");
      await driver.findElement(By.id("lastName")).sendKeys("Doe");
      await driver.findElement(By.id("email")).sendKeys("test@example.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const fnameError = await driver.findElement(By.id("firstName-error"));
      const errorText = await fnameError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.match(/letters|alphabetic|invalid/);
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "First Name with Numbers",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "First Name with Numbers",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_FN_05: Should show error for first name with special characters", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("John@#$");
      await driver.findElement(By.id("lastName")).sendKeys("Doe");
      await driver.findElement(By.id("email")).sendKeys("test@example.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const fnameError = await driver.findElement(By.id("firstName-error"));
      const errorText = await fnameError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.match(/special characters|invalid|letters/);
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "First Name with Special Characters",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "First Name with Special Characters",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_FN_06: Should show error for first name exceeding maximum length", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      const longName = "A".repeat(51); // Assuming max is 50
      await driver.findElement(By.id("firstName")).sendKeys(longName);
      await driver.findElement(By.id("lastName")).sendKeys("Doe");
      await driver.findElement(By.id("email")).sendKeys("test@example.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const fnameError = await driver.findElement(By.id("firstName-error"));
      const errorText = await fnameError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.match(/maximum|too long|exceed/);
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "Maximum Length First Name",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "Maximum Length First Name",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_FN_07: Should show error for first name with only spaces", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("   ");
      await driver.findElement(By.id("lastName")).sendKeys("Doe");
      await driver.findElement(By.id("email")).sendKeys("test@example.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const fnameError = await driver.findElement(By.id("firstName-error"));
      const errorText = await fnameError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.match(/required|invalid|cannot be empty/);
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "First Name with Only Spaces",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - First Name",
        testCase: "First Name with Only Spaces",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  // ========================================
  // LAST NAME VALIDATION TEST CASES
  // ========================================

  it("TC_LN_01: Should show error when last name is empty", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("John");
      await driver.findElement(By.id("email")).sendKeys("test@example.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const lnameError = await driver.findElement(By.id("lastName-error"));
      const errorText = await lnameError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.include("required");
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Last Name",
        testCase: "Empty Last Name",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Last Name",
        testCase: "Empty Last Name",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_LN_02: Should show error for single character last name", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("John");
      await driver.findElement(By.id("lastName")).sendKeys("D");
      await driver.findElement(By.id("email")).sendKeys("test@example.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const lnameError = await driver.findElement(By.id("lastName-error"));
      const errorText = await lnameError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.include("at least 2");
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Last Name",
        testCase: "Single Character Last Name",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Last Name",
        testCase: "Single Character Last Name",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_LN_03: Should show error for last name with numbers", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("John");
      await driver.findElement(By.id("lastName")).sendKeys("Doe123");
      await driver.findElement(By.id("email")).sendKeys("test@example.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const lnameError = await driver.findElement(By.id("lastName-error"));
      const errorText = await lnameError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.match(/letters|alphabetic|invalid/);
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Last Name",
        testCase: "Last Name with Numbers",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Last Name",
        testCase: "Last Name with Numbers",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  // ========================================
  // EMAIL VALIDATION TEST CASES
  // ========================================

  it("TC_EM_01: Should show error when email is empty", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("John");
      await driver.findElement(By.id("lastName")).sendKeys("Doe");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const emailError = await driver.findElement(By.id("email-error"));
      const errorText = await emailError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.include("required");
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Empty Email",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Empty Email",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_EM_02: Should show error for email without @ symbol", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("John");
      await driver.findElement(By.id("lastName")).sendKeys("Doe");
      await driver.findElement(By.id("email")).sendKeys("invalidemail.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const emailError = await driver.findElement(By.id("email-error"));
      const errorText = await emailError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.include("valid email");
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Email without @ symbol",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Email without @ symbol",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_EM_03: Should show error for email without domain", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("John");
      await driver.findElement(By.id("lastName")).sendKeys("Doe");
      await driver.findElement(By.id("email")).sendKeys("test@");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const emailError = await driver.findElement(By.id("email-error"));
      const errorText = await emailError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.include("valid email");
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Email without Domain",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Email without Domain",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_EM_04: Should show error for email without username", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("John");
      await driver.findElement(By.id("lastName")).sendKeys("Doe");
      await driver.findElement(By.id("email")).sendKeys("@example.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const emailError = await driver.findElement(By.id("email-error"));
      const errorText = await emailError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.include("valid email");
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Email without Username",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Email without Username",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_EM_05: Should show error for email without extension", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("John");
      await driver.findElement(By.id("lastName")).sendKeys("Doe");
      await driver.findElement(By.id("email")).sendKeys("test@example");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const emailError = await driver.findElement(By.id("email-error"));
      const errorText = await emailError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.include("valid email");
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Email without Extension",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Email without Extension",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });

  it("TC_EM_06: Should show error for email with multiple @ symbols", async () => {
    timer.start();
    let clickCount = 0;

    try {
      steps.push("Navigated to Signup Page");

      await driver.findElement(By.id("firstName")).sendKeys("John");
      await driver.findElement(By.id("lastName")).sendKeys("Doe");
      await driver.findElement(By.id("email")).sendKeys("test@@example.com");
      await driver.findElement(By.id("mobile")).sendKeys("9876543210");

      const termsCheckbox = await driver.findElement(By.id("agreeToTerms"));
      await termsCheckbox.click();

      const signupBtn = await driver.findElement(By.id("signupBtn"));
      await signupBtn.click();
      clickCount++;
      steps.push("Clicked Signup Button");

      await driver.sleep(2000);

      const emailError = await driver.findElement(By.id("email-error"));
      const errorText = await emailError.getText();
      steps.push(`Error: "${errorText}"`);

      expect(errorText.toLowerCase()).to.include("valid email");
      
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Email with Multiple @ Symbols",
        time: duration,
        clicks: clickCount,
        steps: steps.join(" -> "),
        status: "Pass",
      });
    } catch (error) {
      const duration = timer.stop();
      testResults.push({
        module: "Signup - Email",
        testCase: "Email with Multiple @ Symbols",
        time: duration,
        clicks: 0,
        steps: steps.join(" -> "),
        status: `Fail - ${error.message}`,
      });
    }
  });
});