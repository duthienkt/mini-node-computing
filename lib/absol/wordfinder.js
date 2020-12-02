"use strict";

var _IFrameBridge = _interopRequireDefault(require("./Network/IFrameBridge"));

var _EnglishWords = _interopRequireDefault(require("./String/EnglishWords"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bridge = _IFrameBridge["default"].getInstance();

bridge.find = function (query) {
  return _EnglishWords["default"].filter(function (s) {
    return s.indexOf(query) >= 0;
  });
};