"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DocxTpl = _interopRequireDefault(require("./DocxTpl"));

var _content_types = _interopRequireDefault(require("./assets/content_types.xmlParse.js"));

var _rels = _interopRequireDefault(require("./assets/rels.xmlParse.js"));

var _documentXml = _interopRequireDefault(require("./assets/document.xmlParse.js.rels"));

var _jszip = _interopRequireDefault(require("jszip"));

var _Dom = _interopRequireDefault(require("../HTML5/Dom"));

var _Svg = _interopRequireDefault(require("../HTML5/Svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function JSDocx(props) {
  if (props.blob) this.blob = props.blob;
  if (props.blob) this.buffer = props.buffer;
}

JSDocx.prototype.saveAs = function (fileName) {
  var src;

  if (this.blob) {
    src = (URL || webkitURL).createObjectURL(this.blob);
  } else if (this.buffer) {
    src = "data:application/octet-stream," + encodeURIComponent(this.buffer);
  }

  var element = document.createElement('a');
  element.setAttribute('href', src);
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

JSDocx._prepareImageParts = function (htmlSource) {
  var imageContentParts = [];
  var inlinedSrcPattern = /\"data:(\w+\/\w+);(\w+),(\S+)\"/g;

  var inlinedReplacer = function inlinedReplacer(match, contentType, contentEncoding, encodedContent) {
    var index = imageContentParts.length;
    var extension = contentType.split('/')[1];
    var contentLocation = "file:///C:/fake/image" + index + "." + extension; // mht_part: new Function('contentType', 'contentEncoding', 'contentLocation', 'encodedContent', 'return ' + TemplateString.parse(mht_pathTpl).toJSCode())

    imageContentParts.push(_DocxTpl["default"].mht_part(contentType, contentEncoding, contentLocation, encodedContent));
    return "\"" + contentLocation + "\"";
  };

  if (typeof htmlSource === 'string') {
    if (!/<img/g.test(htmlSource)) {
      return {
        htmlSource: htmlSource,
        imageContentParts: imageContentParts
      };
    }

    htmlSource = htmlSource.replace(inlinedSrcPattern, inlinedReplacer);
    return {
      htmlSource: htmlSource,
      imageContentParts: imageContentParts
    };
  } else {
    throw new Error("Not a valid source provided!");
  }
};

JSDocx._getMHTdocument = function (htmlSource) {
  var imageContentParts, _ref;

  _ref = this._prepareImageParts(htmlSource), htmlSource = _ref.htmlSource, imageContentParts = _ref.imageContentParts;
  htmlSource = htmlSource.replace(/\=/g, '=3D');
  return _DocxTpl["default"].mht_document(htmlSource, imageContentParts.join('\n'));
};
/**
 * @param {JSZip} zip
 */


JSDocx._generateDocument = function (zip) {
  return zip.generateAsync({
    type: 'arraybuffer'
  }).then(function (buffer) {
    var props = {};
    if (global.Blob) props.blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });else if (global.Buffer) props.buffer = new Buffer(new Uint8Array(buffer));else throw new Error("Neither Blob nor Buffer are accessible in this environment. " + "Consider adding Blob.js shim");
    return new JSDocx(props);
  });
};

JSDocx._renderDocumentFile = function (pageSetting) {
  return _DocxTpl["default"].document(pageSetting);
};

JSDocx._createPageSetting = function (documentOptions) {
  documentOptions = documentOptions || {};
  var pageSetting = {
    margins: {
      top: 1440,
      right: 1440,
      bottom: 1440,
      left: 1440,
      header: 720,
      footer: 720,
      gutter: 0
    }
  };

  if (documentOptions.orientation == 'landscape') {
    Object.assign(pageSetting, {
      height: 12240,
      width: 15840,
      orient: 'landscape'
    });
  } else {
    Object.assign(pageSetting, {
      width: 12240,
      height: 15840,
      orient: 'portrait'
    });
  }

  if (documentOptions.margins) {
    Object.assign(pageSetting, documentOptions.margins);
  }

  return pageSetting;
};

JSDocx._addFiles = function (zip, htmlSource, pageSetting) {
  zip.file('[Content_Types].xmlParse.js', _content_types["default"]);
  zip.folder('_rels').file('.rels', _rels["default"]);
  zip.folder('word').file('document.xmlParse.js', _DocxTpl["default"].document(pageSetting));
  zip.folder('word').file('document.xmlParse.js', JSDocx._renderDocumentFile(pageSetting)).file('afchunk.mht', JSDocx._getMHTdocument(htmlSource)).folder('_rels').file('document.xmlParse.js.rels', _documentXml["default"]);
  return zip;
};

JSDocx.fromHTMLCode = function (html, options) {
  var zip = new _jszip["default"]();

  JSDocx._addFiles(zip, html, JSDocx._createPageSetting(options));

  return JSDocx._generateDocument(zip);
};

JSDocx.fromHTMLElement = function (element, options, getOuter, isWorkingElement) {
  if (typeof element == 'string') {
    element = _Dom["default"].ShareInstance.$(element);
  }

  if (!element) throw new Error('@param element must be HTMLElement');
  var preRender;

  if (!isWorkingElement) {
    preRender = _Dom["default"].ShareInstance._('div');
    preRender.addStyle({
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '-10000',
      opacity: '0'
    }).addTo(document.body);
    Array.prototype.forEach.call(element.childNodes, function (e) {
      if (e.tagName != 'script') preRender.addChild(e.cloneNode(true));
    });
  } else {
    preRender = element;
  }

  _Dom["default"].ShareInstance.$('script', preRender, function (e) {
    e.parentElement.removeChild(e);
    return false;
  });

  var imageTask = [];

  _Dom["default"].ShareInstance.$('img', preRender, function (e) {
    if (e.src && !e.src.match(/data:/)) {
      var task = _Dom["default"].imageToCanvas(e).then(function (canvas) {
        var newSrc = canvas.toDataURL();
        e.src = newSrc;
      });

      imageTask.push(task);
    }

    return false;
  });

  _Dom["default"].ShareInstance.$('svg', preRender, function (e) {
    var task = _Svg["default"].svgToCanvas(e).then(function (canvas) {
      var newSrc = canvas.toDataURL();

      var image = _Dom["default"].ShareInstance._('img');

      image.src = newSrc;

      _Dom["default"].ShareInstance.$(e).selfReplace(image);
    });

    imageTask.push(task);
    return false;
  });

  return Promise.all(imageTask).then(function () {
    var code;

    if (getOuter) {
      code = preRender.outerHTML;

      if (!code) {
        var temp = document.createElement('div');
        temp.addChild(preRender);
        code = temp.innerHTML;
      }
    } else {
      code = preRender.innerHTML;
    }

    return JSDocx.fromHTMLCode(code, options);
  });
};

var _default = JSDocx;
exports["default"] = _default;