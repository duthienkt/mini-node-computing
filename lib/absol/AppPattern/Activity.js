"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Context = _interopRequireDefault(require("./Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//NOTE: !impotant : don't make setter, getter for activity, just code like JAVA

/** 
 * @class
 */
function Activity() {
  _Context["default"].call(this);
}

Object.defineProperties(Activity.prototype, Object.getOwnPropertyDescriptors(_Context["default"].prototype));
Activity.prototype.constructor = Activity;

Activity.prototype.startActivity = function (activity) {
  if (this.parent) {
    this.parent.startActivity(activity);
  } else {}
};

Activity.prototype.finish = function () {
  if (this.parent) {
    this.parent.stopActivity(this);
  } else {}
};

var _default = Activity;
exports["default"] = _default;