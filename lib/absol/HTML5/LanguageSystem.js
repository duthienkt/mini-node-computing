"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textNodeLanguageChangeHandler = textNodeLanguageChangeHandler;
exports.elementLanguageChangeHandler = elementLanguageChangeHandler;
exports["default"] = exports.LangSys = void 0;

var _ResizeSystem = _interopRequireDefault(require("./ResizeSystem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***
 * @typedef LanguageSystemExtension
 * @property {function(key: string, code?: string): (string | null)} getText
 */

/****
 *
 * @constructor
 */
function LanguageSystem() {
  this.data = {};
  this.code = navigator.language || navigator.userLanguage;
  /***
   *
   * @type {LanguageSystemExtension[]}
   * @private
   */

  this._extensions = [];
}

LanguageSystem.prototype.notifyLanguageChange = function () {
  var sizeChange = false;

  function visit(elt) {
    if (elt.onlanguagechange) {
      try {
        elt.onlanguagechange();
        sizeChange = true;
      } catch (err) {
        console.error(err);
      }

      if (elt.childNodes && elt.childNodes.length > 0) {
        Array.prototype.forEach.call(elt.childNodes, visit);
      }
    }
  }

  visit(document.body);
  if (sizeChange) _ResizeSystem["default"].update();
};
/***
 *
 * @param {ChildNode | Text | HTMLElement | Element} node
 */


LanguageSystem.prototype.bind = function (node, key) {
  if (node.nodeType === 1) {
    this.bindTextNode(node, key);
  } else if (node.nodeType === 3) {
    this.bindElement(node, key);
  }
};
/***
 *
 * @param {Text | {__as_language_key: string}} node
 * @param {string} key
 */


LanguageSystem.prototype.bindTextNode = function (node, key) {
  node.__as_language_key = key;
  node.onlanguagechange = textNodeLanguageChangeHandler;
};
/***
 *
 * @param {ChildNode | HTMLElement | Element | {__as_language_key: string}} node
 * @param {string} key
 */


LanguageSystem.prototype.bindElement = function (node, key) {
  node.__as_language_key = key;
  node.onlanguagechange = elementLanguageChangeHandler;
};
/***
 *
 * @param {string} key
 * @param {string} [code]
 */


LanguageSystem.prototype.getText = function (key, code) {
  var code = code || this.code;
  var res;
  var ex;

  for (var i = this._extensions.length - 1; i >= 0; --i) {
    ex = this._extensions[i];
    res = ex.getText && ex.getText.apply(ex, arguments);
    if (res) break;
  }

  if (!res) {
    res = this.data[code] && this.data[code][key];
  }

  return res || null;
};
/***
 *
 * @param {LanguageSystemExtension} ex
 */


LanguageSystem.prototype.addExtension = function (ex) {
  this._extensions.push(ex);
};

var LangSys = new LanguageSystem();
exports.LangSys = LangSys;

function textNodeLanguageChangeHandler() {
  if (this.__as_language_key) {
    var newText = LangSys.getText(this.__as_language_key);

    if (newText && newText.trim) {
      this.data = newText;
    }
  }
}

function elementLanguageChangeHandler() {
  if (this.__as_language_key) {
    var newText = LangSys.getText(this.__as_language_key);

    if (newText && newText.trim) {
      var textNode;

      for (var i = 0; i < this.childNodes.length; ++i) {
        if (this.childNodes[i].nodeType === 1) {
          textNode = this.childNodes[i];
          break;
        }
      }

      if (!textNode) {
        textNode = document.createTextNode('');
      }

      textNode.data = newText;
    }
  }
}

var _default = LangSys;
exports["default"] = _default;