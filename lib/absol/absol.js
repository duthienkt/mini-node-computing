"use strict";

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//for old plugin
_["default"]['HTML' + 'El' + 'ement'.toLowerCase()] = _["default"].Element;
_["default"].dom = _["default"].Dom;
_["default"].event = _["default"].EventEmitter;
_["default"].Event = _["default"].EventEmitter;
_["default"].color = _["default"].Color;
_["default"].documentReady = _["default"].Dom.documentReady;
window.AComp = _["default"].AComp;
window.PhotoSwipeViewer = _["default"].PhotoSwipeViewer;
window.IFrameBridge = _["default"].IFrameBridge;
window.absol = _["default"];
var mapKeys = {
  ShareDom: 'coreDom',
  ShareDomCreator: 'domCreator',
  ShareSvgC: 'coreSvgCreator',
  ShareSvgCreator: 'svgCreator',
  ShareCreator: 'domCreator'
};
_["default"].logData = [];

_["default"].log = function () {
  _["default"].logData.push([new Error('TraceError')].concat(Array.prototype.slice.call(arguments)));
};

Object.keys(mapKeys).forEach(function (key) {
  var valueKey = mapKeys[key];
  Object.defineProperty(_["default"], key, {
    get: function get() {
      if (!this['__warn' + key + '__']) {
        this['__warn' + key + '__'] = true;

        _["default"].log("use " + valueKey + ' instead of ' + key);
      }

      return this[valueKey];
    }
  });
});