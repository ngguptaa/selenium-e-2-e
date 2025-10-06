const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");
const { getDriver } = require("../driver");
const Timer = require("../utils/timer");
const { generateExcelReport } = require("../utils/reportGenerator");
const { login } = require("./loginHelper"); // ✅ Import login helper

let testResults = [];

describe("Dashboard Module", function () {
  this.timeout(180000);
  let driver;

  before(async () => {
    driver = await getDriver();
    await driver.get("http://localhost:3000/login");
  });

  after(async () => {
    await generateExcelReport(testResults);
    if (driver) await driver.quit();
  });

  it("should login and verify dashboard", async () => {
    let clickCountObj = { count: 0 };
    let steps = [];
    const timer = new Timer();

    timer.start();

    // ===== OPTIONAL LOGIN =====
    // Jab chaaho login run karna hai, tab uncomment karo
    await login(driver, "student-acumen@yopmail.com", "123456", clickCountObj, steps);

    // ===== DASHBOARD =====
      await driver.sleep(3000);
    async function performStep(stepName, action) {
      const stepTimer = new Timer();
      stepTimer.start();
      try {
        await action();
        const duration = stepTimer.stop();
        testResults.push({
          module: "Dashboard",
          testCase: stepName,
          time: duration,
          clicks: clickCountObj.count,
          steps: stepName,
          status: "Pass",
        });
      } catch (err) {
        const duration = stepTimer.stop();
        testResults.push({
          module: "Dashboard",
          testCase: stepName,
          time: duration,
          clicks: clickCountObj.count,
          steps: stepName + " | Error: " + err.message,
          status: "Fail",
        });
        throw err;
      }
    }

    // ===== Dashboard verification =====
    await driver.sleep(3000);
    await performStep("Dashboard Verified", async () => {
      const dashboardHeader = await driver.wait(
        until.elementLocated(
          By.xpath('//*[@id="app"]/main/div/div/div[1]/div[2]/div/div[2]/div/ul/li[1]/a/button')
        ),
        50000
      );
      const visible = await dashboardHeader.isDisplayed();
      expect(visible).to.be.true;
    });
    await driver.sleep(3000);

    // ===== Profile icon click =====

    await performStep("Profile Icon Clicked", async () => {
      const profileIcon = await driver.findElement(
        By.xpath('//*[@id="app"]/main/div/div/div[2]/main/div[1]/div[1]/div/div[2]/a[1]/img')
      );
      await profileIcon.click();
      clickCountObj.count++;
    });

    await driver.sleep(3000);
    await performStep("Navigated back to previous page", async () => {
      await driver.navigate().back();
    });
await driver.sleep(3000);
    // ===== Notification icon click =====
    await performStep("Notification Icon Clicked", async () => {
      const notificationIcon = await driver.findElement(
        By.xpath('//*[@id="app"]/main/div/div/div[2]/main/div[1]/div[1]/div/div[2]/a[2]')
      );
      await notificationIcon.click();
      clickCountObj.count++;
    });
    await driver.sleep(3000);

    await performStep("Navigated back to previous page", async () => {
      await driver.navigate().back();
    });
    await driver.sleep(3000);

    timer.stop();
  });
});
