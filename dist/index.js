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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Chalk = __webpack_require__(11);
var moment = __webpack_require__(13);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(12);
var bodyParser = __webpack_require__(10);
var index_1 = __webpack_require__(7);
var logger_1 = __webpack_require__(0);
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
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Point d'entrée de du serveur node
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(1);
index_1.default();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(1);
exports.default = (function () {
    index_1.appRouter.get('/comment', function (req, res) {
        return res.json({
            "commentaire": 'c\'ets goud'
        });
    });
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = __webpack_require__(6);
var comment_1 = __webpack_require__(4);
// on importe tous les endpoint et
// on exporte sous form de tableau
//permet de les initialiser d'un coup
exports.default = [product_1.default, comment_1.default];


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(1);
var models_1 = __webpack_require__(9); // on import le model de la bdd
var logger_1 = __webpack_require__(0);
exports.default = (function () {
    index_1.appRouter.get('/product/:code', function (req, res) {
        try {
            models_1.productModel.findOne({ code: req.params.code })
                .exec()
                .then(function (product) {
                if (product) {
                    //product trouve
                    return res.json(product);
                }
                else {
                    //product non trouve
                    res.status(404).json({
                        status: 'fail',
                        message: "Produit " + req.params.code + " introuvalble"
                    });
                }
            })
                .catch(function (err) {
                //on renvoie en status oour  que le client puisse avoir une info sur l'erreur
                return res.status(500).json({
                    status: 'fail',
                    message: "Erreur lors de la requete : " + err.toString()
                });
            });
        }
        catch (e) {
            return res.status(500).json({
                status: 'fail',
                message: "Le serveur d\u00E9conne : " + e.toString()
            });
        }
    });
    index_1.appRouter.post('/product/insert/:code', function (req, res) {
        console.log(" le code en get " + req.params.code + " et post " + req.body);
        try {
            //donnee a inserer ds le req.body
            models_1.productModel.updateOne({ code: req.params.code }, //querydu code = req.params.code
            formatProduct(req.body, req.params.code), // document a inserer
            { upsert: true } // insertion ou maj
            ).then(function (insertionresult) {
                if (insertionresult.ok > 0) {
                    //message succes
                    return res.json({
                        status: 'succes',
                        message: "Produit " + req.params.code + " inserer ds la bdd"
                    });
                }
                else {
                    //message erreur
                    return res.status(500).json({
                        status: 'fail',
                        message: "Le serveur d\u00E9conne "
                    });
                }
            }).catch(function (err) {
                //message erreur
            });
        }
        catch (e) {
            logger_1.error('erreur lors de l\'ajout d\'un produit' + (req.params.code + " : " + e.toString()));
            return res.status(500).json({
                status: 'fail',
                message: "Le serveur d\u00E9conne : " + e.toString()
            });
        }
    });
});
function formatProduct(foodToInsert, code) {
    //foodToInsert fournit par postman
    return {
        _id: code,
        code: code,
        name: foodToInsert.name,
        brand: foodToInsert.brand,
        description: foodToInsert.description,
        nutrition: {
            fibers: foodToInsert.fibers,
            proteins: foodToInsert.proteins,
            sugar: foodToInsert.sugar,
            saturedFats: foodToInsert.saturedFats,
            calories: foodToInsert.calories,
            salt: foodToInsert.salt
        }
    };
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(0);
var index_1 = __webpack_require__(5);
var index_2 = __webpack_require__(8);
//import de la connexion db
exports.default = (function () {
    //on execute la connexion
    index_2.default()
        .then(function () {
        index_1.default.forEach(function (endpoints) {
            endpoints();
        });
        logger_1.info('API chargée');
        //oon boucle su rle tableau des endpoint pou rinitialiser les routes
    });
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __webpack_require__(0);
//connection a la db//instance plus chemin et port user +mdp
//un watch pour se reconnecter si le serveur repart
//ajouter une dependence de npm
var mongoose = __webpack_require__(2);
//fonction de connexion a mongo
function connect() {
    //uris : adresse serveur mongo
    mongoose.connect('mongodb://localhost:27017/miw', { autoReconnect: true, useNewUrlParser: true });
}
// on export par defaut le travail de la fonction
exports.default = (function () {
    //connexion a la base de donnée par promesses
    return new Promise(function (resolve, reject) {
        //on configure mongoose pour fonctionner avec les prmesse au lieu des call back
        mongoose.Promise = global.Promise;
        //on assigne la connexion a la variable db
        exports.db = mongoose.connection;
        exports.db.on('connecting', function () {
            logger_1.info('connection à mongdb...');
        });
        exports.db.on('error', function (err) {
            logger_1.error(err);
            // se decconcter proprement de la dbb si pb
            mongoose.disconnect();
        });
        exports.db.on('disconnected', function () {
            //on essaie periodiquement de se reconnecter à la dbb mongodb
            setTimeout(function () {
                connect();
            }, 5000);
        });
        //losque l'on est connecté à la base de données
        //once est listener qui s"execite une seule fois
        exports.db.once('open', function () {
            logger_1.succes('connection à la base de données');
            // et on resout la promesse
            return resolve();
        });
        // enfin on lance la connexion
        connect();
    });
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//
var mongoose = __webpack_require__(2);
//il faut definir le schema de la collection product
//permet de valider le format des donnes de mongo
var productSchema = new mongoose.Schema({
    _id: String,
    code: Number,
    name: String,
    description: String,
    brand: String,
    //pour 100 g de produit
    nutrition: {
        fibers: Number,
        proteins: Number,
        sugar: Number,
        saturedFats: Number,
        calories: Number,
        salt: Number
    }
});
//creation du model associée
exports.productModel = mongoose.model('products', productSchema, 'products');


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ })
/******/ ])));