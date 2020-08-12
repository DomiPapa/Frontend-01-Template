// import {add} from '../src/add.js'
// import assert from 'assert';
// let assert = require('assert');
let mod = require('../dist/add.js')
const test = require('ava');

/*
describe('add', function () {
  describe('#indexOf()', function () {
    it('add(3,7) should be 7', function () {
      // assert.equal(add.add(3,4),7);
      assert.equal(mod.add(3,4),7);
    });
  });
});
*/


test('foo', t => {
  if(mod.add(3,4)===7)
    t.pass();
});