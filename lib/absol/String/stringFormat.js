"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapToLines = wrapToLines;
exports.nonAccentVietnamese = nonAccentVietnamese;
exports.pascalCaseToCamelCase = pascalCaseToCamelCase;
exports.kebabCaseToCamelCase = kebabCaseToCamelCase;
exports.underScoreToCamelCase = underScoreToCamelCase;
exports.camelCaseToPascalCase = camelCaseToPascalCase;
exports.underScoreToPascalCase = underScoreToPascalCase;
exports.kebabCaseToPascalCase = kebabCaseToPascalCase;
exports.pascalCaseToKebabCase = pascalCaseToKebabCase;
exports.camelCaseToKebabCase = camelCaseToKebabCase;
exports.underScoreToKebabCase = underScoreToKebabCase;
exports.pascalCaseToUnderScore = pascalCaseToUnderScore;
exports.pascalCaseToUpperUnderScore = pascalCaseToUpperUnderScore;
exports.camelCaseToUnderScore = camelCaseToUnderScore;
exports.camelCaseToUpperUnderScore = camelCaseToUpperUnderScore;
exports.kebabCaseToUnderScore = kebabCaseToUnderScore;
exports.kebabCaseToUpperUnderScore = kebabCaseToUpperUnderScore;

/**
 * 
 * @param {String} s 
 * @param {Number} maxLength 
 */
function wrapToLines(s, maxLength) {
  var res = [];
  var currentWord = '';
  var currentLine = '';

  for (var i = 0; i < s.length; ++i) {
    if (s[i].match(/\s/)) {
      if (currentWord.length + currentLine.length >= maxLength) {
        if (currentLine.length > 0) {
          res.push(currentLine.trim());
          currentLine = '';
          currentWord = currentWord.trimLeft() + s[i];
        } else {
          currentLine = currentLine + currentWord;
          res.push(currentLine.trim());
          currentLine = '';
          currentWord = '';
        }
      } else {
        currentLine = currentLine + currentWord;
        currentWord = s[i];
      }
    } else {
      currentWord = currentWord + s[i];
    }
  }

  currentLine = (currentLine + currentWord).trim();
  if (currentLine.length > 0) res.push(currentLine);
  return res;
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function nonAccentVietnamese(s) {
  return s.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a").replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A").replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e").replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E").replace(/ì|í|ị|ỉ|ĩ/g, "i").replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I").replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o").replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O").replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u").replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U").replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y").replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "").replace(/\u02C6|\u0306|\u031B/g, "");
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function pascalCaseToCamelCase(s) {
  return s.substr(0, 1).toLowerCase() + s.substr(1);
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function kebabCaseToCamelCase(s) {
  return s.replace(/-+([^-])/g, function (full, c) {
    return c.toUpperCase();
  });
}
/**
 * 
 * @param {String} s 
 * @returns {String} 
 */


function underScoreToCamelCase(s) {
  return s.replace(/(_+)?([^_]+)/g, function (full, underscore, word) {
    if (underscore) {
      if (word) {
        return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
      } else return '';
    } else {
      return word.toLowerCase();
    }

    ;
  });
}
/**
 * 
 * @param {String} s 
 * @returns {String} 
 */


function camelCaseToPascalCase(s) {
  return s.substr(0, 1).toUpperCase() + s.substr(1);
}
/**
 * 
 * @param {String} s 
 * @returns {String} 
 */


function underScoreToPascalCase(s) {
  return s.replace(/(_+|^)?([^_]+)/g, function (full, underscore, word) {
    return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
  });
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function kebabCaseToPascalCase(s) {
  return s.replace(/(-+|^)([^-])/g, function (full, u, c) {
    return c.toUpperCase();
  });
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function pascalCaseToKebabCase(s) {
  return s.replace(/[A-Z][^A-Z]*/g, function (full, index) {
    if (index == 0) return full.toLowerCase();
    return '-' + full.toLowerCase();
  });
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function camelCaseToKebabCase(s) {
  return s.replace(/(^|[A-Z])[^A-Z]*/g, function (full, index) {
    if (index == 0) return full.toLowerCase();
    return '-' + full.toLowerCase();
  });
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function underScoreToKebabCase(s) {
  return s.replace(/(^|_+)([^_]+)/g, function (full, score, word, index) {
    if (index == 0) return word.toLowerCase();
    return '-' + word.toLowerCase();
  });
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function pascalCaseToUnderScore(s) {
  return s.replace(/[A-Z][^A-Z]*/g, function (full, index) {
    if (index == 0) return full.toLowerCase();
    return '_' + full.toLowerCase();
  });
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function pascalCaseToUpperUnderScore(s) {
  return s.replace(/[A-Z][^A-Z]*/g, function (full, index) {
    if (index == 0) return full.toUpperCase();
    return '_' + full.toUpperCase();
  });
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function camelCaseToUnderScore(s) {
  return s.replace(/(^|[A-Z])[^A-Z]*/g, function (full, index) {
    if (index == 0) return full.toLowerCase();
    return '_' + full.toLowerCase();
  });
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function camelCaseToUpperUnderScore(s) {
  return s.replace(/(^|[A-Z])[^A-Z]*/g, function (full, index) {
    if (index == 0) return full.toUpperCase();
    return '_' + full.toUpperCase();
  });
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function kebabCaseToUnderScore(s) {
  return s.replace(/(-+|^)([^-]+)/g, function (full, u, word, index) {
    if (index == 0) return word.toLowerCase();
    return '_' + word.toLowerCase();
  });
}
/**
 * 
 * @param {String} s
 * @returns {String} 
 */


function kebabCaseToUpperUnderScore(s) {
  return s.replace(/(-+|^)([^-]+)/g, function (full, u, word, index) {
    if (index == 0) return word.toUpperCase();
    return '_' + word.toUpperCase();
  });
}

String.nonAccentVietnamese = nonAccentVietnamese;

String.prototype.nonAccentVietnamese = function () {
  return String.nonAccentVietnamese(this);
};