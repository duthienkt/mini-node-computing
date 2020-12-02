"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AElement = _interopRequireDefault(require("./AElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***
 * @augments AElement
 * @augments SVGGraphicsElement
 * @constructor
 */
function AElementNS() {
  _AElement["default"].call(this);
}

Object.defineProperties(AElementNS.prototype, Object.getOwnPropertyDescriptors(_AElement["default"].prototype));
AElementNS.prototype.constructor = AElementNS;

AElementNS.prototype.attr = function () {
  if (arguments.length == 1) {
    if (typeof arguments[0] == 'string') {
      if (this._azar_extendAttributes[arguments[0]]) {
        return this._azar_extendAttributes[arguments[0]].get.call(this);
      } else return this.getAttributeNS(null, arguments[0]);
    } else {
      for (var key in arguments[0]) {
        this.attr(key, arguments[0][key]);
      }
    }
  } else {
    if (arguments.length == 2) {
      if (arguments[1] === null || arguments[1] === undefined) {
        if (this._azar_extendAttributes[arguments[0]]) {
          this._azar_extendAttributes[arguments[0]].remove.call(this, arguments[1]);
        } else this.removeAttributeNS(null, arguments[0]);
      } else {
        if (this._azar_extendAttributes[arguments[0]]) {
          this._azar_extendAttributes[arguments[0]].set.call(this, arguments[1]);
        } else {
          this.setAttributeNS(null, arguments[0], arguments[1]);
        }
      }
    }
  }

  return this;
};
/***
 * @returns {Promise}
 */


AElementNS.prototype.afterAttached = function () {
  if (this.isDescendantOf(document.body)) return Promise.resolve();
  var attachHookElt = this.$attachhook || this.querySelector('.absol-attachhook');

  if (!attachHookElt) {
    attachHookElt = document.createElementNS(null, 'img');
    attachHookElt.setAttributeNS(null, 'href', '');
    var prototypes = Object.getOwnPropertyDescriptors(AElementNS.prototype);
    Object.defineProperties(attachHookElt, prototypes);
    AElementNS.call(attachHookElt);
    this.$attachhook = attachHookElt;
    this.appendChild(attachHookElt);
  }

  return new Promise(function (rs) {
    attachHookElt.once('error', rs);
  });
};

var _default = AElementNS;
exports["default"] = _default;