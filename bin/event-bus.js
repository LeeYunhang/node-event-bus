'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.getListenerNumber = getListenerNumber;
exports.emit = emit;


var eventList = new Map();

/**
 * subscribe
 * 
 * @param {String}   event type
 * @param {Function} listener function
 * @param {Boolean}  async default:false
 * 
 * @return {Symbol}  listener identify
 */
function subscribe(type, listener) {
    var async = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    var tmp = eventList.get(type);
    if (!tmp) {
        eventList.set(type, []);
        tmp = eventList.get(type);
    }

    var symbol = Symbol(type);
    tmp.push({ listener: listener, async: async, symbol: symbol });

    return symbol;
}

/**
 * unsubscribe
 * 
 * @param {Symbol} listener identify
 * 
 * @return {Boolean} return true if unsubscribe successfully
 */
function unsubscribe(identify) {
    var type = identify.toString();
    var begin = type.indexOf('(');
    var end = type.indexOf(')');

    type = type.slice(begin + 1, end);
    var value = eventList.get(type);

    if (!value) {
        return false;
    }

    var tmp = value.filter(function (v, i, a) {
        return v.symbol !== identify;
    });
    eventList.set(type, tmp);
    return true;
}

/**
 * get listener number
 * 
 * @param {String} type
 * 
 * @return {Number} the number of listener
 */
function getListenerNumber(type) {
    return eventList.get(type).length;
}

/**
 * emit
 * 
 * @param {String} event type
 * @param {...Object} paramters
 */
function emit(type) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    var tmp = eventList.get(type);

    tmp.forEach(function (v) {
        if (v.async) {
            setTimeout(function () {
                return v.listener.apply(v, args);
            }, 0);
            return;
        }
        v.listener.apply(v, args);
    });
}