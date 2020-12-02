"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _base = require("../Converter/base64");

function CookieStore(converter) {
  this.converter = converter || _base.UnicodeBase64Converter;
}

CookieStore.prototype.isEnabled = function () {
  var cookieEnabled = !!navigator.cookieEnabled; //if not IE4+ nor NS6+

  if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
    document.cookie = "testcookie_enabled";
    cookieEnabled = document.cookie.indexOf("testcookie_enabled") != -1;
  }

  return cookieEnabled;
};

CookieStore.prototype.secure = function () {
  document.cookie = "secure";
};

CookieStore.prototype.get = function (key) {
  var bkey = this.converter.encode(key).replace(/=/g, '_');
  var pairs = document.cookie.split(';').map(function (text) {
    return text.split('=');
  }).filter(function (pair) {
    return pair[0].trim() == bkey;
  });

  if (pairs.length > 0) {
    if (pairs[0].length > 1) {
      var bvalue = pairs[0][1];
      return this.converter.decode(bvalue.replace(/_/g, '=').trim());
    } else {
      return true;
    }
  } else return undefined;
};

CookieStore.prototype.set = function (key, value) {
  var bkey = this.converter.encode(key);
  var bvalue = this.converter.encode(value);
  document.cookie = bkey.replace(/=/g, '_') + "=" + bvalue.replace(/=/g, '_');
};

var _default = new CookieStore();

exports["default"] = _default;