const testing = require("../lib/test-framework.js");
const number = require("../src/source.js");

const assertArrayEquals = testing.assertArrayEquals;
const assertObjectEquals = testing.assertObjectEquals;
const assertEquals = testing.assertEquals;
const summary = testing.summary;
const title = testing.title;

const it = function (testName, funcName, testData) {
  assertEquals(testData.expected, testData.actual, testName, funcName);
};

const test = function() {

  it("assertEquals should pass", "assertEquals", {
    expected: number.zero, 
    actual: number.zero 
  });

  it("assertEquals should fail", "assertEquals", {
    expected: number.zero,
    actual: number.one
  });

  summary();
}

test();
