"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function TemplateString(props) {
  this.parts = props.parts;
}

TemplateString.prototype.toJSCode = function () {
  return this.parts.map(function (e) {
    if (e.type == TemplateString.TYPE_EXPRESSION) {
      return '(' + e.data + ')';
    } else {
      return JSON.stringify(e.data);
    }
  }).join('+');
};

TemplateString.__partRegex = /(\{\{(([^\}]|(\}[^\}]))*)\}\})|(([^\{]|(\{[^\{]))+)/g;
/**
 *  @param  {String} text 
 */

TemplateString.__matchExpression = function (text) {
  if (text[0] == '{' && text[1] == '{' && text[text.length - 1] == '}' && text[text.length - 2] == '}') {
    return [text, text.substr(2, text.length - 4).trim()];
  } else {
    return false;
  }
};

TemplateString.TYPE_STRING = 0;
TemplateString.TYPE_EXPRESSION = 1;

TemplateString.parse = function (text) {
  text = text + '';
  var matchedParts = text.match(this.__partRegex);

  if (matchedParts) {
    var parts = matchedParts.map(function (e) {
      var matchedExp = this.__matchExpression(e);

      if (matchedExp) {
        return {
          type: this.TYPE_EXPRESSION,
          data: matchedExp[1]
        };
      } else {
        return {
          type: this.TYPE_STRING,
          data: e
        };
      }
    }.bind(this));
    return new TemplateString({
      parts: parts
    });
  } else {
    return undefined;
  }
};

var _default = TemplateString;
exports["default"] = _default;