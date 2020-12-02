"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _EventEmitter = _interopRequireDefault(require("./EventEmitter"));

var _BrowserDetector = _interopRequireDefault(require("../Detector/BrowserDetector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***
 * @augments Node
 * @augments ChildNode
 * @augments Element
 * @augments HTMLElement
 * @augments EventEmitter
 * @augments ElementCSSInlineStyle
 * @constructor
 */
function AElement() {
  _EventEmitter["default"].call(this);

  this._azar_extendAttributes = this._azar_extendAttributes || {};
  this._azar_extendTags = {};
  this.eventHandler = {};
}

Object.defineProperties(AElement.prototype, Object.getOwnPropertyDescriptors(_EventEmitter["default"].prototype));

AElement.prototype.init = function (props) {
  Object.assign(this, props || {});
};

AElement.prototype.eventHandler = {};
/***
 * run super-class method
 */

AElement.prototype["super"] = function () {
  /* nope */
};
/**
 * @typedef {Object} AttributeDefiner
 * @property {Function} set
 * @property {Function} get
 * @property {Function} remove
 *
 * @param {String} key
 * @param {AttributeDefiner} def
 */


AElement.prototype.defineAttribute = function (key, def) {
  this._azar_extendAttributes[key] = def;
};

AElement.prototype.defineAttributes = function (defs) {
  for (var key in defs) {
    this.defineAttribute(key, defs[key]);
  }
};

AElement.prototype.attr = function () {
  if (arguments.length == 1) {
    if (typeof arguments[0] == 'string') {
      if (this._azar_extendAttributes[arguments[0]]) {
        return this._azar_extendAttributes[arguments[0]].get.call(this);
      } else return this.getAttribute(arguments[0]);
    } else {
      for (var key in arguments[0]) {
        this.attr(key, arguments[0][key]);
      }
    }
  } else {
    if (arguments.length == 2) {
      if (arguments[1] === null || arguments[1] === undefined) {
        if (this._azar_extendAttributes[arguments[0]]) {
          this._azar_extendAttributes[arguments[0]].remove.call(this, arguments[1]);
        } else this.removeAttribute(arguments[0]);
      } else {
        if (this._azar_extendAttributes[arguments[0]]) {
          this._azar_extendAttributes[arguments[0]].set.call(this, arguments[1]);
        } else {
          this.setAttribute(arguments[0], arguments[1]);
        }
      }
    }
  }

  return this;
};
/***
 * add style
 * @param {CSSStyleDeclaration|string|{}} arg0
 * @param {string} arg1
 * @returns {AElement}
 */

/**
 * add style
 * @param {CSSStyleDeclaration|string|{}} arg0
 * @returns {AElement}
 */


AElement.prototype.addStyle = function (arg0, arg1) {
  if (typeof arg0 == 'string') {
    if (arg0.indexOf('-') >= 0) {
      this.style.setProperty(arg0, arg1);
    } else {
      this.style[arg0] = arg1;
    }
  } else {
    for (var key in arg0) {
      this.addStyle(key, arg0[key]);
    }
  }
  return this;
};
/***
 *
 * @param {string|string[]|CSSStyleDeclaration} arg0
 * @returns {AElement}
 */


AElement.prototype.removeStyle = function (arg0) {
  var key;

  if (arg0.charAt) {
    if (arg0.indexOf('-') >= 0) {
      this.style.removeProperty(arg0);
    } else {
      this.style[arg0] = null;
      delete this.style[arg0];
    }
  } else {
    if (arg0.map && arg0.forEach) {
      for (var i = 0; i < arg0.length; ++i) {
        this.removeStyle(arg0[i]);
      }
    } else {
      for (key in arg0) {
        this.removeStyle(key);
      }
    }
  }

  return this;
};

AElement.prototype.addChild = function (child) {
  if (child.indexOf && child.map && child.forEach) {
    for (var i = 0; i < child.length; ++i) {
      this.appendChild(child[i]);
    }
  } else this.appendChild(child);

  return this;
};

AElement.prototype.addTo = function (parent) {
  if (parent && parent.appendChild) {
    if (parent.addChild) parent.addChild(this);else parent.appendChild(this);
  } else throw Error("Can not append to " + parent + "!");

  return this;
};

AElement.prototype.selfRemove = function () {
  if (this.parentElement) this.parentElement.removeChild(this);
  return this;
};

AElement.prototype.selfReplace = function (newNode) {
  if (this.parentElement) this.parentElement.replaceChild(newNode, this);
  return this;
};

AElement.prototype.clearChild = function () {
  while (this.firstChild) {
    this.removeChild(this.firstChild);
  }

  return this;
};
/**
 *
 * @param {string|Array} className
 * @returns {Boolean}
 */


AElement.prototype.containsClass = function (className) {
  if (className.forEach && className.map) {
    for (var i = 0; i < className.length; ++i) {
      if (!this.classList.containsClass(className[i])) return false;
    }

    return true;
  } else return this.classList.contains(className);
};
/**
 *
 * @param {string|Array} className
 * @returns {AElement}
 */


AElement.prototype.addClass = function (className) {
  if (className && className.forEach && className.map) {
    for (var i = 0; i < className.length; ++i) {
      this.classList.add(className[i]);
    }
  } else this.classList.add(className);

  return this;
};
/**
 *
 * @param {string|Array} className
 * @returns {AElement}
 */


AElement.prototype.removeClass = function (className) {
  if (className && className.forEach && className.map) {
    for (var i = 0; i < className.length; ++i) {
      this.classList.remove(className[i]);
    }
  } else this.classList.remove(className);

  return this;
};

AElement.prototype.getComputedStyleValue = function (key) {
  return window.getComputedStyle(this).getPropertyValue(key);
};

AElement.prototype.getFontSize = function () {
  return parseFloat(this.getComputedStyleValue('font-size').replace('px', ''));
};

AElement.prototype.findChildAfter = function (obj) {
  var r = 0;

  for (var i = 0; i < this.childNodes.length; ++i) {
    if (obj == this.childNodes[i]) {
      r = i + 1;
      break;
    }
  }

  if (this.childNodes[r]) return this.childNodes[r];
  return undefined;
};

AElement.prototype.findChildBefore = function (obj) {
  var r = 0;

  for (var i = 0; i < this.childNodes.length; ++i) {
    if (obj == this.childNodes[i]) {
      r = i - 1;
      break;
    }
  }

  if (this.childNodes[r]) return this.childNodes[r];
  return undefined;
};

AElement.prototype.addChildBefore = function (newItem, bf) {
  this.insertBefore(newItem, bf);
  return this;
};

AElement.prototype.addChildAfter = function (newItem, at) {
  var bf = this.findChildAfter(at);
  if (bf) return this.addChildBefore(newItem, bf);
  return this.addChild(newItem);
};
/**
 * @returns {DOMRect}
 */


AElement.prototype.getBoundingRecursiveRect = function (depth) {
  if (depth === undefined) depth = 10000;
  var current, next;
  var oo = 1000000;
  var ac = {
    left: oo,
    right: -oo,
    top: oo,
    bottom: -oo,
    width: 0,
    height: 0
  };
  var stacks = [{
    e: this,
    d: 0
  }];

  while (stacks.length > 0) {
    current = stacks.pop();

    if (current.e.getBoundingClientRect) {
      var cRect = current.e.getBoundingClientRect();
      if (!cRect || !(cRect.width || cRect.height || cRect.left || cRect.right)) continue;
      ac.left = Math.min(ac.left, cRect.left);
      ac.top = Math.min(ac.top, cRect.top);
      ac.bottom = Math.max(ac.bottom, cRect.bottom);
      ac.right = Math.max(ac.right, cRect.right);
      ac.height = ac.bottom - ac.top;
      ac.width = ac.right - ac.left;
      var childNodes = current.e.childNodes;

      if (childNodes && childNodes.length > 0 && current.d < depth) {
        for (var i = 0; i < childNodes.length; ++i) {
          next = {
            e: childNodes[i],
            d: current.d + 1
          };
          stacks.push(next);
        }
      }
    }
  }

  return ac;
};
/***
 *
 * @param parent
 * @returns {boolean}
 */


AElement.prototype.isDescendantOf = function (parent) {
  var child = this;

  while (child) {
    if (child === parent) return true;
    child = child.parentNode;
  }

  return false;
};
/*************************** **********************/


AElement.prototype.getCSSRules = function () {
  var sheets = document.styleSheets;
  var ret = [];
  this.matches = this.matches || this.webkitMatchesSelector || this.mozMatchesSelector || this.msMatchesSelector || this.oMatchesSelector;

  for (var i in sheets) {
    if (sheets[i].href) continue; //because can not access, you must clone link node instead

    var rules = sheets[i].rules || sheets[i].cssRules;

    for (var r in rules) {
      if (this.matches(rules[r].selectorText)) {
        ret.push(rules[r]);
      }
    }
  }

  return ret;
};
/***
 * @returns {Promise}
 */


AElement.prototype.afterAttached = function () {
  if (this.isDescendantOf(document.body)) return Promise.resolve();
  var attachHookElt = this.$attachhook || this.querySelector('.absol-attachhook');

  if (!attachHookElt) {
    attachHookElt = document.createElement('img');
    attachHookElt.src = '';
    var prototypes = Object.getOwnPropertyDescriptors(AElement.prototype);
    Object.defineProperties(attachHookElt, prototypes);
    AElement.call(attachHookElt);
    attachHookElt.defineEvent('attached');
    this.$attachhook = attachHookElt;
    this.$attachhook.on('error', function (event) {
      if (this.isDescendantOf(document.body)) this.emit('attached', event, this);
    });
    this.appendChild(attachHookElt);
  }

  return new Promise(function (rs) {
    attachHookElt.once('attached', rs);
  });
};
/***
 * WARNING: this function may be unsafe
 */


AElement.prototype.afterDisplayed = function (requestTimesOut) {
  if (!requestTimesOut) requestTimesOut = 24 * 3600 * 33; // var tracer = new Error();

  var current = this;
  return new Promise(function (resolve, reject) {
    function trace() {
      if (requestTimesOut < 0) {// reject(tracer);
        // if (absol.BUILD && absol.BUILD.version == "DEBUG")
        //     console.warn("Element not displayed", trace);
      } else {
        requestTimesOut--;
        var bound = current.getBoundingClientRect();

        if (bound.width > 0 || bound.height > 0) {
          resolve();
        } else {
          setTimeout(trace, 33);
          return;
        }
      }
    }

    trace();
  });
};

!function () {
  var origin = AElement.prototype.on;

  if (_BrowserDetector["default"].isSafari && !_BrowserDetector["default"].isMobile) {
    AElement.prototype.on = function () {
      if (!this.isSupportedEvent('mouseleave') && arguments[0] == 'mouseleave') {
        this.defineEvent('mouseleave');

        var mouseLeaveEventHandler = function mouseLeaveEventHandler(event) {
          var bound = this.getBoundingClientRect();
          var ok = false;
          ok |= event.clientX < bound.left + 1;
          ok |= event.clientX >= bound.right - 1;
          ok |= event.clientY < bound.top + 1;
          ok |= event.clientY >= bound.bottom - 1;
          if (ok) this.emit('mouseleave', event);
        };

        this.addEventListener('mouseleave', mouseLeaveEventHandler, true);
      }

      origin.apply(this, arguments);
      return this;
    };
  }

  if (_BrowserDetector["default"].isFirefox) {
    AElement.prototype.on = function () {
      if (!this.isSupportedEvent('wheel') && arguments[0] == 'wheel') {
        this.defineEvent('wheel');

        var wheelEventHandler = function wheelEventHandler(oldEvent) {
          //clone event to avoid some lib fix it
          var event = oldEvent.absolEvent;

          if (!event) {
            event = Object.assign({}, oldEvent);

            for (var i = 0; i < AElement.eventProperties.length; ++i) {
              var key = AElement.eventProperties[i];

              if (typeof event[key] == 'function') {
                event[key] = event[key].bind(oldEvent);
              }
            }

            event.preventDefault = function () {
              oldEvent.preventDefault();
            };

            if (!event.mozFixWheelScale) {
              event.mozDeltaY = oldEvent.deltaY;
              event.mozFixWheelScale = true;
              Object.defineProperty(event, 'deltaY', {
                get: function get() {
                  return this.mozDeltaY * 100 / 3;
                }
              });
            }

            oldEvent.absolEvent = event;
          }

          this.emit('wheel', event);
        };

        this.addEventListener('wheel', wheelEventHandler);
      }

      origin.apply(this, arguments);
      return this;
    };
  }
}();
AElement.eventProperties = ["altKey", "bubbles", "button", "buttons", "cancelBubble", "cancelable", "clientX", "clientY", "composed", "ctrlKey", "currentTarget", "defaultPrevented", "deltaMode", "deltaX", "deltaY", "deltaZ", "detail", "eventPhase", "explicitOriginalTarget", "isTrusted", "layerX", "layerY", "metaKey", "movementX", "movementY", "mozInputSource", "mozPressure", "offsetX", "offsetY", "originalTarget", "pageX", "pageY", "rangeOffset", "rangeParent", "region", "relatedTarget", "returnValue", "screenX", "screenY", "shiftKey", "srcElement", "target", "timeStamp", "type", "deltaMode", "deltaX", "deltaY", "deltaZ"];
var _default = AElement;
exports["default"] = _default;