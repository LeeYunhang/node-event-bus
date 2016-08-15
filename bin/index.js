'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventBus = require('./event-bus');

Object.defineProperty(exports, 'subscribe', {
  enumerable: true,
  get: function get() {
    return _eventBus.subscribe;
  }
});
Object.defineProperty(exports, 'unsubscribe', {
  enumerable: true,
  get: function get() {
    return _eventBus.unsubscribe;
  }
});
Object.defineProperty(exports, 'emit', {
  enumerable: true,
  get: function get() {
    return _eventBus.emit;
  }
});
Object.defineProperty(exports, 'getListenerNumber', {
  enumerable: true,
  get: function get() {
    return _eventBus.getListenerNumber;
  }
});