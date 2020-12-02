"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomArbitrary = randomArbitrary;
exports.randomInt = randomInt;
exports.randomPick = randomPick;

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function randomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPick(arr) {
  var id = randomInt(0, arr.length - 1);
  return arr[id];
}