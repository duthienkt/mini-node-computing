"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseCookieString;

/***
 *
 * @param {string} text
 * @return {{}}
 */
function parseCookieString(text) {
  return text.split(/\s*;\s*/).reduce(function (ac, item) {
    var tokens = item.split('=');
    var name = (tokens.shift() || '').trim();
    if (!name) return ac;
    var value = (tokens.shift() || '').trim();
    if (!value) value = true;
    ac[name] = value;
    return ac;
  }, {});
}