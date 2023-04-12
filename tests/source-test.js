const testing = require('../lib/test-framework.js');
const number = require('../src/source.js');

const assertArrayEquals = testing.assertArrayEquals;
const assertEquals = testing.assertEquals;
const summary = testing.summary;
const title = testing.title;

const test = function() {
  assertEquals(number.zero, 0, "Passed Test");
  assertEquals(number.zero, number.one, "Failed Test");
  summary();
}

test();
