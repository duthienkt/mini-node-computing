"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blobToFile = blobToFile;
exports.dataURItoBlob = dataURItoBlob;
exports.blobToArrayBuffer = blobToArrayBuffer;
exports.stringToBlob = stringToBlob;

function blobToFile(theBlob, fileName) {
  return new File([theBlob], fileName);
}

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  var blob = new Blob([ab], {
    type: mimeString
  });
  return blob;
}

function blobToArrayBuffer(blob) {
  var fileReader = new FileReader();
  return new Promise(function (rs) {
    fileReader.onload = function (event) {
      var arrayBuffer = event.target.result;
      rs(arrayBuffer);
    };

    fileReader.readAsArrayBuffer(blob);
  });
}

function stringToBlob(text, type) {
  return new Blob([text], {
    type: type || 'text/plain'
  });
}