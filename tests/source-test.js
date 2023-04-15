const testing = require("../lib/test-framework.js");
const number = require("../src/source.js");

const areArraysEqual = testing.areArraysEqual;
const are2dArrayEquals = testing.are2dArrayEquals;
const assertEquals = testing.assertEquals;
const summary = testing.summary;
const title = testing.title;

let it = function (testName, funcName, testData) {
  assertEquals(testData.expected, testData.actual, testName, funcName);
};

const testAssertEquals = function() {

  it("should pass if elements are equal", "assertEquals", {
    expected: number.zero, 
    actual: number.zero 
  });

  it("should fail if elements are not equal", "assertEquals", {
    expected: false,
    actual: number.one === number.zero,
  });
}

const testAssertArrayEquals = function() {

  it("should pass when two list are equal", "assertEquals", {
    expected: true, 
    actual: areArraysEqual([1, 2, 3], [1, 2, 3])
  });

  it("should fail when two list are not equal", "assertEquals", {
    expected: false, 
    actual: areArraysEqual([1, 2, 4], [1, 2, 3])
  });

  it("should fail when size two list are not equal", "assertEquals", {
    expected: false, 
    actual: areArraysEqual([1, 2], [1, 2, 3])
  });
}

const test = function() {
  title("Testing test-framework.js");
  testAssertEquals();
  testAssertArrayEquals();
  summary();
}

test();
