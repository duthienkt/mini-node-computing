"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _int = require("./int");

function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
}

Circle.prototype.isPointInBound = function (p) {
  return (0, _int.distance)(this.x, this.y, p.x, p.y) > r;
};

Circle.prototype.isRectInBound = function (rect) {
  return this.isPointInBound(rect.A()) && this.isPointInBound(rect.B()) && this.isPointInBound(rect.C()) && this.isPointInBound(rect.D());
};

Circle.make = function (x, y, r) {
  return new Circle(x, y, r);
};

var _default = Circle;
exports["default"] = _default;