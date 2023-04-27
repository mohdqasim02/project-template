const number = require("../src/source.js");
const {title, display} = require("../lib/format.js");
const {assert, summary} = require("../lib/test-framework.js");

const it = function(testName, funcName, testData) {
  assert(testName, funcName, testData);
};

const testAssert = function() {
  it("should pass if elements are equal", "areEqual", {
    expected: 1, 
    actual: 1 
  });

  it("should pass when two list are equal", "areEqual", {
    expected: [1, [2], '3', {a:2}], 
    actual: [1, [2], '3', {a:2}]
  });

  it("should pass when two sets are equal", "areEqual", {
    expected: {1:1, 2:2, 3:3}, 
    actual: {1:1, 2:2, 3:3}
  });

  it("should pass with different data types and nesting", "areEqual", {
    expected: {1:1, 2:[1, 2, 3], 3:{a:1, b:2, c:[4, 5]}}, 
    actual: {1:1, 2:[1, 2, 3], 3:{a:1, b:2, c:[4, 5]}}
  });
}

const test = function() {
  display(title("Testing test-framework.js"));
  testAssert();
  summary();
}

test();
