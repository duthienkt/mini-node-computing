"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getFunctionName;

/**
 * 
 * @param {Function} func 
 */
function getFunctionName(func) {
  var ret = func.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}