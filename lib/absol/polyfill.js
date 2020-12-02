"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, n) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? n() : "function" == typeof define && define.amd ? define(n) : n();
}(0, function () {
  "use strict";

  function e(e) {
    var n = this.constructor;
    return this.then(function (t) {
      return n.resolve(e()).then(function () {
        return t;
      });
    }, function (t) {
      return n.resolve(e()).then(function () {
        return n.reject(t);
      });
    });
  }

  function n() {}

  function t(e) {
    if (!(this instanceof t)) throw new TypeError("Promises must be constructed via new");
    if ("function" != typeof e) throw new TypeError("not a function");
    this._state = 0, this._handled = !1, this._value = undefined, this._deferreds = [], u(e, this);
  }

  function o(e, n) {
    for (; 3 === e._state;) {
      e = e._value;
    }

    0 !== e._state ? (e._handled = !0, t._immediateFn(function () {
      var t = 1 === e._state ? n.onFulfilled : n.onRejected;

      if (null !== t) {
        var o;

        try {
          o = t(e._value);
        } catch (f) {
          return void i(n.promise, f);
        }

        r(n.promise, o);
      } else (1 === e._state ? r : i)(n.promise, e._value);
    })) : e._deferreds.push(n);
  }

  function r(e, n) {
    try {
      if (n === e) throw new TypeError("A promise cannot be resolved with itself.");

      if (n && ("object" == _typeof(n) || "function" == typeof n)) {
        var o = n.then;
        if (n instanceof t) return e._state = 3, e._value = n, void f(e);
        if ("function" == typeof o) return void u(function (e, n) {
          return function () {
            e.apply(n, arguments);
          };
        }(o, n), e);
      }

      e._state = 1, e._value = n, f(e);
    } catch (r) {
      i(e, r);
    }
  }

  function i(e, n) {
    e._state = 2, e._value = n, f(e);
  }

  function f(e) {
    2 === e._state && 0 === e._deferreds.length && t._immediateFn(function () {
      e._handled || t._unhandledRejectionFn(e._value);
    });

    for (var n = 0, r = e._deferreds.length; r > n; n++) {
      o(e, e._deferreds[n]);
    }

    e._deferreds = null;
  }

  function u(e, n) {
    var t = !1;

    try {
      e(function (e) {
        t || (t = !0, r(n, e));
      }, function (e) {
        t || (t = !0, i(n, e));
      });
    } catch (o) {
      if (t) return;
      t = !0, i(n, o);
    }
  }

  var c = setTimeout;
  t.prototype["catch"] = function (e) {
    return this.then(null, e);
  }, t.prototype.then = function (e, t) {
    var r = new this.constructor(n);
    return o(this, new function (e, n, t) {
      this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, this.promise = t;
    }(e, t, r)), r;
  }, t.prototype["finally"] = e, t.all = function (e) {
    return new t(function (n, t) {
      function o(e, f) {
        try {
          if (f && ("object" == _typeof(f) || "function" == typeof f)) {
            var u = f.then;
            if ("function" == typeof u) return void u.call(f, function (n) {
              o(e, n);
            }, t);
          }

          r[e] = f, 0 == --i && n(r);
        } catch (c) {
          t(c);
        }
      }

      if (!e || "undefined" == typeof e.length) throw new TypeError("Promise.all accepts an array");
      var r = Array.prototype.slice.call(e);
      if (0 === r.length) return n([]);

      for (var i = r.length, f = 0; r.length > f; f++) {
        o(f, r[f]);
      }
    });
  }, t.resolve = function (e) {
    return e && "object" == _typeof(e) && e.constructor === t ? e : new t(function (n) {
      n(e);
    });
  }, t.reject = function (e) {
    return new t(function (n, t) {
      t(e);
    });
  }, t.race = function (e) {
    return new t(function (n, t) {
      for (var o = 0, r = e.length; r > o; o++) {
        e[o].then(n, t);
      }
    });
  }, t._immediateFn = "function" == typeof setImmediate && function (e) {
    setImmediate(e);
  } || function (e) {
    c(e, 0);
  }, t._unhandledRejectionFn = function (e) {
    void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", e);
  };

  var l = function () {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if ("undefined" != typeof global) return global;
    throw Error("unable to locate global object");
  }();

  "Promise" in l ? l.Promise.prototype["finally"] || (l.Promise.prototype["finally"] = e) : l.Promise = t;
});
!function () {
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
    var id = window.setTimeout(function () {
      callback(element);
    }, 1000 / 60);
    return id;
  };
  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}(); //Object

