"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ContextManager = _interopRequireDefault(require("./ContextManager"));

var _Context = _interopRequireDefault(require("./Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @class
 */
function Application() {
  _Context["default"].call(this);

  this.activityStack = [];
  /** @type {Activity} */

  this.currentActivity = null;
  this.contextManager = new _ContextManager["default"]();
}

Object.defineProperties(Application.prototype, Object.getOwnPropertyDescriptors(_Context["default"].prototype));
Application.prototype.constructor = Application;

Application.prototype.getContextManager = function () {
  return this.contextManager;
};
/**
 * @param {Activity} activity
 */


Application.prototype.startActivity = function (activity) {
  if (this.currentActivity != null) {
    this.currentActivity.pause();
    this.activityStack.push(this.currentActivity);
  }

  this.currentActivity = activity;
  this.appendChild(activity);
  activity.attach(this);
  this.setContentView(activity.getView(), true);
  activity.start();
};
/**
 * @param {Activity} activity
 */


Application.prototype.stopActivity = function (activity) {
  if (this.currentActivity == activity) {
    if (this.activityStack.length == 0) {//todo
    } else {
      activity.detach();
      this.removeChild(this.currentActivity);
      this.currentActivity = this.activityStack.pop();
      this.setContentView(this.currentActivity.getView());
      this.currentActivity.resume();
    }
  } else {
    console.error("NOT ON TOP ACTIVITY");
  }
};
/**
 * @param {HTMLElement} view
 */


Application.prototype.setContentView = function (view, overlay) {
  throw new Error("Not Implement!");
};

Application.prototype.backToTopActivity = function () {
  while (this.activityStack.length > 0) {
    this.currentActivity.stop();
    this.currentActivity = this.activityStack.pop();
  }

  this.setContentView(this.currentActivity.getView());
  this.currentActivity.resume();
};

var _default = Application;
exports["default"] = _default;