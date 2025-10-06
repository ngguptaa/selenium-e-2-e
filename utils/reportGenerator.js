const ExcelJS = require('exceljs');
const fs = require('fs');

async function generateExcelReport(testData) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Test Report');

  sheet.columns = [
    { header: 'Module', key: 'module', width: 25 },
    { header: 'Test Case', key: 'testCase', width: 35 },
    { header: 'Execution Time (s)', key: 'time', width: 20 },
    { header: 'Total Clicks', key: 'clicks', width: 15 },
    { header: 'Status', key: 'status', width: 10 }
  ];

  testData.forEach(row => sheet.addRow(row));

  const reportPath = './reports/result.xlsx';
  await workbook.xlsx.writeFile(reportPath);
  console.log(`✅ Excel Report Generated: ${reportPath}`);
}

module.exports = { generateExcelReport };
