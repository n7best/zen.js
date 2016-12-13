'use strict';

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// base/one dimension
var value = (0, _lib2.default)('value', 0);

console.log('1-suppose be value', value);

// base/one dimension object
var counter = (0, _lib2.default)('counter', { value: 'value' });

console.log('2-supposer be counter', counter);

counter.resonant(function () {
    console.log('5-should yield 1: ', counter.value);
});

console.log('3-suppoert to be counter with resonants', counter);
console.log('3.2-suppoert to be counter god', counter.__god());
console.log('4-suppose to have value', counter.value);

counter.value = counter.value + 1;

setInterval(function () {
    counter.value = counter.value + 1;
}, 1000);