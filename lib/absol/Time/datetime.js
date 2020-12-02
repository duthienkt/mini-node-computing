"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ddmmyyyy = ddmmyyyy;
exports.yyymmdd = yyymmdd;
exports.formartDateString = formartDateString;
exports.parseDateString = parseDateString;
exports.prevDate = prevDate;
exports.nextDate = nextDate;
exports.beginOfHour = beginOfHour;
exports.beginOfDay = beginOfDay;
exports.beginOfWeek = beginOfWeek;
exports.beginOfMonth = beginOfMonth;
exports.beginOfYear = beginOfYear;
exports.compareDate = compareDate;
exports.compareMonth = compareMonth;
exports.compareYear = compareYear;
exports.nextMonth = nextMonth;
exports.prevMonth = prevMonth;
exports.daysInMonth = daysInMonth;
exports.formatTokenRegex = exports.shortMonthNames = exports.monthNames = exports.shortDayNames = exports.dayNames = exports.MILLIS_PER_MINUTE = exports.MILLIS_PER_HOUR = exports.MILLIS_PER_DAY = void 0;

var _stringFormat = require("../String/stringFormat");

var MILLIS_PER_DAY = 24 * 3600000;
exports.MILLIS_PER_DAY = MILLIS_PER_DAY;
var MILLIS_PER_HOUR = 3600000;
exports.MILLIS_PER_HOUR = MILLIS_PER_HOUR;
var MILLIS_PER_MINUTE = 60000;
/**
 * 
 * @param {Date} date 
 * @returns {String}
 */

exports.MILLIS_PER_MINUTE = MILLIS_PER_MINUTE;

function ddmmyyyy(date) {
  var mm = date.getMonth() + 1; // getMonth() is zero-based

  var dd = date.getDate();
  return [(dd > 9 ? '' : '0') + dd, (mm > 9 ? '' : '0') + mm, date.getFullYear()].join('/');
}

;
/**
 * 
 * @param {Date} date
 * @returns {String} 
 */

function yyymmdd(date) {
  var mm = date.getMonth() + 1; // getMonth() is zero-based

  var dd = date.getDate();
  return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('/');
}

;
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
exports.dayNames = dayNames;
var shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
exports.shortDayNames = shortDayNames;
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
exports.monthNames = monthNames;
var shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
exports.shortMonthNames = shortMonthNames;
var formatTokenRegex = /([,\.\-\/])|([a-zA-Z0-9]+)/g; //more

/**
 * 
 * @param {Date} date 
 * @param {String} format 
 * @returns {String}
 */

exports.formatTokenRegex = formatTokenRegex;

function formartDateString(date, format) {
  format = format || 'dd/mm/yyyy';
  var dt = date.getDate();
  var day = date.getDay();
  var month = date.getMonth();
  var year = date.getFullYear();
  return format.replace(formatTokenRegex, function (x) {
    switch (x) {
      case "dddd":
        return dayNames[day];

      case "ddd":
        return shortDayNames[day];

      case "dd":
        return dt < 10 ? '0' + dt : '' + dt;

      case "d":
        return '' + dt;

      case "mmmm":
        return monthNames[month];

      case "mmm":
        return shortMonthNames[month];

      case "mm":
        return month + 1 < 10 ? '0' + (month + 1) : '' + (month + 1);

      case "m":
        return '' + (month + 1);

      case 'yy':
        return (year + '').match(/..$/)[0];

      case 'yyyy':
        return year + '';

      default:
        return x;
    }
  });
}

;
/**
 *
 * @param {String} text
 * @param {String} format
 * @returns {String}
 */

function parseDateString(text, format) {
  text = (0, _stringFormat.nonAccentVietnamese)(text).toLowerCase();
  format = (0, _stringFormat.nonAccentVietnamese)(format).toLowerCase();
  var textTokens = text.match(formatTokenRegex) || [];
  var formatTokens = format.match(formatTokenRegex) || [];
  var year = NaN;
  var month = NaN;
  var day = NaN;
  var n = Math.min(textTokens.length, formatTokens.length);
  var textToken;
  var formatToken;

  for (var i = 0; i < n; ++i) {
    textToken = textTokens[i];
    formatToken = formatTokens[i];

    switch (formatToken) {
      case "dd":
        day = parseInt(textToken);
        break;

      case "d":
        day = parseInt(textToken);
        break;

      case "mmmm":
        month = monthNames.indexOf(textToken.substr(0, 1).toUpperCase() + textToken.substr(1).toLowerCase());
        break;

      case "mmm":
        month = shortMonthNames.indexOf(textToken.substr(0, 1).toUpperCase() + textToken.substr(1).toLowerCase());
        break;

      case "mm":
        month = parseInt(textToken) - 1;
        break;

      case "m":
        month = parseInt(textToken) - 1;
        break;

      case 'yy':
        year = Math.floor(new Date().getFullYear() / 100) * 100 + parseInt(textToken);
        break;

      case 'yyyy':
        year = parseInt(textToken);
        break;

      default:
        if (textToken != formatToken) throw new Error('Unexpected token ' + textToken);
    }
  }

  if (isNaN(year)) throw new Error('Invalid year');

  if (isNaN(month) && month != -1) {
    throw new Error('Invalid month');
  } else {
    month = Math.max(0, Math.min(11, month));
  }

  if (!isNaN(day)) {
    day = Math.max(1, Math.min(31, day));

    if (!isNaN(month)) {
      day = Math.min(daysInMonth(2000, month), day);
      if (!isNaN(year)) day = Math.min(daysInMonth(year, month), day);
    }
  } else {
    throw new Error('Invalid day');
  }

  return new Date(year, month, day, 0, 0, 0, 0);
}
/**
 * @param {Date} date
 * @return {Date}  
 */


