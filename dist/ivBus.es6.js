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

	
	class EventBus {

	  constructor() {
	    this._bus = [];
	  }

	  /**
	    Dispatch a message across a channel
	    - channel : the channel name
	    - message : the message to dispatch
	  */
	  dispatch(channel, message) {
	    if (this._bus[channel] && this._bus[channel].constructor === Array) {
	      let i = 0;
	      let length = this._bus[channel].length;
	      let data = message;
	      let obj;

	      if ((data !== undefined && data !== null) && data.constructor !== Array) {
	        data = [data];
	      }

	      for (i = 0; i < length; i++) {
	        obj = this._bus[channel][i];
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
	  subscribe(channel, object, callback) {
	    if (!this._bus[channel]) {
	      this._bus[channel] = [];
	    }

	    this._bus[channel].push({
	      listener: object,
	      cb: callback
	    });
	  }

	  /**
	    Remove all specified listeners from the event bus
	    - channel : the channel name
	    - object : the listener to remove
	  */
	  unsubscribe(channel, object) {
	    if (this._bus[channel] && this._bus[channel].constructor === Array) {
	      let i;

	      for (i = 0; i < this._bus[channel].length; i++) {
	        if (object === this._bus[channel][i].listener) {
	          this._bus[channel].splice(i, 1);
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
	  getSubscribers(channel) {
	    if (channel && this._bus[channel]) {
	      return this._bus[channel];
	    } else {
	      return null;
	    }
	  }
	}

	export default EventBus;


/***/ }
/******/ ])
});
;