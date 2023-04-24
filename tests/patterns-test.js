const testing = require("../lib/test-framework.js");
const format = require("../lib/format.js");
const patterns = require("../src/patterns.js");

const title = format.title;
const display = format.display;

const areEqual = testing.areEqual;
const assert = testing.assert;
const summary = testing.summary;

const it = function(testName, funcName, testData) {
  assert(testName, funcName, testData);
};

const testPatterns = function() {
}

const test = function() {
  display(title("Testing patterns.js"));
  testPatterns();
  summary();
}

test();
