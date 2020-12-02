"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function JSPath(props) {
  this.path = props.path;
}
/** 
 * 
 * @param {Element} element 
 * @returns {Boolean}
 */


JSPath.prototype.match = function (element, query) {
  if (query.id) {
    if (!element.getAttribute || element.getAttribute('id') != query.id) return false;
  }

  if (query.tagName) {
    var matchTag = false;
    if (element._azar_extendTags && element._azar_extendTags[query.tagName]) matchTag = true;
    matchTag = matchTag || (element.tagName || '').toUpperCase() == query.tagName.toUpperCase();
    if (!matchTag) return false;
  }

  if (query.classList) for (var i = 0; i < query.classList.length; ++i) {
    if (!element.classList || !element.classList.contains(query.classList[i])) return false;
  }

  if (query.attributes) {
    for (var key in query.attributes) {
      var value;

      if (element.attr) {
        value = element.attr(key);
        if (value != query.attributes[key]) return false;
      } else if (element.getAttribute) {
        value = element.getAttribute(key);
        if (value != query.attributes[key]) return false;
      }
    }
  }

  return true;
};
/**
 * Warning : still fail in some testcase
 */


JSPath.prototype.findFirst = function (root, onFound) {
  var queue = [{
    e: root,
    i: 0
  }];
  var current;

  while (queue.length > 0) {
    current = queue.shift();
    var isMathed = false;
    var currentElt = current.e;
    var currentI = current.i;

    if (this.match(currentElt, this.path[currentI])) {
      if (this.path[currentI].childCombinate) {
        var trackI = currentI;
        var trackElement = currentElt;
        var isTrackMatch = true;

        while (isTrackMatch && trackI > 0 && this.path[trackI].childCombinate) {
          if (!trackElement.parentNode || !this.match(trackElement.parentNode, this.path[trackI - 1])) {
            isTrackMatch = false;
          } else {
            trackElement = trackElement.parentNode;
            trackI--;
          }
        }

        if (isTrackMatch) isMathed = true;
      } else {
        isMathed = true;
      }
    }

    if (isMathed && currentI + 1 == this.path.length) {
      if (!onFound || onFound && onFound(currentElt)) return currentElt;
    }

    if (currentElt.childNodes) {
      var l = currentElt.childNodes.length;

      for (var i = 0; i < l; ++i) {
        if (currentElt.childNodes[i].tagName) queue.push({
          e: currentElt.childNodes[i],
          i: currentI + (isMathed && currentI + 1 < this.path.length ? 1 : 0)
        });
      }
    }
  }

  return undefined;
};

JSPath.prototype.findAll = function (root, onFound) {
  var res = [];
  var queue = [{
    e: root,
    i: 0
  }];
  var current;

  while (queue.length > 0) {
    current = queue.shift();
    var isMathed = false;
    var currentElt = current.e;
    var currentI = current.i;

    if (this.match(currentElt, this.path[currentI])) {
      if (this.path[currentI].childCombinate) {
        var trackI = currentI;
        var trackElement = currentElt;
        var isTrackMatch = true;

        while (isTrackMatch && trackI > 0 && this.path[trackI].childCombinate) {
          if (!trackElement.parentNode || !this.match(trackElement.parentNode, this.path[trackI - 1])) {
            isTrackMatch = false;
          } else {
            trackElement = trackElement.parentNode;
            trackI--;
          }
        }

        if (isTrackMatch) isMathed = true;
      } else {
        isMathed = true;
      }
    }

    if (isMathed && currentI + 1 == this.path.length) {
      if (!onFound || onFound && onFound(currentElt)) res.push(currentElt);
    }

    if (currentElt.childNodes) {
      var l = currentElt.childNodes.length;

      for (var i = 0; i < l; ++i) {
        if (currentElt.childNodes[i].tagName) queue.push({
          e: currentElt.childNodes[i],
          i: currentI + (isMathed && currentI + 1 < this.path.length ? 1 : 0)
        });
      }
    }
  }

  return res;
};

JSPath.__tagRegex = /((([^\s\>\(])|(\([^\)]*\)))+)|(\>)/g;
JSPath.__tagNameRegex = /^[a-zA-Z0-9\-\_]+/i;
JSPath.__classRegex = /\.[a-zA-Z0-9\-\_]+/g;
JSPath.__idRegex = /\#[a-zA-Z0-9\-\_]+/i;
JSPath.__attrRegex = /\[\s*([a-zA-Z-0-9\-]+)\s*\=\"\s*(((\\.)|([^\"]))+)\"\s*\]/g;
JSPath.__attrParseRegex = /\[\s*([a-zA-Z-0-9\-]+)\s*\=\"\s*(((\\.)|([^\"]))+)\"\s*\]/i;

JSPath.parseQuery = function (s) {
  var tag = {};
  var classList = s.match(this.__classRegex);
  var idList = s.match(this.__idRegex);
  var tagList = s.match(this.__tagNameRegex);
  var attributeList = s.match(this.__attrRegex);

  if (idList && idList.length > 0) {
    tag.id = idList[0].substring(1);
  }

  if (tagList && tagList.length > 0) {
    tag.tagName = tagList[0].trim();
  }

  if (classList && classList.length > 0) {
    tag.classList = classList.map(function (s) {
      return s.substring(1);
    });
  }

  var attrParseRegex = this.__attrParseRegex;

  if (attributeList && attributeList.length > 0) {
    tag.attributes = attributeList.reduce(function (ac, s) {
      var tokens = s.match(attrParseRegex);
      var key = tokens[1];
      var value = tokens[2];
      ac[key] = value;
      return ac;
    }, {});
  }

  return tag;
};
/**
 * @param {String} text
 * @returns {JSPath}
 */


JSPath.compileJSPath = function (text) {
  var tagTexts = text.match(this.__tagRegex) || [''];
  var path = [];
  var childCombinate = false;

  for (var i = 0; i < tagTexts.length; ++i) {
    var s = tagTexts[i];

    if (s == '>') {
      childCombinate = true;
    } else {
      var tag = this.parseQuery(s);
      tag.childCombinate = childCombinate;
      path.push(tag);
      childCombinate = false;
    }
  }

  return new JSPath({
    path: path
  });
};

var _default = JSPath;
exports["default"] = _default;