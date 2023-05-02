const assert = require('assert');
const format = require("./format.js");
const red = format.red;
const yellow = format.yellow;
const green = format.green;
const title = format.title;
const bold = format.bold;
const display = format.display;

const generateLog = function() {
  const log = [];

  const getTotalAssertions = function() {
    return log.length;
  };

  const getPassedAssertions = function() {
    return log.filter(function(test) {
      return test.hasPassed;
    }).length;
  };

  const append = function(test) {
    log.push(test);
  };

  return {getTotalAssertions, getPassedAssertions, append, log};
};

const testCases = generateLog();

const hasTestPassed = function(testCase) {
  return testCase.hasPassed;
}

const getOrDefault = function(collection, item, defaultValue) {
  if(item in collection) {
    return collection[item];
  }

  return defaultValue;
}

const groupByKey = function(collection, key) {
  return collection.reduce(function(group, item) {
    const groupKey = item[key];
    group[groupKey] = getOrDefault(group, groupKey, []); 
    group[groupKey].push(item);
    return group;
  }, {});
}

const logTestCase = function(funcName, testName, testData, hasPassed) {
  const testCase = {
    funcName: funcName,
    testName: testName,
    actual: testData.actual,
    expected: testData.expected,
    hasPassed: hasPassed,
    icon: hasPassed ? "✅" : "❌",
  }
  testCases.append(testCase);
}

const summarizeAll = function() {
  let summary = "Summary: ";
  summary += testCases.getPassedAssertions();
  summary += " / ";
  summary += testCases.getTotalAssertions();
  summary += " assertions passed";

  display(bold(summary));
}

const headline = function(tests, funcName) {
  let headline = funcName + " ";
  headline += "(" + testCases.getPassedAssertions();
  headline += "/" + testCases.getTotalAssertions();
  headline += " passed)";

  display(title(headline));
}

const formatExpectationMismatch = function(actual, expected) {
  let message = "\n";
  message += green("\tExpected: " + expected);
  message += "\n";
  message += red("\t  Actual: " + actual);

  return message;
}

const displaySummary = function() {
  const groupedTests = groupByKey(testCases.log, 'funcName');

  for(const key in groupedTests){
    displayTestResult(groupedTests[key], key);
  }
  summarizeAll();
}

const displayTestResult = function(tests, funcName) {
  headline(tests, funcName);

  for(const test of tests){
    const expectationMismatchMessage = formatExpectationMismatch(test.actual, test.expected)
    let message = test.icon; 

    message += " " + test.testName;
    message += test.hasPassed ? "" : expectationMismatchMessage;
    display(message);
  }
}

const myAssert = function(testName, funcName, testData) {
  logTestCase(funcName, testName, testData, true);
  assert.deepStrictEqual(testData.expected, testData.actual);
}

exports.assert = myAssert;
exports.summary = displaySummary;
