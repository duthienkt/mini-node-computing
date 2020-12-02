"use strict";

var _atob = _interopRequireDefault(require("atob"));

var _btoa = _interopRequireDefault(require("btoa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (!('atob' in window)) {
  window.atob = _atob["default"];
}

if (!('btoa' in window)) {
  window.btoa = _btoa["default"];
}