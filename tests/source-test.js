const testing = require("../lib/test-framework.js");
const number = require("../src/source.js");

const areArraysEqual = testing.areArraysEqual;
const are2dArraysEqual = testing.are2dArraysEqual;
const areObjectsEqual = testing.areObjectsEqual;
const assertEquals = testing.assertEquals;
const summary = testing.summary;
const title = testing.title;

let it = function (testName, funcName, testData) {
  assertEquals(testData.expected, testData.actual, testName, funcName);
};

const testAssertEquals = function() {
  title("assertEquals()");

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
  title("areArraysEqual()");

  it("should pass when two list are equal", "areArraysEqual", {
    expected: true, 
    actual: areArraysEqual([1, 2, 3], [1, 2, 3])
  });

  it("should fail when two list are not equal", "areArraysEqual", {
    expected: false, 
    actual: areArraysEqual([1, 2, 4], [1, 2, 3])
  });

  it("should fail when size two list are not equal", "areArraysEqual", {
    expected: false, 
    actual: areArraysEqual([1, 2], [1, 2, 3])
  });
}

const testAre2dArraysEqual = function() {
  title("are2dArraysEqual()");

  it("should pass when two list are equal", "are2dArraysEqual", {
    expected: true, 
    actual: are2dArraysEqual([1, 2, 3], [1, 2, 3])
  });

  it("should fail when two list are not equal", "are2dArraysEqual", {
    expected: false, 
    actual: are2dArraysEqual([1, [2, 4]], [1, [2, 3]])
  });

  it("should fail when size two list are not equal", "are2dArraysEqual", {
    expected: false, 
    actual: are2dArraysEqual([1, 2], [1, 2, 3])
  });
}

const testAreObjectsEqual = function() {
  title("areObjectsEqual()");

  it("should pass when two sets are equal", "areObjectsEqual", {
    expected: true, 
    actual: areObjectsEqual({1:1, 2:2, 3:3}, {1:1, 2:2, 3:3})
  });

  it("should fail when two sets are not equal", "areObjectsEqual", {
    expected: false, 
    actual: areObjectsEqual({1:'1', 2:2}, {1:'one', 2:'two'})
  });

  it("should fail when size two sets are not equal", "areObjectsEqual", {
    expected: false, 
    actual: areObjectsEqual({1:1}, {1:1, 2:2})
  });
}

const test = function() {
  title("Testing test-framework.js");
  testAssertEquals();
  testAssertArrayEquals();
  testAre2dArraysEqual();
  testAreObjectsEqual();
  summary();
}

test();
