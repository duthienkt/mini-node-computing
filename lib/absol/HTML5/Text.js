"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextNodesIn = getTextNodesIn;
exports.setSelectionRangeStart = setSelectionRangeStart;
exports.setSelectionRangeEnd = setSelectionRangeEnd;
exports.setSelectionRange = setSelectionRange;
exports.getTextIn = getTextIn;
exports.textToNodes = textToNodes;
exports.getCaretPosition = getCaretPosition;
exports.setCaretPosition = setCaretPosition;
exports.measureText = measureText;

var _Dom = _interopRequireDefault(require("./Dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getTextNodesIn(node) {
  var textNodes = [];

  if (node.nodeType == 3) {
    textNodes.push(node);
  } else {
    var children = node.childNodes;

    for (var i = 0, len = children.length; i < len; ++i) {
      textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
    }
  }

  return textNodes;
}
/**
 * 
 * @param {Element} el 
 * @param {Range} range 
 * @param {Number} start 
 * @returns {Number} -1: ok,  ret >= 0(is length of text) : need move to next element
 * 
 */


function setSelectionRangeStart(el, range, start) {
  if (start > 0) {
    if (el.nodeType == Node.TEXT_NODE) {
      var text = el.data;

      if (start <= text.length) {
        range.setStart(el, start);
        return -1;
      } else return text.length;
    }

    if (el.tagName.toLowerCase() == 'br') {
      return 0;
    } else {
      var delta = 0;
      var i = 0;
      var textLength = 0;
      var newLine = false;

      while (delta >= 0 && i < el.childNodes.length) {
        var childElt = el.childNodes[i];

        if (newLine) {
          newLine = false;
          ++textLength;
        }

        delta = setSelectionRangeStart(childElt, range, start - textLength);
        if (delta >= 0) textLength += delta;

        if (childElt.nodeType != Node.TEXT_NODE && (window.getComputedStyle(childElt).display == 'block' || childElt.tagName.toLowerCase() == 'br')) {
          newLine = true;
        }

        ++i;
      }

      if (delta >= 0) return textLength;
      return -1;
    }
  } else {
    range.setStart(el, 0);
    return -1;
  }
}
/**
 * 
 * @param {Element} el 
 * @param {Range} range 
 * @param {Number} end 
 * @returns {Number} -1: ok,  ret >= 0(is length of text) : need move to next element
 * 
 */


function setSelectionRangeEnd(el, range, end) {
  if (end > 0) {
    if (el.nodeType == Node.TEXT_NODE) {
      var text = el.data;

      if (end <= text.length) {
        range.setEnd(el, end);
        return -1;
      } else return text.length;
    }

    if (el.tagName.toLowerCase() == 'br') {
      return 0;
    } else {
      var delta = 0;
      var i = 0;
      var textLength = 0;
      var newLine = false;

      while (delta >= 0 && i < el.childNodes.length) {
        var childElt = el.childNodes[i];

        if (newLine) {
          newLine = false;
          ++textLength;
        }

        delta = setSelectionRangeEnd(childElt, range, end - textLength);
        if (delta >= 0) textLength += delta;

        if (childElt.nodeType != Node.TEXT_NODE && (window.getComputedStyle(childElt).display == 'block' || childElt.tagName.toLowerCase() == 'br')) {
          newLine = true;
        }

        ++i;
      }

      if (delta >= 0) return textLength;
      return -1;
    }
  } else {
    range.setEnd(el, 0);
    return -1;
  }
}

function setSelectionRange(el, start, end) {
  if (document.createRange && window.getSelection) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var delta;

    if (start >= 0) {
      delta = setSelectionRangeStart(el, range, start);
      if (delta >= 0) range.setStart(el, el.childNodes.length);
    } else {
      start = 0;
      range.setStart(el, 0);
    }

    if (end >= start) {
      delta = setSelectionRangeEnd(el, range, end);
      if (delta >= 0) range.setEnd(el, el.childNodes.length);
    }

    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (document.selection && document.body.createTextRange) {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(true);
    textRange.moveEnd("character", end);
    textRange.moveStart("character", start);
    textRange.select();
  }
}

function getTextIn(e) {
  if (e.nodeType == Node.TEXT_NODE) {
    return e.data;
  }

  if (e.tagName && e.tagName.toLowerCase() == 'br') return '';
  var texts = [];
  var newLine = false;

  for (var i = 0; i < e.childNodes.length; ++i) {
    if (newLine) {
      newLine = false;
      texts.push('\n');
    }

    var childElt = e.childNodes[i];
    texts.push(getTextIn(childElt));

    if (childElt.nodeType != Node.TEXT_NODE && (window.getComputedStyle(childElt).display == 'block' || childElt.tagName.toLowerCase() == 'br')) {
      newLine = true;
    }
  }

  return texts.join('');
}

function textToNodes(text) {
  var lines = text.split(/\r?\n/);
  return lines.map(function (text) {
    if (text.length == 0) {
      return _Dom["default"].ShareInstance._({
        child: {
          tag: 'br'
        }
      });
    } else {
      return _Dom["default"].ShareInstance._({
        child: {
          text: text
        }
      });
    }
  });
}
/*
** Returns the caret (cursor) position of the specified text field (oField).
** Return value range is 0-oField.value.length.
*/


function getCaretPosition(oField) {
  // Initialize
  var iCaretPos = 0; // IE Support

  if (document.selection) {
    // Set focus on the element
    oField.focus(); // To get cursor position, get empty selection range

    var oSel = document.selection.createRange(); // Move selection start to 0 position

    oSel.moveStart('character', -oField.value.length); // The caret position is selection length

    iCaretPos = oSel.text.length;
  } // Firefox support
  else if (oField.selectionStart || oField.selectionStart == '0') iCaretPos = oField.selectionDirection == 'backward' ? oField.selectionStart : oField.selectionEnd; // Return results


  return iCaretPos;
}

function setCaretPosition(oField, caretPos) {
  if (oField.createTextRange) {
    var range = oField.createTextRange();
    range.move('character', caretPos);
    range.select();
  } else {
    if (oField.selectionStart) {
      oField.focus();
      oField.setSelectionRange(caretPos, caretPos);
    } else oField.focus();
  }
}

function measureText(text, font) {
  // re-use canvas object for better performance
  var canvas = measureText.canvas || (measureText.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  if (font) context.font = font;
  var metrics = context.measureText(text);
  return metrics;
}