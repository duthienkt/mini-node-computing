"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function CMDRunner(_this, commands) {
  this._this = _this;
  this.commands = {};
  this.assign(commands);
}

CMDRunner.prototype.has = function (cmdName) {
  return !!this.commands[cmdName];
};

CMDRunner.prototype.add = function (cmdName, handler) {
  this.commands[cmdName] = handler;
  return this;
};

CMDRunner.prototype.remove = function (cmdName) {
  delete this.commands[cmdName];
  return this;
};

CMDRunner.prototype.assign = function (obj) {
  for (var cmdName in obj) {
    if (typeof obj[cmdName] == 'function') {
      this.add(cmdName, obj[cmdName]);
    }
  }
};

CMDRunner.prototype.invoke = function () {
  if (this.commands[arguments[0]]) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.commands[arguments[0]].apply(this._this, args);
  } else {
    throw new Error('No command: ' + arguments[0]);
  }
};

var _default = CMDRunner;
exports["default"] = _default;