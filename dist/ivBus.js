(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ivBus", [], factory);
	else if(typeof exports === 'object')
		exports["ivBus"] = factory();
	else
		root["ivBus"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _instance = null;
	var _bus = [];

	var EventBus = function () {
		function EventBus() {
			_classCallCheck(this, EventBus);

			if (!_instance) {
				_instance = this;
			}

			return _instance;
		}

		/**
	 	Dispatch a message across a channel
	 	- channel : the channel name
	 	- message : the message to dispatch
	 */


		_createClass(EventBus, [{
			key: "dispatch",
			value: function dispatch(channel, message) {
				if (_bus[channel].constructor === Array) {
					var i = 0;
					var length = _bus[channel].length;
					var data = message;
					var obj = void 0;

					if (data.constructor !== Array) {
						data = [data];
					}

					for (i = 0; i < length; i++) {
						obj = _bus[channel][i];
						obj.cb.apply(obj.listener, data);
					}
				}
			}

			/**
	  	Add a listener to the event bus
	  	- channel : the channel name
	  	- object : the object listener
	  	- callback : the callback method to apply for the listener
	  */

		}, {
			key: "addListener",
			value: function addListener(channel, object, callback) {
				if (!_bus[channel]) {
					_bus[channel] = [];
				};

				_bus[channel].push({
					listener: object,
					cb: callback
				});
			}

			/**
	  	Remove all specified listeners from the event bus
	  	- channel : the channel name
	  	- object : the listener to remove
	  */

		}, {
			key: "removeListener",
			value: function removeListener(channel, object) {
				if (_bus[channel].constructor === Array) {
					var i = void 0;

					for (i = 0; i < _bus[channel].length; i++) {
						if (object === _bus[channel][i].listener) {
							_bus[channel].splice(i, 1);
							i--;
						}
					}
				}
			}

			/**
	  	Returns all listeners for a specified channel
	  	- channel : the channel name
	  		@return array of listeners for the channel if exists, otherwise null
	  */

		}, {
			key: "getListeners",
			value: function getListeners(channel) {
				if (channel && _bus[channel]) {
					return _bus[channel];
				} else {
					return null;
				}
			}
		}]);

		return EventBus;
	}();

	module.exports = EventBus;

/***/ }
/******/ ])
});
;