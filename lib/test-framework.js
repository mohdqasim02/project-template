const style = function(code, text) {
  return "\033[" + code + "m" + text + "\033[0m";
}

const bold = function(text) {
  return style(1, text);
}

const underline = function(text) {
  return style(4, text);
}

const yellowFg = function(text) {
  return style(33, text);
}

const redFg = function(text) {
  return style(31, text);
}

const greenFg = function(text) {
  return style(32, text);
}

const newLine = function() {
  console.log();
}

const title = function(text) {
  console.log(underline(bold("Testing " + text)));
}


let totalAssertions = 0;
let passedAssertions = 0;
const testCases = [];

const getTotalAssertions = function() {
  return totalAssertions;
}

const getPassedAssertions = function() {
  return passedAssertions;
}

const updateAssertions = function(result) {
  totalAssertions += 1;
  passedAssertions += result ? 1 : 0;
}

const logTestCase = function(expected, actual, testName, func, result) {
  const testCase = {
    functionName: func,
    description: testName,
    actual: actual,
    expected: expected,
    result: result,
    has_Passed: result ? "✅" : "❌",
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
  message += greenFg("\tExpected: " + expected);
  message += "\n";
  message += redFg("\t  Actual: " + actual);

  return message;
}

const displayTestResult = function(result, actual, expected, testName) {
  const icon = result ? "✅" : "❌";
  const expectationMismatchMessage = formatExpectationMismatch(actual, expected)

  let message = icon + " " + testName;
  message += result ? "" : expectationMismatchMessage;

  console.log(message);
}

const assertArrayEquals = function(expected, actual, testName, func) {
  const length = expected.length;
  let result = true;

  if (expected.length !== actual.length) result = false;
  for (let index = 0; index < length; index++) {
    if (expected[index] !== actual[index]) 
      result = false;
    break;
  }

  updateAssertions(result);
  logTestCase(expected, actual, testName, func, result);
  displayTestResult(result, expected, actual, testName);
}

const assertEquals = function(expected, actual, testName, func) {
  const result = (actual.toString() === expected.toString());

  updateAssertions(result);
  logTestCase(expected, actual, testName, func, result);
  displayTestResult(result, expected, actual, testName);
}

exports.title = title;
exports.assertEquals = assertEquals;
exports.assertArrayEquals = assertArrayEquals;
exports.summary = displaySummary;
exports.testCases = testCases;

