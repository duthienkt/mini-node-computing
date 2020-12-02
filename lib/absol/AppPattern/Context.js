"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function Context() {
  this.state = "CREATE";
  /**
   * @type {Context}
   */

  this.parent = null;
}
/**
 * @returns {*}
 */


Context.prototype.getContext = function (key) {
  return this.getContextManager().get(key);
};
/**
 * @returns {*}
 */


Context.prototype.setContext = function (key, value) {
  return this.getContextManager().set(key, value);
};
/**
 * @returns {ContextManager}
 */


Context.prototype.getContextManager = function () {
  return this.parent.getContextManager();
};
/**
 * @param {Application} 
 */


Context.prototype.attach = function (parent) {
  //stop before attach to new context
  this.stop();
  /**
   * @type {Application}
   */

  this.parent = parent;
  this.state = "ATTACHED";
  this.onAttached && this.onAttached();
};

Context.prototype.detach = function () {
  this.stop();
  this.state = "DETACHED";
  this.onDetached && this.onDetached();
  this.parent = null;
};

Context.prototype.pause = function () {
  if (this.state.match(/RUNNING/)) {
    this.state = "PAUSE";
    this.onPause && this.onPause();
  } else {
    console.warn(this, "NOT RUNNING");
  }
};

Context.prototype.resume = function () {
  if (!this.state.match(/STANDBY||PAUSE/)) {
    console.error(this, 'NOT READY!');
    return;
  }

  if (this.state == "RUNNING") return;
  this.state = "RUNNING";
  this.onResume && this.onResume();
};

Context.prototype.start = function () {
  if (this.state.match(/DIE/)) {
    console.error(this, 'DIED!');
    return;
  }

  if (this.state.match(/RUNNING/)) return;

  if (this.state.match(/STOP|CREATE|ATTACHED/)) {
    this.state = "STANDBY";
    this.onStart && this.onStart();
  }

  if (this.state.match(/STANDBY|PAUSE/)) {
    this.resume();
  }
};

Context.prototype.stop = function () {
  if (this.state.match(/STOP|DIE|CREATE|ATTACHED|DETACHED/)) return;
  if (this.state.match(/RUNNING/)) this.pause();
  this.state = "STOP";
  this.onStop && this.onStop();
};

Context.prototype.destroy = function () {
  if (this.state.match(/DIE/)) return;
  if (this.state.match(/RUNNING|PAUSE/)) this.stop();
  this.state = "DIE";
  this.onDestroy && this.onDestroy();
};

var _default = Context;
exports["default"] = _default;