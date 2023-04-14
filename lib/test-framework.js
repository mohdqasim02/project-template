const format = require("./format.js");
const red = format.red;
const green = format.green;
const title = format.title;
const bold = format.bold;

const testCases = [];

const getTotalAssertions = function() {
  return testCases.length;
}

const getPassedAssertions = function() {
  let passedTests = 0;

  for (test of testCases) {
    if (test.result === true) {
      passedTests += 1;
    }
  }

  return passedTests;
}

const logTestCase = function(expected, actual, testName, func, result) {
  const testCase = {
    functionName: func,
    description: testName,
    actual: actual,
    expected: expected,
    result: result,
    hasPassed: result ? "✅" : "❌",
  }
  testCases.push(testCase);
}

const displaySummary = function() {
  let summary = "Summary: ";
  summary += getPassedAssertions();
  summary += " / ";
  summary += getTotalAssertions();
  summary += " assertions passed";

  console.log(bold(summary));
}

const formatExpectationMismatch = function(actual, expected) {
  let message = "\n";
  message += green("\tExpected: " + expected);
  message += "\n";
  message += red("\t  Actual: " + actual);

  return message;
}

const displayTestResult = function(result, expected, actual, testName) {
  const icon = result ? "✅" : "❌";
  const expectationMismatchMessage = formatExpectationMismatch(actual, expected)

  let message = icon + " " + testName;
  message += result ? "" : expectationMismatchMessage;

  console.log(message);
}

const assertObjectEquals = function(expected, actual, testName, func) {
  const expectedKeys = Object.keys(expected); 
  const actualKeys = Object.keys(actual); 
  let areKeysEqual = false;
  let result = false;
  let expectedValues = expectedKeys; 
  let actualValues = actualKeys; 

  if (expectedKeys.length === actualKeys.length) {
    areKeysEqual = true;
    result = true;

    for (key of expectedKeys) {
      if (expected[key] !== actual[key]) {
        result = false;
        break;
      } 
    }
  }

  logTestCase(expected, actual, testName, func, result);

  if (areKeysEqual) {
    expectedValues = Object.values(expected);
    actualValues = Object.values(actual);
  }

  displayTestResult(result, expectedValues, actualValues, testName);
}

const assertArrayEquals = function(expected, actual, testName, func) {
  const length = expected.length;
  let result = false;

  if (expected.length === actual.length) {
    result = true;

    for (let index = 0; index < length; index++) {
      if (expected[index] !== actual[index]) {
        result = false;
        break;
      } 
    }
  }

  logTestCase(expected, actual, testName, func, result);
  displayTestResult(result, expected, actual, testName);
}

const assertEquals = function(expected, actual, testName, func) {
  const result = actual === expected;

  logTestCase(expected, actual, testName, func, result);
  displayTestResult(result, expected, actual, testName);
}

exports.title = title;
exports.assertEquals = assertEquals;
exports.assertArrayEquals = assertArrayEquals;
exports.assertObjectEquals = assertObjectEquals;
exports.summary = displaySummary;
exports.testCases = testCases;
