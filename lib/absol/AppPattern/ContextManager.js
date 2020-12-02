"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ContextManager() {
  this.__contextData__ = {};
}
/**
 * @param {String} key
 * @returns {*}
 */


ContextManager.prototype.get = function (key) {
  return this.__contextData__[key];
};
/**
 * @param {String} key
 * @param {*} value
 * @returns {Context}
 */


ContextManager.prototype.set = function (key, value) {
  this.__contextData__[key] = value;
  return this;
};

ContextManager.prototype.assign = function (obj) {
  Object.assign(this.__contextData__, obj);
  return this;
};

ContextManager.prototype.remove = function (key) {
  delete this.__contextData__[key];
  return this;
};

ContextManager.prototype.contains = function (key) {
  return key in this.__contextData__;
};

var _default = ContextManager;
exports["default"] = _default;