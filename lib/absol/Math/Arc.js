"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Vec = _interopRequireDefault(require("./Vec2"));

var _int = require("./int");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Arc(x, y, r, start, end) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.start = start;
  this.end = end;
}

Arc.prototype.isPointInBound = function (p) {
  if ((0, _int.distance)(this.x, this.y, p.x, p.y) > r) return false;
  return (0, _int.radianInRange)(Math.atan2(p.y - this.y, p.x - this.x), start, end);
};

Arc.prototype.isRectInBound = function (rect) {
  return this.isPointInBound(rect.A()) && this.isPointInBound(rect.B()) && this.isPointInBound(rect.C()) && this.isPointInBound(rect.D());
};

Arc.prototype.isRectOutBound = function (rect) {
  return !this.isPointInBound(rect.A()) && !this.isPointInBound(rect.B()) && !this.isPointInBound(rect.C()) && !this.isPointInBound(rect.D());
};

Arc.prototype.isRectCollapse = function (rect) {
  return this.isPointInBound(rect.A()) || this.isPointInBound(rect.B()) || this.isPointInBound(rect.C()) || this.isPointInBound(rect.D());
};

Arc.prototype.centerPoint = function () {
  var mid = (this.start + this.end) / 2;
  var x = this.x + Math.cos(mid) * this.r * 2 / 3;
  var y = this.y + Math.sin(mid) * this.r * 2 / 3;
  return new _Vec["default"](x, y);
};

Arc.prototype.centerRoundPoint = function () {
  var mid = (this.start + this.end) / 2;
  var x = this.x + Math.cos(mid) * this.r;
  var y = this.y + Math.sin(mid) * this.r;
  return new _Vec["default"](x, y);
};

Arc.make = function (x, y, r, start, end) {
  return new Arc(x, y, r, start, end);
};

var _default = Arc;
exports["default"] = _default;