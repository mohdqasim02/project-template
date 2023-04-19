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

  for(const test of testCases) {
    if(test.result === true) {
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
  }
  testCases.push(testCase);
}

const display = function(text) {
  console.log(text);
};

const displaySummary = function() {
  let summary = "Summary: ";
  summary += getPassedAssertions();
  summary += " / ";
  summary += getTotalAssertions();
  summary += " assertions passed";

  display(bold(summary));
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

  display(message);
}

const areObjectsEqual = function(set1, set2) {
  if(Object.keys(set1).length !== Object.keys(set2).length) {
    return false;
  }

  for(const key in set1) {
    if(set1[key] !== set2[key]) {
      return false;
    }
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

const areListsOfObjectsEqual = function(list1, list2) {
  if(list1.length !== list2.length) {
    return false;
  }

  for(const index in list1) {
    if(!areObjectsEqual(list1[index], list2[index])) {
      return false;
    } 
  } 

  return true
}

const areValuesEqual = function(item1, item2) {
  if(!Array.isArray(item1)) {
    return item1 === item2;
  }

  return areListsEqual(item1, item2);
}

const areListsEqual = function(list1, list2) {
  if(list1.length !== list2.length) {
    return false;
  }

  for(const index in list1) {
    if(!areValuesEqual(list1[index], list2[index])) {
      return false;
    } 
  } 

  return true
}

const assertListEquals = function(expected, actual, testName, func) {
  assert(expected, actual, testName, func, areListsEqual);
}

const assertListOfObjectEquals = function(expected, actual, testName, func) {
  assert(expected, actual, testName, func, areListsOfObjectsEqual);
}

const assertEquals = function(expected, actual, testName, func) {
  assert(expected, actual, testName, func, function(a, b){return a === b;});
}

const assert = function(expected, actual, testName, func, isEqual) {
  const result = isEqual(actual, expected);

  logTestCase(expected, actual, testName, func, result);
  displayTestResult(result, expected, actual, testName);
}

exports.title = title;
exports.assertEquals = assertEquals;
exports.assertListEquals = assertListEquals;
exports.assertListOfObjectEquals = assertListOfObjectEquals;
exports.assertObjectEquals = assertObjectEquals;
exports.summary = displaySummary;
exports.testCases = testCases;
