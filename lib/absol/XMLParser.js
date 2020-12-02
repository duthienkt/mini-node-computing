"use strict";

var _XML = _interopRequireDefault(require("./XML/XML"));

var _XMLCommentNode = _interopRequireDefault(require("./XML/XMLCommentNode"));

var _XMLConstant = _interopRequireDefault(require("./XML/XMLConstant"));

var _XMLDeclarationNode = _interopRequireDefault(require("./XML/XMLDeclarationNode"));

var _XMLElement = _interopRequireDefault(require("./XML/XMLElement"));

var _XMLTextNode = _interopRequireDefault(require("./XML/XMLTextNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (!('XMLParser' in window)) {
  window.XMLParser = {
    XML: _XML["default"],
    XMLCommentNode: _XMLCommentNode["default"],
    XMLConstant: _XMLConstant["default"],
    XMLDeclaretionNode: _XMLDeclarationNode["default"],
    XMLElement: _XMLElement["default"],
    XMLTextNode: _XMLTextNode["default"],
    parse: _XML["default"].parse.bind(_XML["default"]),
    parseLikeHTML: _XML["default"].parseLikeHTML.bind(_XML["default"]),
    stringify: _XML["default"].stringify.bind(_XML["default"])
  };
} else {
  throw new Error('XMLParser');
}