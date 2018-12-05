import {succes, info, error} from "../utils/logger";
import endpoints from './endpoints/index';
import db from '../db/index';

//import de la connexion db

export default ()=>{
    //on execute la connexion
    db()
        .then(()=>{

            endpoints.forEach((endpoints) =>{
                endpoints();
            })

            info('API chargée');
            //oon boucle su rle tableau des endpoint pou rinitialiser les routes

        });

};