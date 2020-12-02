"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AElement = _interopRequireDefault(require("./AElement"));

var _AElementNS = _interopRequireDefault(require("./AElementNS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @constructor
 */
function ResizeSystem() {
  this.elts = [];
  this.cache = [];
  this.cacheOf = null;
  this.lastResizeTime = 0;
  window.addEventListener('resize', this.update.bind(this));
  this['goDown' + 'AndCache'] = this.goDownAndCache.bind(this);
  this['notify' + 'ToElt'] = this.notifyToElt.bind(this);
}
/***
 *
 * @param {AElement | AElementNS} elt
 */


ResizeSystem.prototype.goDownAndCache = function (elt) {
  if (this.notifyToElt(elt)) this.cache.push(elt);

  if (elt.childNodes) {
    Array.prototype.forEach.call(elt.childNodes, this.goDownAndCache);
  }
};

ResizeSystem.prototype.notifyToElt = function (elt) {
  if (typeof elt.requestUpdateSize == 'function') {
    elt.requestUpdateSize();
    return true;
  } else if (typeof elt.updateSize == 'function') {
    elt.updateSize();
    return true;
  } else if (typeof elt.onresize == 'function') {
    elt.onresize();
    return true;
  }
};

ResizeSystem.prototype.update = function () {
  var now = new Date().getTime();

  if (now - 100 > this.lastResizeTime) {
    this.removeTrash();
    this.cache = undefined;
  }

  this.lastResizeTime = now;

  if (this.cacheOf !== null) {
    this.cache = undefined;
    this.cacheOf = null;
  }

  if (this.cache === undefined) {
    this.cache = [];
    this.elts.forEach(this.goDownAndCache);
  } else {
    this.cache.forEach(this.notifyToElt);
  }
};

ResizeSystem.prototype.removeTrash = function () {
  this.elts = this.elts.filter(function (element) {
    return _AElement["default"].prototype.isDescendantOf.call(element, document.body);
  });
};
/***
 *
 * @param  {AElement| AElementNS | Node} fromElt
 * @returns {boolean}
 */


ResizeSystem.prototype.updateUp = function (fromElt) {
  while (fromElt) {
    if (typeof fromElt.requestUpdateSize == 'function') {
      fromElt.requestUpdateSize();
      return true;
    } else if (typeof fromElt.updateSize == 'function') {
      fromElt.updateSize();
      return true;
    } else if (typeof fromElt.onresize == 'function') {
      fromElt.onresize();
      return true;
    }

    fromElt = fromElt.parentElement;
  }
};
/***
 *
 * @param  {AElement| AElementNS | Node} fromElt
 * @returns {boolean}
 */


ResizeSystem.prototype.updateDown = function (fromElt) {
  var now = new Date().getTime();

  if (now - 100 > this.lastResizeTime) {
    this.cache = undefined;
  }

  this.lastResizeTime = now;

  if (this.cacheOf !== fromElt) {
    this.cache = undefined;
    this.cacheOf = fromElt;
  }

  if (this.cache === undefined) {
    this.cache = [];
    this.goDownAndCache(fromElt);
  } else {
    this.cache.forEach(this.notifyToElt);
  }
};
/***
 *
 * @param {AElement| AElementNS | Node} elt
 * @return {boolean}
 */


ResizeSystem.prototype.add = function (elt) {
  for (var i = 0; i < this.elts.length; ++i) {
    if (_AElement["default"].prototype.isDescendantOf.call(elt, this.elts[i])) {
      return false;
    }
  }

  this.elts = this.elts.filter(function (e) {
    return !_AElement["default"].prototype.isDescendantOf.call(e, elt);
  });
  this.elts.push(elt);
  return true;
};

var _default = new ResizeSystem();

exports["default"] = _default;