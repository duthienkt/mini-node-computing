"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _XML = _interopRequireDefault(require("../XML/XML"));

var _XMLConstant = _interopRequireDefault(require("../XML/XMLConstant"));

var _TemplateString = _interopRequireDefault(require("./TemplateString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function TemplateXML(props) {
  this.xml = props.xml;
}

TemplateXML.prototype._xmlNodeToJSCode = function (node) {
  var body = [];

  if (node.nodeType == _XMLConstant["default"].TYPE_ELEMENT) {
    body.push('tag:' + JSON.stringify(node.tagName));
    var attributeKeys = Object.keys(node.attributes).filter(function (x) {
      return x != 'class' && x != 'style' && !x.startsWith('az-');
    });

    if (attributeKeys && attributeKeys.length > 0) {
      body.push('attr: {' + attributeKeys.map(function (key) {
        return JSON.stringify(key) + ': ' + _TemplateString["default"].parse(node.attributes[key]).toJSCode();
      }).join(', ') + '}');
    }

    if (node.attributes['az-props']) {
      body.push('props: ' + _TemplateString["default"].parse(node.attributes['az-props']).toJSCode());
    }

    if (node.attributes['az-data']) {
      body.push('data: ' + _TemplateString["default"].parse(node.attributes['az-data']).toJSCode());
    }

    if (node.attributes.style) {
      var styleSheet = node.attributes.style.split(';').map(function (s) {
        var t = s.split(':').map(function (text) {
          return text.trim();
        });

        if (t.length == 2) {
          return JSON.stringify(t[0]) + ': ' + JSON.stringify(t[1]);
        } else return false;
      }).filter(function (e) {
        return !!e;
      });

      if (styleSheet.length > 0) {
        body.push('style:{' + styleSheet.join(',') + '}');
      }
    }

    if (node.attributes["class"]) {
      var classList = node.attributes["class"].trim().split(/\s+/);
      if (classList.length > 0) body.push('class:' + JSON.stringify(classList));
    }

    if (node.childNodes && node.childNodes.length > 0) {
      var childList = '[' + node.childNodes.filter(function (e) {
        return e.nodeType == _XMLConstant["default"].TYPE_ELEMENT || e.nodeType == _XMLConstant["default"].TYPE_TEXT;
      }).map(function (e) {
        return this._xmlNodeToJSCode(e);
      }.bind(this)).filter(function (e) {
        return !!e;
      }).join(', ') + ']';
      if (childList && childList.length > 0) body.push('child: ' + childList);
    }
  } else if (node.nodeType == _XMLConstant["default"].TYPE_TEXT) {
    body.push('text: ' + _TemplateString["default"].parse(node.data).toJSCode());
  } else return undefined;

  var res = '{' + body.join(', ') + '}';
  return res;
};

TemplateXML.prototype.toJSCode = function () {
  var res = this._xmlNodeToJSCode(this.xml);

  return res;
};
/**
 * 
 * @param  {...any} args 
 * @returns {Function}
 */


TemplateXML.compileToFunction = function () {
  var innerCode = 'return ' + this.parse(arguments[arguments.length - 1]).toJSCode() + ';';
  var fParam = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
  fParam.push(innerCode);
  return Function.apply(null, fParam);
};

TemplateXML.parse = function (text) {
  var xml = _XML["default"].parse(text);

  if (xml) {
    return new TemplateXML({
      xml: xml
    });
  } else return undefined;
};

var _default = TemplateXML;
exports["default"] = _default;