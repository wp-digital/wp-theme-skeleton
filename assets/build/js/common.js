/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/src/js/common.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/js/common.js":
/*!*********************************!*\
  !*** ./assets/src/js/common.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ \"./node_modules/@wordpress/dom-ready/build-module/index.js\");\n/* harmony import */ var _modules_detectTouchSupport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/detectTouchSupport */ \"./assets/src/js/modules/detectTouchSupport.js\");\n/* harmony import */ var _modules_Heckert_GNU_white_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Heckert_GNU_white.svg */ \"./assets/src/js/modules/Heckert_GNU_white.svg\");\n/* harmony import */ var _modules_Heckert_GNU_white_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_Heckert_GNU_white_svg__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nObject(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n  window.console.log(_modules_Heckert_GNU_white_svg__WEBPACK_IMPORTED_MODULE_2___default.a);\n  Object(_modules_detectTouchSupport__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  var extensions = ['.js', '.mjs', '.jsx', '.json', '.css', '.sass', '.scss', '.jpeg', '.jpg', '.png', '.gif', '.svg'];\n  window.console.log(extensions);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL2pzL2NvbW1vbi5qcz8zNTQ4Il0sIm5hbWVzIjpbImRvbVJlYWR5Iiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImljb24iLCJkZXRlY3RUb3VjaFN1cHBvcnQiLCJleHRlbnNpb25zIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBRUFBLG9FQUFRLENBQUMsWUFBTTtBQUNiQyxRQUFNLENBQUNDLE9BQVAsQ0FBZUMsR0FBZixDQUFtQkMscUVBQW5CO0FBQ0FDLDZFQUFrQjtBQUNsQixNQUFNQyxVQUFVLEdBQUcsQ0FDakIsS0FEaUIsRUFFakIsTUFGaUIsRUFHakIsTUFIaUIsRUFJakIsT0FKaUIsRUFLakIsTUFMaUIsRUFNakIsT0FOaUIsRUFPakIsT0FQaUIsRUFRakIsT0FSaUIsRUFTakIsTUFUaUIsRUFVakIsTUFWaUIsRUFXakIsTUFYaUIsRUFZakIsTUFaaUIsQ0FBbkI7QUFjQUwsUUFBTSxDQUFDQyxPQUFQLENBQWVDLEdBQWYsQ0FBbUJHLFVBQW5CO0FBQ0QsQ0FsQk8sQ0FBUiIsImZpbGUiOiIuL2Fzc2V0cy9zcmMvanMvY29tbW9uLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvbVJlYWR5IGZyb20gJ0B3b3JkcHJlc3MvZG9tLXJlYWR5JztcbmltcG9ydCBkZXRlY3RUb3VjaFN1cHBvcnQgZnJvbSAnLi9tb2R1bGVzL2RldGVjdFRvdWNoU3VwcG9ydCc7XG5cbmltcG9ydCBpY29uIGZyb20gJy4vbW9kdWxlcy9IZWNrZXJ0X0dOVV93aGl0ZS5zdmcnO1xuXG5kb21SZWFkeSgoKSA9PiB7XG4gIHdpbmRvdy5jb25zb2xlLmxvZyhpY29uKTtcbiAgZGV0ZWN0VG91Y2hTdXBwb3J0KCk7XG4gIGNvbnN0IGV4dGVuc2lvbnMgPSBbXG4gICAgJy5qcycsXG4gICAgJy5tanMnLFxuICAgICcuanN4JyxcbiAgICAnLmpzb24nLFxuICAgICcuY3NzJyxcbiAgICAnLnNhc3MnLFxuICAgICcuc2NzcycsXG4gICAgJy5qcGVnJyxcbiAgICAnLmpwZycsXG4gICAgJy5wbmcnLFxuICAgICcuZ2lmJyxcbiAgICAnLnN2ZycsXG4gIF07XG4gIHdpbmRvdy5jb25zb2xlLmxvZyhleHRlbnNpb25zKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./assets/src/js/common.js\n");

/***/ }),

/***/ "./assets/src/js/modules/Heckert_GNU_white.svg":
/*!*****************************************************!*\
  !*** ./assets/src/js/modules/Heckert_GNU_white.svg ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (1:0)\\nYou may need an appropriate loader to handle this file type.\\n> <?xml version=\\\"1.0\\\" encoding=\\\"utf-8\\\" standalone=\\\"yes\\\"?>\\n| <!DOCTYPE svg PUBLIC \\\"-//W3C//DTD SVG 1.1//EN\\\" \\\"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\\\">\\n| <svg xmlns=\\\"http://www.w3.org/2000/svg\\\" version=\\\"1.1\\\" width=\\\"535\\\" height=\\\"523\\\">\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9IZWNrZXJ0X0dOVV93aGl0ZS5zdmcuanMiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./assets/src/js/modules/Heckert_GNU_white.svg\n");

/***/ }),

