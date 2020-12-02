"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domVisitor = domVisitor;
exports.parseDom = parseDom;

var babylon = _interopRequireWildcard(require("babylon"));

var _attribute = require("./attribute");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function domVisitor(jsxCode) {
  var visitor = {
    File: function File(node, ac) {
      return acept(node.program, ac);
    },
    Program: function Program(node, ac) {
      ac.child = node.body.map(function (cNode) {
        return acept(cNode, {});
      });
      return ac;
    },
    ExpressionStatement: function ExpressionStatement(node, ac) {
      return acept(node.expression, ac);
    },
    JSXElement: function JSXElement(node, ac) {
      acept(node.openingElement, ac);

      if (node.children && node.children.length > 0) {
        ac.child = node.children.map(function (cNode) {
          return acept(cNode, {});
        });
      }

      return ac;
    },
    JSXOpeningElement: function JSXOpeningElement(node, ac) {
      var name = {};
      acept(node.name, name);
      ac.tag = name.value;

      if (node.attributes && node.attributes.length > 0) {
        node.attributes.forEach(function (aNode) {
          var attribute = {};
          acept(aNode, attribute);

          if (attribute.key) {
            if (attribute.key.startsWith('data-')) {
              ac.data = ac.data || {};
              ac.data[attribute.key.replace('data-', '')] = attribute.value;
            } else if (attribute.key.startsWith('prop-')) {
              ac.props = ac.props || {};
              ac.props[attribute.key.replace('prop-', '')] = attribute.value;
            } else if (attribute.key.startsWith('on-')) {
              ac.on = ac.props || {};
              ac.on[attribute.key.replace('on-', '')] = attribute.value;
            } else if (attribute.key == 'style') {
              ac.style = (0, _attribute.parseStyleAttr)(attribute.value);
            } else if (attribute.key == 'class') {
              var classList = (0, _attribute.parseClassAttr)(attribute.value);
              if (classList.length > 0) ac["class"] = classList;
            } else {
              ac.attr = ac.attr || {};
              ac.attr[attribute.key] = attribute.value;
            }
          }
        }, {});
      }

      return ac;
    },
    JSXIdentifier: function JSXIdentifier(node, ac) {
      ac.value = node.name;
    },
    JSXAttribute: function JSXAttribute(node, ac) {
      var key = {};
      acept(node.name, key);
      ac.key = key.value;
      var value = {};
      acept(node.value, value);
      ac.value = value.value;
      return ac;
    },
    StringLiteral: function StringLiteral(node, ac) {
      ac.value = node.value;
    },
    JSXExpressionContainer: function JSXExpressionContainer(node, ac) {
      ac.value = {
        expression: jsxCode.substring(node.expression.start, node.expression.end)
      };
      return ac;
    },
    JSXText: function JSXText(node, ac) {
      ac.text = node.value;
      return ac;
    }
  };

  function acept(node, ac) {
    return node && visitor[node.type] && visitor[node.type](node, ac);
  }

  return {
    acept: acept,
    visitor: visitor
  };
}
/***
 * @param {String} jsxCode
 */


function parseDom(jsxCode) {
  jsxCode = jsxCode.trim().replace(/>\s+</gm, '><').replace(/<(\/?)(img|input|link|br|meta)([^>]*)>/g, function (sub, end, tag, content) {
    if (end == '/') return '';
    return '<' + tag + content + '/>';
  });
  var ast = babylon.parse(jsxCode, {
    plugins: ["jsx"]
  });
  var xmlData = {};
  domVisitor(jsxCode).acept(ast, xmlData);
  if (xmlData.child.length > 1) return xmlData.child;
  return xmlData.child[0];
}

;