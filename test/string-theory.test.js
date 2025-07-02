const assert = require('node:assert');
const { test } = require('node:test');
const StringTheory = require('../packages/string-theory/dist/index.js').default;

test('add and render basic', () => {
  const st = new StringTheory();
  st.add('hello').add('world');
  assert.strictEqual(st.render(), 'hello\nworld');
});

test('add with function and json', () => {
  const st = new StringTheory();
  st.add(() => 'dynamic');
  st.json({ a: 1 }, 0);
  assert.strictEqual(st.render(), 'dynamic\n{"a":1}');
});

test('n inserts new lines', () => {
  const st = new StringTheory();
  st.add('a').n(2).add('b');
  assert.strictEqual(st.render(), 'a\n\n\nb');
});

test('if(false) ignores additions', () => {
  const st = new StringTheory();
  st.add('a');
  st.if(false).add('ignored');
  st.add('b');
  assert.strictEqual(st.render(), 'a\nb');
});

test('each works with prefix/suffix', () => {
  const st = new StringTheory();
  st.each('- ', ['a','b'], ',', ' ');
  assert.strictEqual(st.render(), '- a, - b,');
});
