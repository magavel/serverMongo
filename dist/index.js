(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(9);
var bodyParser = __webpack_require__(7);
var index_1 = __webpack_require__(6);
var logger_1 = __webpack_require__(1);
//instatiation framework express
var app = express();
//instantiation router et on l'export
exports.appRouter = express.Router();
//on dit a app de utiliser le router cest un middleware
app.use(exports.appRouter);
// on configure body parser pour des recup des post
exports.appRouter.use(bodyParser.urlencoded({ extended: true }));
exports.default = (function () {
    app.listen(7851, function () {
        //on fait ecoutter notre serveur
        //callback execiter dans il entend
        logger_1.succes('serveur demarré et oui');
        index_1.default();
    });
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Chalk = __webpack_require__(8);
var moment = __webpack_require__(10);
var chalk = Chalk.constructor();
//exporter 3 fonction
// 1: succes -> param msg (string)
//2: info para msg
///3 : error param msg
//pour mettre en couleur    success
// chalk.green(string)       error
//chalk.red(string)            info
//ppour afficher l(heuree
//moment().formtat('HH:mm');
//    --->  ds chzcune des methode   console.log(chalk(heure +message)
exports.succes = function (msg) {
    var now = moment().format('HH:mm');
    console.log(chalk.green(now + " " + msg));
};
exports.info = function (msg) {
    var now = moment().format('HH:mm');
    console.log(chalk.blue(now + " " + msg));
};
exports.error = function (msg) {
    var now = moment().format('HH:mm');
    console.log(chalk.red(now + " " + msg));
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Point d'entrée de du serveur node
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
index_1.default();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
exports.default = (function () {
    index_1.appRouter.get('/comment', function (req, res) {
        return res.json({
            "commentaire": 'c\'ets goud'
        });
    });
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = __webpack_require__(5);
var comment_1 = __webpack_require__(3);
// on importe tous les endpoint et
// on exporte sous form de tableau
//permet de les initialiser d'un coup
exports.default = [product_1.default, comment_1.default];


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
exports.default = (function () {
    index_1.appRouter.get('/product/:code', function (req, res) {
        var message = "information sur le produit " + req.params.code;
        return res.json({
            "message": message
        });
    });
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(1);
var index_1 = __webpack_require__(4);
exports.default = (function () {
    index_1.default.forEach(function (endpoints) {
        endpoints();
    });
    logger_1.info('API chargée');
    //oon boucle su rle tableau des endpoint pou rinitialiser les routes
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ })
/******/ ])));