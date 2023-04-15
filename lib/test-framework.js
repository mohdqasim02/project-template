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

const areObjectsEqual = function(set1, set2) {
  if (Object.keys(set1).length !== Object.keys(set2).length) return false;

  for (let key in set1) {
    if (set1[key] !== set2[key]) return false; 
  }
  return true;
}

const assertObjectEquals = function(expected, actual, testName, func) {
  const expectedValues = Object.values(expected);
  const actualValues = Object.values(actual); 
  const result = areObjectsEqual(expected, actual);

  logTestCase(expected, actual, testName, func, result);
  displayTestResult(result, expectedValues, actualValues, testName);
}

const areArraysEqual = function(list1, list2) {
  if (list1.length !== list2.length) return false;

  for (let index = 0; index < list1.length; index++) {
    if (list1[index] !== list2[index]) return false; 
  }
  return true;
}

const are2dArraysEqual = function(list1, list2) {
  if (list1.length !== list2.length) return false;

  for (let index in list1) {
    if (!areArraysEqual(list1[index], list2[index])) return false; 
  } 
  return true
}

const assert2dArrayEquals = function(expected, actual, testName, func) {
  const length = expected.length;
  const result = are2dArraysEqual(expected, actual);

  updateAssertions(result);
  logTestCase(expected, actual, testName, func, result);
  displayTestResult(result, expected, actual, testName);
}

const assertArrayEquals = function(expected, actual, testName, func) {
  const result = areArraysEqual(expected, actual);

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
exports.areArraysEqual = areArraysEqual;
exports.assert2dArrayEquals = assert2dArrayEquals;
exports.assertObjectEquals = assertObjectEquals;
exports.summary = displaySummary;
exports.testCases = testCases;
