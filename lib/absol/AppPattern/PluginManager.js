"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function PluginManager() {
  this.runnerChains = {};
}

PluginManager.prototype.push = function (key, runner) {
  this.runnerChains[key] = this.runnerChains[key] || [];
  this.runnerChains[key].push(runner);
};

PluginManager.prototype.pop = function (key) {
  this.runnerChains[key] = this.runnerChains[key] || [];
  return this.runnerChains[key].pop();
};

PluginManager.prototype.remove = function (key, runner) {
  var runnerChain = this.runnerChains[key];

  if (runnerChain) {
    var index = runnerChain.indexOf(runner);

    if (index >= 0) {
      runnerChain.splice(index, 1);
      return true;
    }
  }

  return false;
};

PluginManager.prototype.contains = function (key, runner) {
  var runnerChain = this.runnerChains[key];

  if (runnerChain) {
    var index = runnerChain.indexOf(runner);
    if (index >= 0) return true;
  }

  return false;
};

PluginManager.prototype.exec = function (_this, key) {
  var args = Array.prototype.slice.call(arguments, 2);
  var runnerChain = this.runnerChains[key];
  if (runnerChain) for (var i = 0; i < runnerChain.length; ++i) {
    runnerChain[i].apply(_this, args);
  }
};

var _default = PluginManager;
exports["default"] = _default;