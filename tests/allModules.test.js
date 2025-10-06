const { generateExcelReport } = require('../utils/reportGenerator');
const { getTestResults, resetTestResults } = require('../utils/globalTestResults');
const { getDriver } = require('../driver');
const Timer = require('../utils/timer');

// ==== Import all modules ====
require('../modules/login.test');
require('../modules/dashboard.test');

// ==== After all tests ====
after(async () => {
  const allResults = getTestResults();

  if (allResults.length > 0) {
    await generateExcelReport(allResults); // ✅ Combined Excel report
    console.log('✅ All modules report generated in one Excel file');
  } else {
    console.log('⚠️ No test results found. Please ensure each test adds results using addTestResult().');
  }

  resetTestResults();
});
