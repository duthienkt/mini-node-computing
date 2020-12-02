"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _XMLConstant = _interopRequireDefault(require("./XMLConstant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function XMLTextNode(data) {
  this.nodeType = _XMLConstant["default"].TYPE_TEXT;
  /**
   * @type {XMLNode}
   */

  this.parentNode;
  /**
   * @type {String}
   */

  this.data = data || '';
}

XMLTextNode.prototype.remove = function () {
  if (this.parentNode) {
    this.parentNode.removeChild(this);
  }
};

XMLTextNode.prototype.toObject = function () {
  return {
    nodeType: this.nodeType,
    data: this.data
  };
};

var _default = XMLTextNode;
exports["default"] = _default;