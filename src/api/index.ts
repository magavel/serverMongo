import {succes, info, error} from "../utils/logger";
import endpoints from './endpoints/index';

export default ()=>{

    endpoints.forEach((endpoints) =>{
        endpoints();
    })

    info('API chargée');
    //oon boucle su rle tableau des endpoint pou rinitialiser les routes


};