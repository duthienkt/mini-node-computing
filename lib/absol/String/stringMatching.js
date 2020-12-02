"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wordLike = wordLike;
exports.wordsMatch = wordsMatch;
exports.phraseMatch = phraseMatch;
exports.phraseLike = phraseLike;

var _int = require("absol/src/Math/int");

/**
 *
 * @param {String} a
 * @param {String} b
 */
function wordLike(a, b) {
  var m = a.length;
  var n = b.length;

  function map(i, j) {
    return i * (n + 1) + j;
  }

  var Q = Array((m + 1) * (n + 1)).fill(0);

  for (var i = 0; i < m; ++i) {
    for (var j = 0; j < n; ++j) {
      if (a.charAt(i) == b.charAt(j)) {
        if (Q[map(i + 1, j + 1)]) {
          if (Q[map(i + 1, j + 1)] < Q[map(i, j)] + 1) Q[map(i + 1, j + 1)] = Q[map(i, j)] + 1;
        } else Q[map(i + 1, j + 1)] = Q[map(i, j)] + 1;
      } else Q[map(i + 1, j + 1)] = Math.max(Q[map(i + 1, j)], Q[map(i, j + 1)]);
    }
  }

  return Q[map(m, n)] / (0, _int.harmonicMean)(m, n);
}
/**
 *
 * @param {Array<String>} sq1
 * @param {Array<String>} sq2
 */


function wordsMatch(sq1, sq2, matchWordPow) {
  matchWordPow = matchWordPow === undefined ? 1 : matchWordPow;
  var m = sq1.length;
  var n = sq2.length;

  function map(i, j) {
    return i * (n + 1) + j;
  }

  var Q = Array((m + 1) * (n + 1)).fill(0);
  var e = 0.0;

  for (var i = 0; i < m; ++i) {
    for (var j = 0; j < n; ++j) {
      e = Math.pow(wordLike(sq1[i], sq2[j]), matchWordPow);

      if (Q[map(i + 1, j + 1)]) {
        if (Q[map(i + 1, j + 1)] < Q[map(i, j)] + e) Q[map(i + 1, j + 1)] = Q[map(i, j)] + e;
      } else Q[map(i + 1, j + 1)] = Q[map(i, j)] + e;

      e = Math.max(Q[map(i + 1, j)], Q[map(i, j + 1)]);
      if (e > Q[map(i + 1, j + 1)]) Q[map(i + 1, j + 1)] = e;
    }
  }

  return Q[map(m, n)];
}

function phraseMatch(a, b, matchWordPow) {
  matchWordPow = matchWordPow || 1;
  var spliter = /[\s,-\.+?\_]+/;

  var notEmp = function notEmp(e) {
    return e.length > 0;
  };

  var sq1 = a.toLowerCase().split(spliter).filter(notEmp);
  var sq2 = b.toLowerCase().split(spliter).filter(notEmp);
  var wordsMatchScore = wordsMatch(sq1, sq2);
  var m = sq1.length;
  var n = sq2.length;
  return wordsMatchScore / Math.max((0, _int.harmonicMean)(m, n), 1);
}

;

function phraseLike(a, b, matchWordPow) {
  matchWordPow = matchWordPow || 1;
  var spliter = /[\s,-\.+?\_]+/;

  var notEmp = function notEmp(e) {
    return e.length > 0;
  };

  var sq1 = a.toLowerCase().split(spliter).filter(notEmp);
  var sq2 = b.toLowerCase().split(spliter).filter(notEmp);
  var m = sq1.length;
  var n = sq2.length;
  var wordsMatchScore = wordsMatch(sq1, sq2);
  return wordsMatchScore / Math.max((0, _int.harmonicMean)(m, n), 1);
}