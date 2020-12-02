"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * 
 * @param {XMLElement} xmlNode 
 */
function XMLClassList(xmlNode) {
  this.xmlNode = xmlNode;
}
/**
 * @param {String} name
 * @returns {Boolean}
 */


XMLClassList.prototype.contains = function (name) {
  var className = this.xmlNode.getAttribute('class');

  if (className) {
    var classes = className.trim().split(/\s+/);

    for (var i = 0; i < classes.length; ++i) {
      if (classes[i] == name) return true;
    }

    return false;
  } else return false;
};
/**
 * @param {Number} index
 * @returns {String}
 */


XMLClassList.prototype.item = function (index) {
  var className = this.xmlNode.getAttribute('class');

  if (className) {
    var classes = className.trim().split(/\s+/);
    return classes[index];
  } else return undefined;
};
/**
 * @param {Array<String>} arguments
 */


XMLClassList.prototype.remove = function () {
  var dict = Array.prototype.reduce.call(arguments, function (ac, name) {
    ac[name] = true;
    return ac;
  }, {});
  var className = this.xmlNode.getAttribute('class');

  if (className) {
    var classes = className.trim().split(/\s+/);
    var newClasses = classes.filter(function (name) {
      dict[name];
    });
    this.xmlNode.setAttribute(newClasses.join(' '));
  }
};
/**
 * @param {Array<String>} arguments
 */


XMLClassList.prototype.add = function () {
  var className = this.xmlNode.getAttribute('class') || '';
  var classes = className.trim().split(/\s+/);
  var dict = classes.reduce(function (ac, name) {
    ac[name] = true;
    return ac;
  }, {});

  for (var i = 0; i < arguments.length; ++i) {
    var newClass = arguments[i].trim();
    if (newClass.length == 0) return;

    if (!dict[newClass]) {
      classes.push(newClass);
      dict[newClass] = true;
    }
  }

  this.xmlNode.setAttribute('class', classes.join(' '));
};

var _default = XMLClassList;
exports["default"] = _default;