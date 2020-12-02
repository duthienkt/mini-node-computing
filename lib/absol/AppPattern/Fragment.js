"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Context = _interopRequireDefault(require("./Context"));

var _ContextManager = _interopRequireDefault(require("./ContextManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Fragment() {
  _Context["default"].call(this);

  this.ctxMng = new _ContextManager["default"]();
}

Object.defineProperties(Fragment.prototype, Object.getOwnPropertyDescriptors(_Context["default"].prototype));
Fragment.prototype.constructor = Fragment;

Fragment.prototype.getContextManager = function () {
  return this.ctxMng;
};

Fragment.prototype.getView = function () {
  if (this.$view) return this.$view;
  this.$view = this.createView() || this.$view;
  if (!this.$view) throw new Error("this.$view must be not null!");
  if (this.onCreated) this.onCreated();
  return this.$view;
};
/**
 * find context from parent
 */


Fragment.prototype.getContext = function () {
  return _Context["default"].prototype.getContext.apply(this, arguments) || this.parent && this.parent.getContext.apply(this.parent, arguments);
};

var _default = Fragment;
exports["default"] = _default;