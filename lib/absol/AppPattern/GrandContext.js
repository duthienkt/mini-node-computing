"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Context = _interopRequireDefault(require("./Context"));

var _ContextManager = _interopRequireDefault(require("./ContextManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function GrandContext() {
  _Context["default"].call(this);

  this.ctxMng = new _ContextManager["default"]();
}

Object.defineProperties(GrandContext.prototype, Object.getOwnPropertyDescriptors(_Context["default"].prototype));
GrandContext.prototype.constructor = GrandContext;

GrandContext.prototype.getContextManager = function () {
  return this.ctxMng;
};
/**
 * find context from parent
 */


GrandContext.prototype.getContext = function () {
  return _Context["default"].prototype.getContext.apply(this, arguments) || this.parent && this.parent.getContext.apply(this.parent, arguments);
};

var _default = GrandContext;
exports["default"] = _default;