"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Vec = _interopRequireDefault(require("./Vec2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Mat3(data) {
  this.data = data || Array(6).fill(0);
}

Mat3.identity = function () {
  return new Mat3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
};
/**
 *
 * @returns {Mat3|null}
 */


Mat3.prototype.invert = function () {
  var a = this.data;
  var out = Array(9);
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;
  if (!det) return null;
  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return new Mat3(out);
};
/**
 *
 * @param {Vec2} v
 * @return {Mat3}
 */


Mat3.prototype.translate = function (v) {
  var out = Array(9);
  var a = this.data;
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var x = v.x,
      y = v.y;
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return new Mat3(out);
};
/**
 *
 * @param {Mat3} mat
 * @returns {Mat3}
 */


Mat3.prototype.multiply = function (mat) {
  var a = this.data;
  var b = mat.data;
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  var out = Array(9);
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return new Mat3(out);
};
/***
 *
 * @param {Number} rad
 * @return {Mat3}
 */


Mat3.prototype.rotate = function (rad) {
  var a = this.data;
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var out = Array(9);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return new Mat3(out);
};
/***
 *
 * @param {Vec2} v
 * @returns {Mat3}
 */


Mat3.prototype.scale = function (v) {
  var x = v.x;
  var y = v.y;
  var out = Array(9);
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return new Mat3(out);
};
/***
 *
 * @return {Mat3}
 */


Mat3.prototype.transpose = function () {
  var a = this.data;
  var out = Array(9);
  out[0] = a[0];
  out[1] = a[3];
  out[2] = a[6];
  out[3] = a[1];
  out[4] = a[4];
  out[5] = a[7];
  out[6] = a[2];
  out[7] = a[5];
  out[8] = a[8];
  return new Mat3(out);
};
/**
 *
 * @param {Vec2}v
 */


Mat3.prototype.apply2DTransform = function (v) {
  var a = this.data;
  var x0 = v.x;
  var y0 = v.y;
  var x = x0 * a[0] + y0 * a[3] + a[6];
  var y = x0 * a[1] + y0 * a[4] + a[7];
  return new _Vec["default"](x, y);
};

var _default = Mat3;
exports["default"] = _default;