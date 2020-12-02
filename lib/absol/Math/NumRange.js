"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * 
 * @param {Number} start 
 */
function NumRange(start, length) {
  if (arguments.length == 1) length = 0;else if (arguments.length == 0) {
    length = 0;
    start = 0;
  }
  this.start = start;
  this.length = length;
}
/**
 * @param {Number} num 
 */


NumRange.prototype.contains = function (num) {
  return num >= this.start && num <= this.start + this.length;
};
/**
 * @param {NumRange} other
 * @returns {NumRange}
 */


NumRange.prototype.merge = function (other) {
  var start = Math.min(this.start, other.start);
  var end = Math.max(this.start + this.length, other.start + other.length);
  return new NumRange(start, end - start);
};

NumRange.prototype.centerValue = function () {
  return this.start + this.length / 2;
};
/**
 * @param {NumRange} other
 * @returns {Boolean}
 */


NumRange.prototype.isCollapse = function (other) {
  var start = Math.max(this.start, other.start);
  var end = Math.min(this.start + this.length, other.start + other.length);
  return start <= end;
};
/**
 * @param {NumRange} other
 * @returns {Boolean}
 */


NumRange.prototype.collapsedNumRange = function (other) {
  var start = Math.max(this.start, other.start);
  var end = Math.min(this.start + this.length, other.start + other.length);
  if (start <= end) return new NumRange(start, end - start);
  return null;
};

NumRange.prototype.clone = function () {
  return new NumRange(this.start, this.length);
};

var _default = NumRange;
exports["default"] = _default;