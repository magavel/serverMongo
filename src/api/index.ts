import {succes, info, error} from "../utils/logger";
import endpoints from './endpoints/index';
import db from '../db/index';

//import de la connexion db

export default ()=>{
    //on execute la connexion par db
    db()
        .then(()=>{

            endpoints.forEach((endpoints) =>{ // on charge toutes les routes via un tableau qui vient du fichier index.ts de endpoints
                endpoints();
            })

            info('API chargée');
            //on boucle sur le tableau des endpoint pou réinitialiser les routes

        });

};