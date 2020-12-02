"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./Polyfill/polyfill");

var _EventEmitter = _interopRequireDefault(require("./HTML5/EventEmitter"));

var _BrowserDetector = _interopRequireDefault(require("./Detector/BrowserDetector"));

var _JSPath = _interopRequireDefault(require("./HTML5/JSPath"));

var _TemplateString = _interopRequireDefault(require("./JSMaker/TemplateString"));

var _TemplateXML = _interopRequireDefault(require("./JSMaker/TemplateXML"));

var _Dom = _interopRequireDefault(require("./HTML5/Dom"));

var _Svg = _interopRequireDefault(require("./HTML5/Svg"));

var _OOP = _interopRequireDefault(require("./HTML5/OOP"));

var _XML = _interopRequireDefault(require("./XML/XML"));

var _Color = _interopRequireDefault(require("./Color/Color"));

var _IFrameBridge = _interopRequireDefault(require("./Network/IFrameBridge"));

var _jszip = _interopRequireDefault(require("jszip"));

var _JSDocx = _interopRequireDefault(require("./JSDocx/JSDocx"));

var _Broadcast = _interopRequireDefault(require("./Network/Broadcast"));

var text = _interopRequireWildcard(require("./HTML5/Text"));

var file = _interopRequireWildcard(require("./Converter/file"));

var base64 = _interopRequireWildcard(require("./Converter/base64"));

var _Alarm = _interopRequireDefault(require("./Time/Alarm"));

var _Ref = _interopRequireDefault(require("./AppPattern/Ref"));

var _XHR = _interopRequireDefault(require("./Network/XHR"));

var stringGenerate = _interopRequireWildcard(require("./String/stringGenerate"));

var stringFormat = _interopRequireWildcard(require("./String/stringFormat"));

var jsxdom = _interopRequireWildcard(require("./JSX/dom"));

var jsxattribute = _interopRequireWildcard(require("./JSX/attribute"));

var _Activity = _interopRequireDefault(require("./AppPattern/Activity"));

var _Context = _interopRequireDefault(require("./AppPattern/Context"));

var _ContextManager = _interopRequireDefault(require("./AppPattern/ContextManager"));

var _Application = _interopRequireDefault(require("./AppPattern/Application"));

var _VarScope = _interopRequireDefault(require("./AppPattern/VarScope"));

var _Fragment = _interopRequireDefault(require("./AppPattern/Fragment"));

var _Rectangle = _interopRequireDefault(require("./Math/Rectangle"));

var _Arc = _interopRequireDefault(require("./Math/Arc"));

var _NumRange = _interopRequireDefault(require("./Math/NumRange"));

var clipboard = _interopRequireWildcard(require("./HTML5/Clipboard"));

var _Heap = _interopRequireDefault(require("./DataStructure/Heap"));

var datetime = _interopRequireWildcard(require("./Time/datetime"));

var _CMDRunner = _interopRequireDefault(require("./AppPattern/CMDRunner"));

var _Element = _interopRequireDefault(require("./HTML5/Element"));

var _AElementNS = _interopRequireDefault(require("./HTML5/AElementNS"));

var _DomSignal = _interopRequireDefault(require("./HTML5/DomSignal"));

var _CookieStore = _interopRequireDefault(require("./Cookie/CookieStore"));

var _parseCookieString = _interopRequireDefault(require("./Cookie/parseCookieString"));

var _ResizeSystem = _interopRequireDefault(require("./HTML5/ResizeSystem"));

var _Vec = _interopRequireDefault(require("./Math/Vec2"));

var _Mat = _interopRequireDefault(require("./Math/Mat3"));

var _LanguageSystem = _interopRequireDefault(require("./HTML5/LanguageSystem"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var absol = {
  Rectangle: _Rectangle["default"],
  ResizeSystem: _ResizeSystem["default"],
  Arc: _Arc["default"],
  NumRange: _NumRange["default"],
  CookieStore: _CookieStore["default"],
  parseCookieString: _parseCookieString["default"],
  CMDRunner: _CMDRunner["default"],
  ContextManager: _ContextManager["default"],
  Application: _Application["default"],
  Fragment: _Fragment["default"],
  VarScope: _VarScope["default"],
  Context: _Context["default"],
  Activity: _Activity["default"],
  Element: _Element["default"],
  ElementNS: _AElementNS["default"],
  AElement: _Element["default"],
  AElementNS: _AElementNS["default"],
  DomSignal: _DomSignal["default"],
  JSPath: _JSPath["default"],
  TemplateString: _TemplateString["default"],
  TemplateXML: _TemplateXML["default"],
  Dom: _Dom["default"],
  Svg: _Svg["default"],
  BrowserDetector: _BrowserDetector["default"],
  OOP: _OOP["default"],
  XML: _XML["default"],
  Color: _Color["default"],
  EventEmitter: _EventEmitter["default"],
  JSZip: _jszip["default"],
  IFrameBridge: _IFrameBridge["default"],
  JSDocx: _JSDocx["default"],
  Broadcast: _Broadcast["default"],
  text: text,
  file: file,
  base64: base64,
  Alarm: _Alarm["default"],
  coreDom: _Dom["default"].ShareInstance,
  coreSvg: _Svg["default"].ShareInstance,
  require: function require(tagName) {
    return this.coreDom.require(tagName) || this.coreSvg.require(tagName);
  },
  domCreator: _Dom["default"].ShareInstance.creator,
  svgCreator: _Dom["default"].ShareInstance.creator,
  _: _Dom["default"].ShareInstance._,
  $: _Dom["default"].ShareInstance.$,
  $$: _Dom["default"].ShareInstance.$$,
  _svg: _Svg["default"].ShareInstance._,
  $svg: _Svg["default"].ShareInstance.$,
  Ref: _Ref["default"],
  XHR: _XHR["default"],
  string: Object.assign({}, stringFormat, stringGenerate),
  jsx: {
    dom: jsxdom,
    attribute: jsxattribute
  },
  clipboard: clipboard,
  dataStructure: {
    Heap: _Heap["default"]
  },
  datetime: datetime,
  Vec2: _Vec["default"],
  Mat3: _Mat["default"],
  LanguageSystem: _LanguageSystem["default"]
};
var _default = absol;
exports["default"] = _default;