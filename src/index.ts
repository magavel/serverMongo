import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from './api/index';
import {succes, info, error} from "./utils/logger";

//instatiation framework express
const app =express();

//instantiation router et on l'export
export const appRouter = express.Router();

/**

 Vous commencez par demander l'inclusion d'Express et vous créez un objet app en appelant la fonction express().

 Ensuite, il vous suffit d'indiquer les différentes routes (les différentes URL) à laquelle
 votre application doit répondre. Ici, j'ai créé une seule route,
 la racine "/".
 Une fonction de callback est appelée quand quelqu'un demande cette route.


 exemple
 var express = require('express');

 var app = express();

 app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});

 app.listen(8080);

*/



//on dit a app de utiliser le router cest un middleware
app.use(appRouter);
// on configure body parser pour des recup des post
appRouter.use(bodyParser.urlencoded({extended:true}));

// on sert les fichiers presents ds le rep static

appRouter.use('/static', express.static('static'));

export default ()=>{
  app.listen(7851,()=>{
    //on fait ecoutter notre serveur
      //callback executer dans il entend
    succes('serveur demarré et oui');
            // on demarre l'api
        api()


  })


};

