"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseStyleAttr = parseStyleAttr;
exports.parseClassAttr = parseClassAttr;

/**
 * 
 * @param {String} text 
 *  @returns {Object}
 */
function parseStyleAttr(text) {
  return text.split(';').map(function (line) {
    var parts = line.split(':');
    if (parts.length < 2) return null;
    var key = parts.shift().trim();
    var value = parts.join(':').trim();
    if (key.length == 0 || value.length == 0) return null;
    return [key, value];
  }).filter(function (it) {
    return it != null;
  }).reduce(function (ac, cr) {
    ac[cr[0]] = cr[1];
    return ac;
  }, {});
}
/**
 * 
 * @param {String} text 
 *  @returns {Array<String>}
 */


function parseClassAttr(text) {
  return text.trim().split(/\s+/);
}