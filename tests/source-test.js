const testing = require("../lib/test-framework.js");
const format = require("../lib/format.js");
const number = require("../src/source.js");

const title = format.title;
const display = format.display;

const areEqual = testing.areEqual;
const assert = testing.assert;
const summary = testing.summary;

const it = function(testName, funcName, testData) {
  assert(testName, funcName, testData);
};

const testAssert = function() {
  it("should pass if elements are equal", "areEqual", {
    expected: number.zero, 
    actual: number.zero 
  });

  it("should fail if elements are not equal", "areEqual", {
    expected: false,
    actual: number.one === number.zero,
  });

  it("should pass when two list are equal", "areEqual", {
    expected: true, 
    actual: areEqual([1, 2, 3], [1, 2, 3])
  });

  it("should fail when two list are not equal", "areEqual", {
    expected: false, 
    actual: areEqual([1, 2, 4], [1, 2, 3])
  });

  it("should fail when size two list are not equal", "areEqual", {
    expected: false, 
    actual: areEqual([1, 2], [1, 2, 3])
  });

  it("should pass when two list are equal", "areEqual", {
    expected: true, 
    actual: areEqual([1, [2], '3', {a:2}], [1, [2], '3', {a:2}])
  });

  it("should fail when two list are not equal", "areEqual", {
    expected: false, 
    actual: areEqual([1, [2, 4]], [1, [2, 3]])
  });

  it("should fail when size two list are not equal", "areEqual", {
    expected: false, 
    actual: areEqual([1, 2], [1, 2, 3])
  });

  it("should pass when two sets are equal", "areEqual", {
    expected: true, 
    actual: areEqual({1:1, 2:2, 3:3}, {1:1, 2:2, 3:3})
  });

  it("should fail when two sets are not equal", "areEqual", {
    expected: false, 
    actual: areEqual({1:'1', 2:2}, {1:'one', 2:'two'})
  });

  it("should pass with different data types and nesting", "areEqual", {
    expected: true, 
    actual: areEqual({1:1, 2:[1, 2, 3], 3:{a:1, b:2, c:[4, 5]}}, {1:1, 2:[1, 2, 3], 3:{a:1, b:2, c:[4, 5]}})
  });
}

const test = function() {
  display(title("Testing test-framework.js"));
  testAssert();
  summary();
}

test();
