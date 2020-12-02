"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Dom = _interopRequireDefault(require("./Dom"));

var _EventEmitter = _interopRequireDefault(require("./EventEmitter"));

var _AElement = _interopRequireDefault(require("./AElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***
 *
 * @extends EventEmitter
 * @param {AElement} attachHookElt
 * @constructor
 */
function DomSignal(attachHookElt) {
  _EventEmitter["default"].call(this);

  this.signals = {};
  this.ev_attached = this.ev_attached.bind(this);
  this.$attachhook = attachHookElt || _Dom["default"].ShareInstance._('attachhook');
  this.$attachhookParent = attachHookElt && attachHookElt.parentElement || null;
  this.$attachhook.on('attached', this.ev_attached);
}

Object.defineProperties(DomSignal.prototype, Object.getOwnPropertyDescriptors(_EventEmitter["default"].prototype));
DomSignal.prototype.constructor = DomSignal;

DomSignal.prototype.execSignal = function () {
  var signals = this.signals;

  if (this.$attachhook) {
    this.$attachhook.remove();
    this.$attachhook.resetState();
  }

  this.signals = {};

  for (var name in signals) {
    this.fire.apply(this, [name].concat(signals[name]));
  }
};

DomSignal.prototype.emit = function (name) {
  this.signals[name] = Array.prototype.slice.call(arguments, 1);

  if (!this.$attachhookParent) {
    this.$attachhookParent = document.body;
  }

  if (!this.$attachhook.parentElement) {
    this.$attachhookParent.appendChild(this.$attachhook);
  }
};

DomSignal.prototype.ev_attached = function () {
  this.execSignal();
};

var _default = DomSignal;
exports["default"] = _default;