(function () {
  'use strict';

  var ObjectProto = Object.prototype,
      defineGetter = ObjectProto.__defineGetter__,
      defineSetter = ObjectProto.__defineSetter__,
      lookupGetter = ObjectProto.__lookupGetter__,
      lookupSetter = ObjectProto.__lookupSetter__,
      hasOwnProp = ObjectProto.hasOwnProperty;
  var supportDom = true;

  try {
    if (Object.defineProperty) {
      Object.defineProperty(document.createElement('div'), 'theRandomName', {
        set: function set() {},
        get: function get() {}
      });
    }
  } catch (error) {
    supportDom = false;
  }

  if ((!supportDom || !Object.defineProperty) && defineGetter && defineSetter && lookupGetter && lookupSetter) {
    var originObjetDefineProperty = Object.defineProperty;

    Object.defineProperty = function (obj, prop, descriptor) {
      if (!originObjetDefineProperty || typeof obj.nodeType === "number" && typeof obj.nodeName === "string") {
        if (arguments.length < 3) {
          // all arguments required
          throw new TypeError("Arguments not optional");
        }

        prop += ""; // convert prop to string

        if (hasOwnProp.call(descriptor, "value")) {
          if (!lookupGetter.call(obj, prop) && !lookupSetter.call(obj, prop)) {
            // data property defined and no pre-existing accessors
            obj[prop] = descriptor.value;
          }

          if (hasOwnProp.call(descriptor, "get") || hasOwnProp.call(descriptor, "set")) {
            // descriptor has a value prop but accessor already exists
            throw new TypeError("Cannot specify an accessor and a value");
          }
        }

        if (descriptor.get) {
          defineGetter.call(obj, prop, descriptor.get);
        }

        if (descriptor.set) {
          defineSetter.call(obj, prop, descriptor.set);
        }

        return obj;
      } else {
        return originObjetDefineProperty.call(this, obj, prop, descriptor);
      }
    };

    var originObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    Object.getOwnPropertyDescriptor = function (obj, prop) {
      if (!originObjectGetOwnPropertyDescriptor || typeof obj.nodeType === "number" && typeof obj.nodeName === "string") {
        if (arguments.length < 2) {
          // all arguments required
          throw new TypeError("Arguments not optional.");
        }

        prop += ""; // convert prop to string

        var descriptor = {
          configurable: true,
          enumerable: true,
          writable: true
        },
            getter = lookupGetter.call(obj, prop),
            setter = lookupSetter.call(obj, prop);

        if (!hasOwnProp.call(obj, prop)) {
          // property doesn't exist or is inherited
          return descriptor;
        }

        if (!getter && !setter) {
          // not an accessor so return prop
          descriptor.value = obj[prop];
          return descriptor;
        } // there is an accessor, remove descriptor.writable;
        // populate descriptor.get and descriptor.set (IE's behavior)


        delete descriptor.writable;
        descriptor.get = descriptor.set = undefined;

        if (getter) {
          descriptor.get = getter;
        }

        if (setter) {
          descriptor.set = setter;
        }

        return descriptor;
      } else {
        return originObjectGetOwnPropertyDescriptor(obj, prop);
      }
    };
  }

  if (!supportDom || !Object.getOwnPropertyDescriptors) {
    Object.getOwnPropertyDescriptors = function (o) {
      var res = {};

      for (var key in o) {
        res[key] = Object.getOwnPropertyDescriptor(o, key);
      }

      return res;
    };
  }

  if (!supportDom || !Object.defineProperties) {
    Object.defineProperties = function (obj, props) {
      var prop;

      for (prop in props) {
        if (hasOwnProp.call(props, prop)) {
          Object.defineProperty(obj, prop, props[prop]);
        }
      }
    };
  }

  if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) {
      'use strict';

      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    };
  }
})(); //string


!function () {
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }
}(); //array

!function () {
  if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
      value: function value(_value) {
        // Steps 1-2.
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }

        var O = Object(this); // Steps 3-5.

        var len = O.length >>> 0; // Steps 6-7.

        var start = arguments[1];
        var relativeStart = start >> 0; // Step 8.

        var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len); // Steps 9-10.

        var end = arguments[2];
        var relativeEnd = end === undefined ? len : end >> 0; // Step 11.

        var _final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len); // Step 12.


        while (k < _final) {
          O[k] = _value;
          k++;
        } // Step 13.


        return O;
      }
    });
  }

  if (!Array.prototype.some) {
    Array.prototype.some = function (fun
    /*, thisp */
    ) {
      "use strict";

      if (this == null) throw new TypeError();
      var t = Object(this),
          len = t.length >>> 0;
      if (typeof fun != "function") throw new TypeError();
      var thisp = arguments[1];

      for (var i = 0; i < len; i++) {
        if (i in t && fun.call(thisp, t[i], i, t)) return true;
      }

      return false;
    };
  }
}(); //function

!function () {
  if (!Function.prototype.bind) {
    var ArrayPrototypeSlice = Array.prototype.slice;

    Function.prototype.bind = function (otherThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var baseArgs = ArrayPrototypeSlice.call(arguments, 1),
          baseArgsLength = baseArgs.length,
          fToBind = this,
          fNOP = function fNOP() {},
          fBound = function fBound() {
        baseArgs.length = baseArgsLength; // reset to default base arguments

        baseArgs.push.apply(baseArgs, arguments);
        return fToBind.apply(fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs);
      };

      if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        fNOP.prototype = this.prototype;
      }

      fBound.prototype = new fNOP();
      return fBound;
    };
  }
}();