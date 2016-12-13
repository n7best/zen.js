(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["zen"] = factory();
	else
		root["zen"] = factory();
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

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var __origin = {
	    __state: {},
	    __objs: {},
	    create: function create(id) {
	        this.__state[id] = {
	            id: id,
	            depends: [],
	            stacks: [0],
	            resonants: []
	        };

	        return this.__state[id];
	    },

	    state: function state(id) {
	        if (typeof id == 'undefined') return this.create(id);
	        if (typeof this.__state[id] == 'undefined') return this.create(id);
	        return this.__state[id];
	    },

	    obj: function obj(id) {
	        if (typeof id == 'undefined') return false;
	        if (typeof this.__objs[id] == 'undefined') return false;

	        if (typeof this.__objs[id].__zen == 'undefined') {
	            return {
	                base: true,
	                getter: Object.getOwnPropertyDescriptor(this.__objs, id).get,
	                setter: Object.getOwnPropertyDescriptor(this.__objs, id).set
	            };
	        } else {
	            return {
	                base: false,
	                obj: this.__objs[id]
	            };
	        }
	    },

	    formBase: function formBase(name, getter, setter) {
	        if (getter && setter) {
	            Object.defineProperty(this.__objs, name, {
	                get: getter,
	                set: setter,
	                enumerable: true,
	                configurable: false
	            });

	            return this.__objs[name];
	        }
	    },

	    form: function form(name) {
	        var obj = this.__objs[name] = {
	            __zen: true,
	            id: name
	        };

	        return obj;
	    },

	    resonant: function resonant(name, value) {
	        var _this = this;

	        Object.keys(this.__state).forEach(function (key) {
	            if (_this.__state[key] && _this.__state[key].depends.length > 0 && _this.__state[key].depends.indexOf(name) > -1) {
	                _this.__state[key].resonants.forEach(function (resonant) {
	                    return resonant(value);
	                });
	            }
	        });
	    }
	};

	function zen(name, objs) {
	    if (!name || typeof name !== 'string') return;
	    if (!objs) {
	        var obj = __origin.obj(name);
	        if (obj) {
	            if (obj.base) {
	                return obj.getter();
	            } else {
	                return obj.obj;
	            }
	        }
	    }

	    var state = __origin.state(name);

	    if ((typeof objs === 'undefined' ? 'undefined' : _typeof(objs)) == 'object') {
	        if (objs.__zen) {
	            return objs;
	        } else {
	            var _ret = function () {
	                var dimension = 1,
	                    zenobj = __origin.form(name);
	                //multi dimension objs
	                Object.keys(objs).forEach(function (objkey) {
	                    var obj = objs[objkey];
	                    var __obj = __origin.obj(obj);

	                    if (__obj !== false) {
	                        if (!__obj.base) {
	                            state.depends.push(obj.__stateId);
	                            dimension += obj.__dimension;
	                            zenobj[objkey] = obj;
	                        } else {
	                            //define object property
	                            state.depends.push(obj);
	                            Object.defineProperty(zenobj, obj, {
	                                get: __obj.getter,
	                                set: __obj.setter,
	                                enumerable: true,
	                                configurable: false
	                            });
	                        }
	                    } else {
	                        //not an zen instance
	                        // console.log('not an zen object name', obj, __obj)
	                        // console.log(__origin.__objs)
	                    }
	                });

	                zenobj.resonant = function (func) {
	                    return state.resonants.push(func);
	                };
	                zenobj.__dimension = dimension;
	                zenobj.__stateId = state.id;

	                //god
	                zenobj.__god = function () {
	                    return state;
	                };

	                return {
	                    v: zenobj
	                };
	            }();

	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        }
	    }

	    //init value
	    var zenobj = __origin.formBase(name, function () {
	        return state.stacks[state.stacks.length - 1];
	    }, function (value) {
	        state.stacks.push(value);

	        //direct
	        state.resonants.forEach(function (resonant) {
	            resonant(value);
	        });

	        //chanel / boarcasting
	        __origin.resonant(name, value);
	    });

	    state.stacks.push(objs);

	    return zenobj;
	}

	module.exports = zen;

/***/ }
/******/ ])
});
;