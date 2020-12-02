"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _XMLDeclarationNode = _interopRequireDefault(require("./XMLDeclarationNode"));

var _XMLElement = _interopRequireDefault(require("./XMLElement"));

var _XMLTextNode = _interopRequireDefault(require("./XMLTextNode"));

var _XMLConstant = _interopRequireDefault(require("./XMLConstant"));

var _XMLCommentNode = _interopRequireDefault(require("./XMLCommentNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 
 * @param {RegExp} regex 
 */
function getRegexBody(regex) {
  return regex.toString().match(/^\/(.+)\/([gimuy]*)$/)[1];
}

var BEGIN_TAG = 1;
var END_TAG = 2;
var CDATA = 3;
var DECLARATION = 4;
var COMMENT = 5;
var TEXT = 6;
var identRgx = /[^\s\"\r\n\'\!\/=\>\<\]\[\?\+\.]+/;
var spaceRgx = /[\s\r\n]+/;
var stringRgx = /\"(([^\"\\]*|(\\.))*)\"/;
var textRgx = /[^\<\-]+/;
var doctypeOpenRgx = /\<\!DOCTYPE/;
var commentOpenRgx = /\<!\-\-/;
var commentCloseRgx = /\-\-\>/;
var cdataOpenRgx = /\<\!\[CDATA\[/;
var cdataCloseRgx = /\]\]\>/;
var openRgx = /\</;
var openEndTagRgx = /\<\//;
var closeRgx = /\>/;
var shortCloseRgx = /\/\>/;
var declarationOpenRgx = /\<\?/;
var declarationCloseRgx = /\?\>/;
var assignOpRgx = /=/;
var tokenRgxBody = '(' + [spaceRgx, doctypeOpenRgx, declarationOpenRgx, cdataOpenRgx, commentOpenRgx, openEndTagRgx, openRgx, assignOpRgx, stringRgx, commentCloseRgx, identRgx, declarationCloseRgx, shortCloseRgx, closeRgx, cdataCloseRgx, textRgx].map(function (e) {
  return getRegexBody(e);
}).join(')|(') + ')';
var tokenType = {
  space: spaceRgx,
  doctypeOpen: doctypeOpenRgx,
  declarationOpen: declarationOpenRgx,
  cdataOpen: cdataOpenRgx,
  commentOpen: commentOpenRgx,
  openEndTag: openEndTagRgx,
  open: openRgx,
  ident: identRgx,
  assignOp: assignOpRgx,
  string: stringRgx,
  commentClose: commentCloseRgx,
  declarationClose: declarationCloseRgx,
  shortClose: shortCloseRgx,
  close: closeRgx,
  cdataClose: cdataCloseRgx,
  text: textRgx
};
var tokenRgx = new RegExp(tokenRgxBody);
/**
 * 
 * @typedef {Object} Token
 * @property {String} text
 * @property {*} matched
 */

/**
 * 
 * @param {String} text 
 * @returns {Array<Token>}
 */

function xmlTokenize(text) {
  var texts = text.match(new RegExp(tokenRgxBody, 'g'));
  return text.match(new RegExp(tokenRgxBody, 'g')).map(function (tokenText, i) {
    var result = {
      text: tokenText,
      matched: {}
    };

    for (var tType in tokenType) {
      var matched = tokenText.match(tokenType[tType]);

      if (matched) {
        if (matched[0] == tokenText) result.matched[tType] = matched;
      }
    }

    return result;
  });
}
/**
 * @typedef {Object} XMLPaseInfo
 * @property {Array<Token>} tokens
 * @property {Number} type
 * @property {Number} start
 * @property {Number} end
 * @property {Error} error
 * @property {Boolean} closed
 * 
 * 
 * 
 * @typedef {Object} XMLParseNode 
 * @property {XMLPaseInfo} __xml__
 * @property {String} tagName
 * @property {*} attributes
 * @property {String} text
 */

/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */


function matchAssign(tokens, i) {
  var result = {
    __xml__: {
      start: i
    }
  };
  var cToken;

  if (i < tokens.length) {
    cToken = tokens[i];

    if (cToken.matched['ident']) {
      result.key = cToken.text;
      ++i;

      if (i < tokens.length) {
        cToken = tokens[i];

        if (cToken.matched['space']) {
          ++i;
        }

        if (i < tokens.length) {
          cToken = tokens[i];

          if (cToken.matched['assignOp']) {
            ++i;

            if (i < tokens.length) {
              cToken = tokens[i];

              if (cToken.matched['space']) {
                ++i;
              }

              if (i < tokens.length) {
                cToken = tokens[i];

                if (cToken.matched['string']) {
                  result.value = cToken.matched.string[1];
                  ++i;
                } else {
                  result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected string');
                }
              } else {
                result.__xml__.error = new Error('End of data found, expected ident');
              }
            } else {
              result.__xml__.error = new Error('End of data found, expected ident');
            }
          } else {
            result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected =');
          }
        } else {
          result.__xml__.error = new Error('End of data found, expected =');
        }
      } else {
        result.__xml__.error = new Error('End of data found, expected =');
      }
    } else {
      result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected ident');
    }
  } else {
    result.__xml__.error = new Error('End of data found, expected ident');
  }

  result.__xml__.end = i;
  return result;
}
/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */


function matchBeginTag(tokens, i) {
  var result = {
    __xml__: {
      type: BEGIN_TAG,
      start: i
    }
  };
  var cToken;

  if (i < tokens.length) {
    cToken = tokens[i];

    if (cToken.matched['open']) {
      ++i;

      if (i < tokens.length) {
        cToken = tokens[i];

        if (cToken.matched['ident']) {
          result.tagName = cToken.text;
          ++i;

          if (i < tokens.length) {
            var finished = false; //when find the close symbol

            while (i < tokens.length) {
              cToken = tokens[i];

              if (cToken.matched['space']) {
                ++i;
              } //skip space between attributes


              if (i < tokens.length) {
                cToken = tokens[i];

                if (cToken.matched['shortClose']) {
                  result.__xml__.closed = true;
                  ++i;
                  finished = true;
                  break;
                } else if (cToken.matched['close']) {
                  result.__xml__.closed = false;
                  ++i;
                  finished = true;
                  break;
                } else if (tokens[i - 1].matched['space']) {
                  var assign = matchAssign(tokens, i);

                  if (!assign.__xml__.error) {
                    result.attributes = result.attributes || {};
                    result.attributes[assign.key] = assign.value;
                    i = assign.__xml__.end;
                  } else if (cToken.matched['ident']) {
                    result.attributes = result.attributes || {};
                    result.attributes[cToken.text] = true; // a flag

                    ++i;
                  } else {
                    //TODO: we can ignore some error here, the same with order Match* function
                    result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');
                    break;
                  }
                } else {
                  //TODO: we can ignore some error here
                  result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');
                  break;
                }
              } else {
                result.__xml__.error = new Error('End of data found, expected /> or >');
                break;
              }
            }

            if (!finished && !result.__xml__.error) {
              result.__xml__.error = new Error('End of data found, expected /> or >');
            }
          } else {
            result.__xml__.error = new Error('End of data found, expected /> or >');
          }
        } else {
          result.__xml__.error = new Error('Expected indent');
        }
      } else {
        result.__xml__.error = new Error('End of data found, expected indent');
      }

      result.__xml__.end = i;
    } else {
      result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected <');
    }
  } else {
    result.__xml__.error = new Error('End of data found, expected <');
  }

  result.__xml__.end = i;
  return result;
}
/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */


function matchEndTag(tokens, i) {
  var result = {
    __xml__: {
      type: END_TAG,
      closed: true,
      start: i
    }
  };
  var cToken;

  if (i < tokens.length) {
    cToken = tokens[i];

    if (cToken.matched['openEndTag']) {
      ++i;

      if (i < tokens.length) {
        cToken = tokens[i];

        if (cToken.matched['ident']) {
          result.tagName = cToken.text;
          ++i;

          if (i < tokens.length) {
            var finished = false; //when find the close symbol

            while (i < tokens.length) {
              cToken = tokens[i];

              if (cToken.matched['space']) {
                ++i;
              } //skip space between attributes


              if (i < tokens.length) {
                cToken = tokens[i];

                if (cToken.matched['close']) {
                  ++i;
                  finished = true;
                  break;
                } else if (tokens[i - 1].matched['space']) {
                  var assign = matchAssign(tokens, i);

                  if (!assign.__xml__.error) {
                    result.attributes = result.attributes || {};
                    result.attributes[assign.key] = assign.value;
                    i = assign.__xml__.end;
                  } else if (cToken.matched['ident']) {
                    result.attributes = result.attributes || {};
                    result.attributes[cToken.text] = true; // a flag

                    ++i;
                  } else {
                    result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');
                  }
                } else {
                  result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');
                }
              } else {
                result.__xml__.error = new Error('End of data found, expected /> or >');
              }
            }

            if (!finished && !result.__xml__.error) {
              result.__xml__.error = new Error('End of data found, expected /> or >');
            }
          } else {
            result.__xml__.error = new Error('End of data found, expected /> or >');
          }
        } else {
          result.__xml__.error = new Error('Expected indent');
        }
      } else {
        result.__xml__.error = new Error('End of data found, expected indent');
      }

      result.__xml__.end = i;
    } else {
      result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected <');
    }
  } else {
    result.__xml__.error = new Error('End of data found, expected <');
  }

  result.__xml__.end = i;
  return result;
}
/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */


function matchDeclaration(tokens, i) {
  var result = {
    __xml__: {
      type: DECLARATION,
      start: i
    }
  };
  var cToken;

  if (i < tokens.length) {
    cToken = tokens[i];

    if (cToken.matched['declarationOpen']) {
      ++i;

      if (i < tokens.length) {
        cToken = tokens[i];

        if (cToken.matched['ident']) {
          result.tagName = cToken.text;
          ++i;

          if (i < tokens.length) {
            var finished = false; //when find the close symbol

            while (i < tokens.length) {
              cToken = tokens[i];

              if (cToken.matched['space']) {
                ++i;
              } //skip space between attributes


              if (i < tokens.length) {
                cToken = tokens[i];

                if (cToken.matched['declarationClose']) {
                  result.__xml__.closed = false;
                  ++i;
                  finished = true;
                  break;
                } else if (tokens[i - 1].matched['space']) {
                  var assign = matchAssign(tokens, i);

                  if (!assign.__xml__.error) {
                    result.attributes = result.attributes || {};
                    result.attributes[assign.key] = assign.value;
                    i = assign.__xml__.end;
                  } else if (cToken.matched['ident']) {
                    result.attributes = result.attributes || {};
                    result.attributes[cToken.text] = true; // a flag

                    ++i;
                  } else {
                    result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');
                  }
                } else {
                  result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected > or indent');
                }
              } else {
                result.__xml__.error = new Error('End of data found, expected /> or >');
              }
            }

            if (!finished && !result.__xml__.error) {
              result.__xml__.error = new Error('End of data found, expected /> or >');
            }
          } else {
            result.__xml__.error = new Error('End of data found, expected /> or >');
          }
        } else {
          result.__xml__.error = new Error('Expected indent');
        }
      } else {
        result.__xml__.error = new Error('End of data found, expected indent');
      }

      result.__xml__.end = i;
    } else {
      result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected <');
    }
  } else {
    result.__xml__.error = new Error('End of data found, expected <');
  }

  result.__xml__.end = i;
  return result;
}
/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */


function matchCData(tokens, i) {
  var result = {
    __xml__: {
      type: CDATA,
      start: i
    }
  };
  var cToken;

  if (i < tokens.length) {
    cToken = tokens[i];

    if (cToken.matched['cdataOpen']) {
      ++i;
      result.text = '';
      var finished = false;

      while (i < tokens.length) {
        cToken = tokens[i];

        if (cToken.matched['cdataClose']) {
          finished = true;
          ++i;
          break;
        } else {
          result.text += cToken.text;
          ++i;
        }
      }

      if (!finished) {
        result.__xml__.error = new Error('End of data found, expected ]]>');
      }
    } else {
      result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected <![CDATA[');
    }
  } else {
    result.__xml__.error = new Error('End of data found, expected <![CDATA[');
  }

  result.__xml__.end = i;
  return result;
}
/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Number} i 
 * @returns {XMLParseNode}
 */


function matchComment(tokens, i) {
  var result = {
    __xml__: {
      type: COMMENT,
      start: i
    }
  };
  var cToken;

  if (i < tokens.length) {
    cToken = tokens[i];

    if (cToken.matched['commentOpen']) {
      ++i;
      result.text = '';
      var finished = false;

      while (i < tokens.length) {
        cToken = tokens[i];

        if (cToken.matched['commentClose']) {
          finished = true;
          ++i;
          break;
        } else {
          result.text += cToken.text;
          ++i;
        }
      }

      if (!finished) {
        result.__xml__.error = new Error('End of data found, expected -->');
      }
    } else {
      result.__xml__.error = new Error('"' + cToken.text + '"' + 'found, expected <!--');
    }
  } else {
    result.__xml__.error = new Error('End of data found, expected <!--');
  }

  result.__xml__.end = i;
  return result;
}
/**
 * 
 * @param {Token} tokens 
 */


function parseXMLTab(tokens) {
  var tabs = [];
  var i = 0;

  while (i < tokens.length) {
    var comment = matchComment(tokens, i);

    if (!comment.__xml__.error) {
      tabs.push(comment);
      i = comment.__xml__.end;
    } else {
      var declaration = matchDeclaration(tokens, i);

      if (!declaration.__xml__.error) {
        tabs.push(declaration);
        i = declaration.__xml__.end;
      } else {
        var begin = matchBeginTag(tokens, i);

        if (!begin.__xml__.error) {
          tabs.push(begin);
          i = begin.__xml__.end;
        } else {
          var end = matchEndTag(tokens, i);

          if (!end.__xml__.error) {
            tabs.push(end);
            i = end.__xml__.end;
          } else {
            var cdata = matchCData(tokens, i);

            if (!cdata.__xml__.error) {
              tabs.push(cdata);
              i = cdata.__xml__.end;
            } else {
              ++i; //skip
            }
          }
        }
      }
    }
  }

  return tabs;
}
/**
 * 
 * @param {Array<Token>} tokens 
 * @param {Array<XMLParseNode>} tabs 
 * @returns {Array<XMLParseNode>}
 */


function parseXMLText(tokens, tabs) {
  var texts = [];
  var ofs = 0;
  var text;
  var tab;

  for (var i = 0; i < tabs.length; ++i) {
    tab = tabs[i];

    if (tab.__xml__.start > ofs) {
      text = tokens.slice(ofs, tab.__xml__.start).map(function (token) {
        return token.text;
      }).join('').trim();
      if (text.length > 0) texts.push({
        __xml__: {
          type: TEXT,
          tokens: tokens,
          start: ofs,
          end: tab.__xml__.start
        },
        text: text
      });
    }

    ofs = tab.__xml__.end;
  }

  if (ofs < tokens.length) {
    text = tokens.slice(ofs).map(function (token) {
      return token.text;
    }).join('').trim();
    if (text.length > 0) texts.push({
      __xml__: {
        type: TEXT,
        tokens: tokens,
        start: ofs,
        end: tab.__xml__.start
      },
      text: text
    });
  }

  return texts;
}
/**
 * 
 * @param {Array<XMLParseNode>} tabs 
 * @param {Array<XMLParseNode>} texts 
 * @return {Array<XMLParseNode>}  
 */


function mergeNodes(tabs, texts) {
  var nodes = [];
  var choose;
  var iTabs = 0,
      iTexts = 0;
  var diTabs, diTexts;
  var minStart;

  do {
    choose = undefined;
    diTabs = 0, diTexts = 0;
    minStart = 100000000;

    if (iTabs < tabs.length) {
      choose = tabs[iTabs];
      minStart = choose.__xml__.start;
      diTabs = 1;
    }

    if (iTexts < texts.length && texts[iTexts].__xml__.start < minStart) {
      choose = texts[iTexts];
      minStart = choose.__xml__.start;
      diTabs = 0;
      diTexts = 1;
    }

    if (choose) {
      iTexts += diTexts;
      iTabs += diTabs;
      nodes.push(choose);
    }
  } while (choose);

  return nodes;
}
/**
 * 
 * @param {String} text 
 * @return {Array<XMLParseNode>} 
 */


function parseXMLTextToXMLParseNode(text) {
  text = text.trim();
  var tokens = xmlTokenize(text.trim());
  var tabs = parseXMLTab(tokens);
  var texts = parseXMLText(tokens, tabs);
  return mergeNodes(tabs, texts);
}
/**
 * 
 * @param {Array<XMLParseNode>} nodes
 * @returns {Array}
 */


function paresNodesToXMLs(nodes) {
  var node;
  var parentXMLElement = new _XMLElement["default"]();
  parentXMLElement.tagName = "FAKE_DOCUMENT";

  var assignAttributes = function assignAttributes(node, attributes) {
    Object.keys(attributes).forEach(function (key) {
      node.setAttribute(key, attributes[key]);
    });
  };

  var newXMLNode;

  for (var i = 0; i < nodes.length; ++i) {
    node = nodes[i];
    newXMLNode = undefined;

    switch (node.__xml__.type) {
      case DECLARATION:
        newXMLNode = new _XMLDeclarationNode["default"]();
        newXMLNode.tagName = node.tagName;
        if (node.attributes) assignAttributes(newXMLNode, node.attributes);
        parentXMLElement.appendChild(newXMLNode);
        break;

      case BEGIN_TAG:
        newXMLNode = new _XMLElement["default"]();
        newXMLNode.tagName = node.tagName;
        if (node.attributes) assignAttributes(newXMLNode, node.attributes);
        parentXMLElement.appendChild(newXMLNode);
        if (!node.__xml__.closed) parentXMLElement = newXMLNode;
        break;

      case END_TAG:
        if (parentXMLElement && node.tagName == parentXMLElement.tagName) {
          parentXMLElement = parentXMLElement.parentNode;
        } else if (parentXMLElement && (parentXMLElement.tagName == 'img' || parentXMLElement.tagName == 'input')) {
          // image can be not close
          while (parentXMLElement.tagName == 'img' || parentXMLElement.tagName == 'input') {
            parentXMLElement = parentXMLElement.parentNode;
          }

          parentXMLElement = parentXMLElement.parentNode;
        } else {
          throw new Error("Unknown close of tagName " + node.tagName + ', but ' + (parentXMLElement ? parentXMLElement.tagName : "EOF") + ' expected');
        }

        break;

      case TEXT:
        newXMLNode = new _XMLTextNode["default"](node.text);
        parentXMLElement.appendChild(newXMLNode);
        break;

      case COMMENT:
        newXMLNode = new _XMLCommentNode["default"](node.text);
        parentXMLElement.appendChild(newXMLNode);
        break;
    }
  }

  return parentXMLElement.childNodes.slice().map(function (e) {
    e.remove();
    return e;
  });
}
/**
 * 
 * @param {XMLElement} node 
 */


function makeOpenXMLElementTab(node) {
  var res = '<' + node.tagName;
  var attributesText = Object.keys(node.attributes).map(function (key) {
    var value = node.attributes[key];

    if (value === null) {
      return key;
    } else {
      return key + '=' + '"' + value + '"';
    }
  }).join(' ');

  if (attributesText.length > 0) {
    res += ' ' + attributesText;
  }

  res += '>';
  return res;
}
/**
 * 
 * @param {XMLDeclaretionNode} node 
 */


function makeXMLDeclaretionTab(node) {
  var res = '<?' + node.tagName;
  var attributesText = Object.keys(node.attributes).map(function (key) {
    var value = node.attributes[key];

    if (value === null) {
      return key;
    } else {
      return key + '=' + '"' + value + '"';
    }
  }).join(' ');

  if (attributesText.length > 0) {
    res += ' ' + attributesText;
  }

  res += '?>';
  return res;
}
/**
 * 
 * @param {XMLDeclaretionNode} node 
 */


function makeXMLCommentTab(node) {
  var res = '<!--' + node.data + '-->';
  return res;
}

var XML = {};
/**
 * @param {String} code
 * @returns {Array<XMLElement>}
 */

XML.parseLikeHTML = function (code) {
  var nodes = parseXMLTextToXMLParseNode(code); // console.log('nodes', nodes);

  var xmls = paresNodesToXMLs(nodes);
  return xmls;
};
/**
 * @param {String} code
 * @returns {XMLElement}
 */


XML.parse = function (code) {
  var xmls = this.parseLikeHTML(code);
  if (xmls.length == 0) return undefined;
  var obj = xmls[xmls.length - 1].toObject();
  return obj;
};

XML.DFNodeVisit = function (node, handlers, accumulator) {
  if (!node.childNodes || node.childNodes.length == 0) {
    if (handlers.leaf) handlers.leaf(accumulator, node);
  } else {
    if (handlers.open) handlers.open(accumulator, node);

    for (var i = 0; i < node.childNodes.length; ++i) {
      this.DFNodeVisit(node.childNodes[i], handlers, accumulator);
    }

    if (handlers.close) handlers.close(accumulator, node);
    return accumulator;
  }
};
/**
 * @typedef {Object} XMLBeautifyOption
 * @property {String} indent
 * @property {Number} initDepth 
 */

/**
 * @param {Array<XMLElement>} o 
 * @param {XMLBeautifyOption} beautifyOption 
 * 
 * 
 */


XML.stringify = function (o, beautifyOption) {
  var texts = [];
  var indent = '';
  var lineBreak = '';
  var depth = 0;

  if (beautifyOption) {
    lineBreak = '\n';
    indent = typeof beautifyOption.indent == 'string' ? beautifyOption.indent : '    ';
    depth = beautifyOption.initDepth || 0;
  }

  if (!(o instanceof Array)) {
    o = [o];
  }

  var visitor = {
    open: function open(ac, node) {
      var currentLineIndent = ac.lineIndentStack[ac.lineIndentStack.length - 1];
      var openTabText = makeOpenXMLElementTab(node);
      ac.texts.push(currentLineIndent + openTabText);
      ac.lineIndentStack.push(currentLineIndent + ac.indent);
    },
    close: function close(ac, node) {
      ac.lineIndentStack.pop();
      var currentLineIndent = ac.lineIndentStack[ac.lineIndentStack.length - 1];
      var endTab = '</' + node.tagName + '>';

      if (node.childNodes.length == 1 && node.childNodes[0].nodeType == _XMLConstant["default"].TYPE_TEXT) {
        ac.texts[ac.texts.length - 1] += endTab;
      } else {
        ac.texts.push(currentLineIndent + endTab);
      }
    },
    leaf: function leaf(ac, node) {
      var currentLineIndent = ac.lineIndentStack[ac.lineIndentStack.length - 1];
      var tab;

      if (node.nodeType == _XMLConstant["default"].TYPE_TEXT) {
        if (node.parentNode && node.parentNode.childNodes.length == 1) {
          ac.texts[ac.texts.length - 1] += node.data;
        } else {
          ac.texts.push(currentLineIndent + node.data);
        }
      } else if (node.nodeType == _XMLConstant["default"].TYPE_ELEMENT) {
        var openTabText = makeOpenXMLElementTab(node);
        var endTab = '</' + node.tagName + '>';
        ac.texts.push(currentLineIndent + openTabText + endTab);
      } else if (node.nodeType == _XMLConstant["default"].TYPE_DECLARATION) {
        tab = makeXMLDeclaretionTab(node);
        ac.texts.push(currentLineIndent + tab);
      } else if (node.nodeType == _XMLConstant["default"].TYPE_COMMENT) {
        tab = makeXMLCommentTab(node);
        ac.texts.push(currentLineIndent + tab);
      }
    }
  };

  for (var i = 0; i < o.length; ++i) {
    this.DFNodeVisit(o[i], visitor, {
      depth: 0,
      texts: texts,
      lineIndentStack: [''],
      indent: indent
    });
  }

  return texts.join(lineBreak);
};

var _default = XML;
exports["default"] = _default;