"use strict";

var _BrowserDetector = _interopRequireDefault(require("../Detector/BrowserDetector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Element.fixBrowserEvent = function (element) {
  if (_BrowserDetector["default"].isSafari && !_BrowserDetector["default"].isMobile) {
    if (!element.isSupportedEvent('mouseleave')) {
      element.defineEvent('mouseleave');

      var mouseLeaveEventHandler = function mouseLeaveEventHandler(event) {
        var bound = this.getBoundingClientRect();
        var ok = false;
        ok |= event.clientX < bound.left + 1;
        ok |= event.clientX >= bound.right - 1;
        ok |= event.clientY < bound.top + 1;
        ok |= event.clientY >= bound.bottom - 1;
        if (ok) this.emit('mouseleave', event);
      };

      element.addEventListener('mouseleave', mouseLeaveEventHandler, true);
    }
  }

  if (_BrowserDetector["default"].isFirefox) {
    if (!element.isSupportedEvent('wheel')) {
      element.defineEvent('wheel');

      var wheelEventHandler = function wheelEventHandler(oldEvent) {
        //clone event to avoid some lib fix it
        var event = oldEvent.absolEvent;

        if (!event) {
          event = Object.assign({}, oldEvent);

          for (var i = 0; i < Element.eventProperties.length; ++i) {
            var key = Element.eventProperties[i];

            if (typeof event[key] == 'function') {
              event[key] = event[key].bind(oldEvent);
            }
          }

          event.preventDefault = function () {
            oldEvent.preventDefault();
          };

          if (!event.mozFixWheelScale) {
            event.mozDeltaY = oldEvent.deltaY;
            event.mozFixWheelScale = true;
            Object.defineProperty(event, 'deltaY', {
              get: function get() {
                return this.mozDeltaY * 100 / 3;
              }
            });
          }

          oldEvent.absolEvent = event;
        }

        this.emit('wheel', event);
      };

      element.addEventListener('wheel', wheelEventHandler);
    }
  }
};