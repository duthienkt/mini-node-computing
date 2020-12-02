"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCmp = defaultCmp;
exports.heapDown = heapDown;
exports.heapUp = heapUp;
exports.heapify = heapify;
exports.heapPop = heapPop;
exports.heapPush = heapPush;
exports["default"] = void 0;

function defaultCmp(x, y) {
  if (x < y) {
    return -1;
  }

  if (x > y) {
    return 1;
  }

  return 0;
}

;
/**
 * 
 * @param {Array} arr 
 * @param {Number} pos 
 * @param {Function} cmp 
 */

function heapDown(arr, pos, cmp) {
  if (!cmp) cmp = defaultCmp;
  var item = arr[pos];
  var endPos = arr.length;
  var childPos = pos << 1 | 1;
  var childRightPos;

  while (childPos < endPos) {
    childRightPos = childPos + 1;

    if (childPos + 1 < endPos && cmp(arr[childPos], arr[childRightPos]) > 0) {
      childPos = childRightPos;
    }

    if (cmp(arr[childPos], item) < 0) {
      arr[pos] = arr[childPos];
      arr[childPos] = item;
      pos = childPos;
      childPos = pos << 1 | 1;
    } else break;
  }
}
/**
 * 
 * @param {Array} arr 
 * @param {Number} pos 
 * @param {Function} cmp 
 */


function heapUp(arr, pos, cmp) {
  if (!cmp) cmp = defaultCmp;
  var item = arr[pos];
  var parPos;

  while (pos > 0) {
    parPos = pos - 1 >> 1;

    if (cmp(arr[parPos], item) > 0) {
      arr[pos] = arr[parPos];
      arr[parPos] = item;
      pos = parPos;
    } else break;
  }
}
/**
 *
 * @param {Array} arr
 * @param {Function} cmp
 */


function heapify(arr, cmp) {
  if (!cmp) cmp = defaultCmp;
  var endPos = arr.length;

  for (var i = 0; i < endPos; ++i) {
    heapUp(arr, i, cmp);
  }
}
/**
 * 
 * @param {Array} arr 
 * @param {Function} cmp 
 */


function heapPop(arr, cmp) {
  if (!cmp) cmp = defaultCmp;
  var item = arr[0];
  var lastItem = arr.pop();

  if (arr.length > 0) {
    arr[0] = lastItem;
    heapDown(arr, 0, cmp);
  }

  return item;
}
/**
 * 
 * @param {Array} arr 
 * @param {*} item
 * @param {Function} cmp 
 */


function heapPush(arr, item, cmp) {
  if (!cmp) cmp = defaultCmp;
  arr.push(item);
  heapUp(arr, arr.length - 1, cmp);
}

function Heap(cmd) {
  this.cmp = cmd || defaultCmp;
  this.arr = [];
}
/**
 * @param {Array} arr
 * @param {Function} cmp
 * @returns {Heap}
 */


Heap.fromArray = function (arr, cmp) {
  var heap = new Heap(cmp);
  heapify(arr);
  heap.arr = arr;
  return heap;
};

Heap.prototype.push = function (x) {
  heapPush(this.arr, x, this.cmp);
  return this;
};

Heap.prototype.pop = function () {
  return heapPop(this.arr, this.cmp);
};

Heap.prototype.peek = function () {
  return this.arr[0];
};

Heap.prototype.contains = function (x) {
  return this.arr.indexOf(x) !== -1;
};

Heap.prototype.clear = function () {
  this.arr.splice(0, this.arr.length);
  return this;
};

Heap.prototype.empty = function () {
  return this.arr.length === 0;
};

Heap.prototype.size = function () {
  return this.arr.length;
};

Heap.prototype.clone = function () {
  var heap;
  heap = new Heap(this.cmp);
  heap.arr = this.arr.slice(0);
  return heap;
};

Heap.prototype.toArray = function () {
  return this.arr.slice(0);
};

Heap.prototype.toSortedArray = function () {
  var res = [];
  var heap = this.clone();

  while (!heap.empty()) {
    res.push(heap.pop());
  }

  return res;
};

Heap.prototype.insert = Heap.prototype.push;
Heap.prototype.top = Heap.prototype.peek;
Heap.prototype.front = Heap.prototype.peek;
Heap.prototype.has = Heap.prototype.contains;
Heap.prototype.copy = Heap.prototype.clone;
var _default = Heap;
exports["default"] = _default;