function prevDate(date) {
  return new Date(date.getTime() - 86400000);
}

;
/**
 * @param {Date} date
 * @return {Date}  
 */

function nextDate(date) {
  return new Date(date.getTime() + 86400000);
}

;
/**
 * @param {Date} date
 * @return {Date} date at 00:00 
 */

function beginOfHour(date) {
  var res = new Date(date.getTime());
  res.setMilliseconds(0);
  res.setSeconds(0);
  res.setMinutes(0);
  return res;
}

;
/**
 * @param {Date} date
 * @param {Boolean} gmt default:false
 * @return {Date} date at 00:00 
 */

function beginOfDay(date, gmt) {
  var res = new Date(date.getTime());
  res.setMilliseconds(0);
  res.setSeconds(0);
  res.setMinutes(0);
  if (gmt) res.setUTCHours(0);else res.setHours(0);
  return res;
}

;
/**
 * @param {Date} date
 * @param {Boolean} gmt default:false
 * @return {Date} date at 00:00 
 */

function beginOfWeek(date, gmt, begin) {
  begin = begin || 0;
  var res = beginOfDay(date, gmt);

  while ((gmt ? res.getUTCDay() : res.getDay()) != begin) {
    res = prevDate(res);
  }

  return res;
}

;
/**
 * @param {Date} date
 * @param {Boolean} gmt default:false
 * @return {Date} date at 00:00 AM 
 */

function beginOfMonth(date, gmt) {
  gmt = !!gmt;
  var d = gmt ? date.getUTCDate() : date.getDate();
  var m = gmt ? date.getUTCMonth() : date.getMonth();
  var y = gmt ? date.getUTCFullYear() : date.getFullYear();
  var res = new Date();
  if (gmt) res.setUTCFullYear(y, m, 1);else res.setFullYear(y, m, 1);
  return beginOfDay(res, gmt);
}

;
/**
 * @param {Date} date
 * @param {Boolean} gmt default:false
 * @return {Date} date at 00:00 AM 
 */

function beginOfYear(date, gmt) {
  gmt = !!gmt;
  var d = gmt ? date.getUTCDate() : date.getDate();
  var m = gmt ? date.getUTCMonth() : date.getMonth();
  var y = gmt ? date.getUTCFullYear() : date.getFullYear();
  var res = new Date();
  if (gmt) res.setUTCFullYear(y, 0, 1);else res.setFullYear(y, 0, 1);
  return beginOfDay(res, gmt);
}

;
/**
 * @param {Date} date0
 * @param {Date} date1
 * @param {Boolean} gmt default:false
 * @return {number} 
 */

function compareDate(date0, date1, gmt) {
  var date0 = beginOfDay(date0, !!gmt);
  var date1 = beginOfDay(date1, !!gmt);
  return (date0.getTime() - date1.getTime()) / 86400000;
}

;
/**
 * @param {Date} date0
 * @param {Date} date1
 * @param {Boolean} gmt default:false
 * @return {number} 
 */

function compareMonth(date0, date1, gmt) {
  gmt = !!gmt;
  var m0 = gmt ? date0.getUTCMonth() : date0.getMonth();
  var y0 = gmt ? date0.getUTCFullYear() : date0.getFullYear();
  var m1 = gmt ? date1.getUTCMonth() : date1.getMonth();
  var y1 = gmt ? date1.getUTCFullYear() : date1.getFullYear();
  return (y0 - y1) * 12 + (m0 - m1);
}

;

function compareYear(date0, date1, gmt) {
  gmt = !!gmt;
  var y0 = gmt ? date0.getUTCFullYear() : date0.getFullYear();
  var y1 = gmt ? date1.getUTCFullYear() : date1.getFullYear();
  return y0 - y1;
}

;
/**
 * 
 * @param {Date} date
 * @returns {Date} 
 */

function nextMonth(date) {
  var m = date.getMonth();
  var y = date.getFullYear();

  if (m == 11) {
    return new Date(y + 1, 0, 1, 0, 0, 0, 0);
  } else {
    return new Date(y, m + 1, 1, 0, 0, 0, 0);
  }
}
/**
 * 
 * @param {Date} date
 * @returns {Date} 
 */


function prevMonth(date) {
  var m = date.getMonth();
  var y = date.getFullYear();

  if (m == 0) {
    return new Date(y - 1, 11, 1, 0, 0, 0, 0);
  } else {
    return new Date(y, m - 1, 1, 0, 0, 0, 0);
  }
}
/**
 * 
 * @param {Number} year
 * @param {Number} month
 * @returns {Number}
 */


function daysInMonth(year, month) {
  var start = new Date(year, month, 1);
  var end = nextMonth(start);
  return compareDate(end, start);
}