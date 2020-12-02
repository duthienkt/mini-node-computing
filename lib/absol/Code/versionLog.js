"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = versionLog;

function versionLog(packageName, packageTag, packageDescription) {
  console.log('\n %c %c %c ' + packageName + "   \u2730 " + packageTag + " \u2730  %c  %c  " + packageDescription + "  %c %c \u272E%c\u272F%c\u272C \n\n", 'background: #d0d0ec; padding:5px 0;', 'background:  #d0d0ec; padding:5px 0;', 'color:  #d0d0ec; background: #898991; padding:5px 0;', 'background: #d0d0ec; padding:5px 0;', 'background: #dae6fc; padding:5px 0;', 'background: #d0d0ec; padding:5px 0;', 'color: #000080; background: #fff; padding:5px 0;', 'color: #000099; background: #fff; padding:5px 0;', 'color: #000099; background: #fff; padding:5px 0;');
}