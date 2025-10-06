
// utils/globalTestResults.js
let globalResults = [];

function addTestResult(result) {
  globalResults.push(result);
}

function getTestResults() {
  return globalResults;
}

function resetTestResults() {
  globalResults = [];
}

module.exports = { addTestResult, getTestResults, resetTestResults };

