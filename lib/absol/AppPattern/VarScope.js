"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function VarScope(parent) {
  this.parent = parent;
  this.data = {};
}

VarScope.prototype.declare = function (name, initValue) {
  if (name in this.data) throw new Error(name + ' is already delared in this scope!');
  this.data[name] = initValue;
};

VarScope.prototype.get = function (name) {
  var scope = this.findScope(name);
  if (!scope) throw new Error(name + ' is not declared!');
  return scope.data[name];
};

VarScope.prototype.set = function (name, value) {
  var scope = this.findScope(name);
  if (!scope) throw new Error(name + ' is not declared!');
  scope.data[name] = value;
};

VarScope.prototype.findScope = function (name) {
  var currentScope = this;

  while (currentScope) {
    if (name in currentScope.data) break;
    currentScope = currentScope.parent;
  }

  return currentScope;
};

var _default = VarScope;
exports["default"] = _default;