/***/ "./assets/src/js/modules/detectTouchSupport.js":
/*!*****************************************************!*\
  !*** ./assets/src/js/modules/detectTouchSupport.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var detect_touch_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! detect-touch-events */ \"./node_modules/detect-touch-events/lib/index.js\");\n/* harmony import */ var detect_touch_events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(detect_touch_events__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  if (detect_touch_events__WEBPACK_IMPORTED_MODULE_0___default.a.hasSupport) {\n    document.body.classList.remove('with-hovers');\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvc3JjL2pzL21vZHVsZXMvZGV0ZWN0VG91Y2hTdXBwb3J0LmpzPzQxN2IiXSwibmFtZXMiOlsiZGV0ZWN0VG91Y2hFdmVudHMiLCJoYXNTdXBwb3J0IiwiZG9jdW1lbnQiLCJib2R5IiwiY2xhc3NMaXN0IiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVlLDJFQUFNO0FBQ25CLE1BQUlBLDBEQUFpQixDQUFDQyxVQUF0QixFQUFrQztBQUNoQ0MsWUFBUSxDQUFDQyxJQUFULENBQWNDLFNBQWQsQ0FBd0JDLE1BQXhCLENBQStCLGFBQS9CO0FBQ0Q7QUFDRixDQUpEIiwiZmlsZSI6Ii4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2RldGVjdFRvdWNoU3VwcG9ydC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZXRlY3RUb3VjaEV2ZW50cyBmcm9tICdkZXRlY3QtdG91Y2gtZXZlbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBpZiAoZGV0ZWN0VG91Y2hFdmVudHMuaGFzU3VwcG9ydCkge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnd2l0aC1ob3ZlcnMnKTtcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./assets/src/js/modules/detectTouchSupport.js\n");

/***/ }),

/***/ "./node_modules/@wordpress/dom-ready/build-module/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@wordpress/dom-ready/build-module/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Specify a function to execute when the DOM is fully loaded.\n *\n * @param {Function} callback A function to execute after the DOM is ready.\n *\n * @example\n * ```js\n * import domReady from '@wordpress/dom-ready';\n *\n * domReady( function() {\n * \t//do something after DOM loads.\n * } );\n * ```\n *\n * @return {void}\n */\nvar domReady = function domReady(callback) {\n  if (document.readyState === 'complete' || // DOMContentLoaded + Images/Styles/etc loaded, so we call directly.\n  document.readyState === 'interactive' // DOMContentLoaded fires at this point, so we call directly.\n  ) {\n      return callback();\n    } // DOMContentLoaded has not fired yet, delay callback until then.\n\n\n  document.addEventListener('DOMContentLoaded', callback);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (domReady);\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHdvcmRwcmVzcy9kb20tcmVhZHkvYnVpbGQtbW9kdWxlL2luZGV4LmpzP2RhODEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBOztBQUVlLHVFQUFRLEVBQUM7QUFDeEIiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQHdvcmRwcmVzcy9kb20tcmVhZHkvYnVpbGQtbW9kdWxlL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTcGVjaWZ5IGEgZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBET00gaXMgZnVsbHkgbG9hZGVkLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIEEgZnVuY3Rpb24gdG8gZXhlY3V0ZSBhZnRlciB0aGUgRE9NIGlzIHJlYWR5LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogaW1wb3J0IGRvbVJlYWR5IGZyb20gJ0B3b3JkcHJlc3MvZG9tLXJlYWR5JztcbiAqXG4gKiBkb21SZWFkeSggZnVuY3Rpb24oKSB7XG4gKiBcdC8vZG8gc29tZXRoaW5nIGFmdGVyIERPTSBsb2Fkcy5cbiAqIH0gKTtcbiAqIGBgYFxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbnZhciBkb21SZWFkeSA9IGZ1bmN0aW9uIGRvbVJlYWR5KGNhbGxiYWNrKSB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnIHx8IC8vIERPTUNvbnRlbnRMb2FkZWQgKyBJbWFnZXMvU3R5bGVzL2V0YyBsb2FkZWQsIHNvIHdlIGNhbGwgZGlyZWN0bHkuXG4gIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgLy8gRE9NQ29udGVudExvYWRlZCBmaXJlcyBhdCB0aGlzIHBvaW50LCBzbyB3ZSBjYWxsIGRpcmVjdGx5LlxuICApIHtcbiAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgIH0gLy8gRE9NQ29udGVudExvYWRlZCBoYXMgbm90IGZpcmVkIHlldCwgZGVsYXkgY2FsbGJhY2sgdW50aWwgdGhlbi5cblxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYWxsYmFjayk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkb21SZWFkeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@wordpress/dom-ready/build-module/index.js\n");

/***/ }),

/***/ "./node_modules/detect-touch-events/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/detect-touch-events/lib/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar detectTouchEvents = {\n  update: function update() {\n    if (typeof window !== 'undefined') {\n      detectTouchEvents.hasSupport = 'ontouchstart' in window;\n      detectTouchEvents.browserSupportsApi = Boolean(window.TouchEvent);\n    }\n  }\n};\n\ndetectTouchEvents.update();\nexports.default = detectTouchEvents;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGV0ZWN0LXRvdWNoLWV2ZW50cy9saWIvaW5kZXguanM/ZGUzZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9kZXRlY3QtdG91Y2gtZXZlbnRzL2xpYi9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBkZXRlY3RUb3VjaEV2ZW50cyA9IHtcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkZXRlY3RUb3VjaEV2ZW50cy5oYXNTdXBwb3J0ID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93O1xuICAgICAgZGV0ZWN0VG91Y2hFdmVudHMuYnJvd3NlclN1cHBvcnRzQXBpID0gQm9vbGVhbih3aW5kb3cuVG91Y2hFdmVudCk7XG4gICAgfVxuICB9XG59O1xuXG5kZXRlY3RUb3VjaEV2ZW50cy51cGRhdGUoKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRldGVjdFRvdWNoRXZlbnRzOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/detect-touch-events/lib/index.js\n");

/***/ })

/******/ });