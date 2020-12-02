"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TemplateString = _interopRequireDefault(require("../JSMaker/TemplateString"));

var _document = _interopRequireDefault(require("./templates/document.tpl"));

var _mht_document = _interopRequireDefault(require("./templates/mht_document.tpl"));

var _mht_part = _interopRequireDefault(require("./templates/mht_part.tpl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  document: new Function('pageSetting', 'return ' + _TemplateString["default"].parse(_document["default"]).toJSCode()),
  mht_document: new Function('htmlSource', 'contentParts', 'return ' + _TemplateString["default"].parse(_mht_document["default"]).toJSCode()),
  mht_part: new Function('contentType', 'contentEncoding', 'contentLocation', 'encodedContent', 'return ' + _TemplateString["default"].parse(_mht_part["default"]).toJSCode())
};
exports["default"] = _default;