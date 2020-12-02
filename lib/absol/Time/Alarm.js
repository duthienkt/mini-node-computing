"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * 
 * @param {Date| Number} time 
 * @param {Function} callback 
 */
function Alarm(time, callback) {
  this.LIMIT_TIMEOUT = 2147483647;
  this.callback = callback;
  this.state = "STAND_BY";
  this.timeout = -1;
  if (typeof time == 'number') this.time = time;else this.time = time.getTime();
  this.args = Array.prototype.slice.call(arguments, 2);
  this.tick = this.tick.bind(this);
  if (this.time >= new Date().getTime()) this.start();else this.kill();
}

Alarm.prototype.start = function () {
  if (this.state == 'STAND_BY' || this.state == "PAUSE") {
    this.state = "RUNNING";
    this.tick();
    return true;
  }

  return false;
};

Alarm.prototype.pause = function () {
  if (this.state == "RUNNING") {
    clearTimeout(this.timeout);
    this.timeout = -1;
    this.state = 'PAUSE';
  }
};

Alarm.prototype.tick = function () {
  var now = new Date().getTime();

  if (now >= this.time) {
    this.callback && this.callback.apply(null, this.args);
    this.start = 'FINISH';
  } else {
    var deltaTime = Math.min(this.LIMIT_TIMEOUT, this.time - now);
    this.timeout = setTimeout(this.tick, deltaTime);
    this.state = "RUNNING";
  }
};

Alarm.prototype.kill = function () {
  if (this.state != "FINISH" && this.state != "DEAD") {
    if (this.timeout >= 0) clearTimeout(this.timeout);
    this.state = 'DEAD';
    return true;
  }

  return false;
};

var _default = Alarm;
exports["default"] = _default;