"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64EncodeUnicode = base64EncodeUnicode;
exports.base64DecodeUnicode = base64DecodeUnicode;
exports.UnicodeBase64Converter = void 0;

function base64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

;

function base64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

var UnicodeBase64Converter = {
  encode: base64EncodeUnicode,
  decode: base64DecodeUnicode
};
exports.UnicodeBase64Converter = UnicodeBase64Converter;