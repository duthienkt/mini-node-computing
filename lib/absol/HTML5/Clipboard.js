"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyImage = copyImage;

function copyImage(src) {
  var ranges, sel;

  if (window.getSelection) {
    sel = window.getSelection(); //backup

    ranges = [];

    for (var i = 0; i < sel.rangeCount; ++i) {
      ranges.push(sel.getRangeAt(i));
    } //copy


    var contentdiv = document.createElement('div');
    var image = document.createElement('img');
    contentdiv.appendChild(image);
    image.src = src;
    contentdiv.contentEditable = true; // contentdiv.style.display = 'none';

    document.body.appendChild(contentdiv);
    var range = document.createRange();
    range.selectNodeContents(image);
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand('copy'); // contentdiv.remove();
    //recover 

    sel.removeAllRanges();

    for (var i = 0; i < sel.rangeCount; ++i) {
      sel.addRange(ranges[i]);
    }
  } else {
    console.error("Not support copy!"); //not support IE
  }
}