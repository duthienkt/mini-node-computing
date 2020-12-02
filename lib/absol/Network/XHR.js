"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var XHR = {};

XHR.makeHttpObject = function () {
  try {
    return new XMLHttpRequest();
  } catch (error) {}

  try {
    return new ActiveXObject("Msxml2.XMLHTTP");
  } catch (error) {}

  try {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } catch (error) {}

  throw new Error("Could not create HTTP request object.");
};
/***
 * 
 * @param {String} url
 * @param {String} body
 * @param {String} responseType
 * @param {Function} success
 * @param {Function} failure
 * @returns {Promise}
 */


XHR.getRequest = function (url, props, success, failure) {
  return new Promise(function (rs, rj) {
    var request = XHR.makeHttpObject();
    request.open("GET", url, true);
    if (typeof props == 'string') request.responseType = props || '';else if (props && _typeof(props) == 'object') {
      Object.assign(request, props);
    }
    request.send(null);

    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var response = request.response;
          success && success(response);
          rs(response);
        } else {
          failure && failure(request.status, request.statusText);
          rj(request.status);
        }
      }
    };

    request.onerror = function () {
      failure && failure(request.status, request.statusText);
      rj(new Error(request.status + request.statusText));
    };
  });
};

XHR.postRepquest = function (url, payload, props, headers, success, failure) {
  return new Promise(function (rs, rj) {
    var method = "POST";
    var shouldBeAsync = true;
    var request = XHR.makeHttpObject();

    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          success && success(request.response);
          rs(request.response);
        } else if (failure) {
          failure && failure(request.status, request.statusText);
          rj({
            status: request.status,
            statusText: request.statusText
          });
        }
      }
    };

    request.onerror = function () {
      failure && failure(request.status, request.statusText);
      rj(new Error(request.status + request.statusText));
    };

    request.open(method, url, shouldBeAsync);
    if (typeof props == 'string') request.responseType = props || '';else if (props && _typeof(props) == 'object') {
      Object.assign(request, props);
    }
    headers = headers || {};
    headers["Content-Type"] = headers["Content-Type"] || "application/json;charset=UTF-8";
    Object.keys(headers).forEach(function (key) {
      request.setRequestHeader(key, headers[key]);
    });
    request.send(payload);
  });
};

XHR.request = function (method, url, props, headers, body, successCallback, failureCallback) {
  return new Promise(function (rs, rj) {
    var shouldBeAsync = true;
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          successCallback && successCallback(request.response);
          rs(request.response);
        } else {
          failureCallback && failureCallback(request.status, request.statusText);
          rj({
            status: request.status,
            statusText: request.statusText
          });
        }
      }
    };

    request.onerror = function () {
      var error = new Error("Network Error!");
      if (failureCallback) failureCallback(error);
      rj(error);
    };

    request.open(method, url, shouldBeAsync);
    if (typeof props == 'string') request.responseType = props || '';else if (props && _typeof(props) == 'object') {
      Object.assign(request, props);
    }
    headers = headers || {};
    headers["Content-Type"] = headers["Content-Type"] || "application/json;charset=UTF-8";
    Object.keys(headers).forEach(function (key) {
      request.setRequestHeader(key, headers[key]);
    });
    request.send(body);
  });
};

var _default = XHR;
exports["default"] = _default;