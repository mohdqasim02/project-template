const testing = require('../lib/test-framework.js');
const number = require('../src/source.js');

const assertArrayEquals = testing.assertArrayEquals;
const assertObjectEquals = testing.assertObjectEquals;
const assertEquals = testing.assertEquals;
const summary = testing.summary;
const title = testing.title;

const test = function() {
  assertEquals(number.zero, 0, "assertEquals should pass", "assertEquals");
  assertEquals(number.zero, number.one, "assertEquals should fail", "assertEquals");
  assertArrayEquals([1, 2, 3], [1, 2, 3], "assertArrayEquals should pass", "assertArrayEquals");
  assertArrayEquals([1, 2, 3], [1, 3, 2], "assertArrayEquals should fail", "assertArrayEquals");
  assertObjectEquals({one:1, two:2}, {one:1, two:2}, "Equal objects should pass", "assertObjectEquals");
  assertObjectEquals({one:1, two:2}, {1:1, 2:2}, "object with different keys should fail", "assertObjectEquals");
  assertObjectEquals({one:1, two:'two'}, {one:'one', two:2}, "Object with different values should fail", "assertObjectEquals");
  assertObjectEquals({one:1, two:2}, {one:1, two:2, three:3}, "Object with extra keys should fail", "assertObjectEquals");
  summary();
}

test();
