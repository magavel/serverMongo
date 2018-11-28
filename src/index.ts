import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from './api/index';
import {succes, info, error} from "./utils/logger";

//instatiation framework express
const app =express();

//instantiation router et on l'export
export const appRouter = express.Router();

//on dit a app de utiliser le router cest un middleware
app.use(appRouter);
// on configure body parser pour des recup des post
appRouter.use(bodyParser.urlencoded({extended:true}));

export default ()=>{
  app.listen(7851,()=>{
    //on fait ecoutter notre serveur
      //callback execiter dans il entend
    succes('serveur demarré et oui');
        api()


  })


};

