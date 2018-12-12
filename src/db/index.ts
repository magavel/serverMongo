import {succes, info, error} from "../utils/logger";

//connection a la db//instance plus chemin et port user +mdp
//un watch pour se reconnecter si le serveur repart

//ajouter une dependence de npm
import * as mongoose from 'mongoose';
import {mongo} from "mongoose";

//reference a notre connexion a la base de données

export let db;

//fonction de connexion a mongo
function connect() {

    //uris : adresse serveur mongo
    mongoose.connect('mongodb://localhost:27017/miw', {autoReconnect:true, useNewUrlParser:true});
}

// on export par defaut le travail de la fonction

export default ()=>{
    //connexion a la base de donnée par promesses
    return new Promise((resolve, reject)=>{
       //on configure mongoose pour fonctionner avec les promesses au lieu des call back
        (mongoose.Promise as any)=global.Promise;
        //on assigne la connexion a la variable db
        db=mongoose.connection;

        db.on('connecting', ()=>{
            info('connection à mongdb...');
        });
        db.on('error', (err)=>{
            error(err);
            // se decconcter proprement de la dbb si pb
            mongoose.disconnect();
        });
        db.on('disconnected', ()=>{
            //on essaie periodiquement de se reconnecter à la dbb mongodb
            setTimeout(()=>{
                connect();
            }, 5000);
        });
        //losque l'on est connecté à la base de données
        //once est listener qui s"execute une seul fois
        db.once('open', ()=>{
            succes('connection à la base de données');
            // et on resout la promesse
            return resolve();
        });
        // enfin on lance la connexion

        connect();
    });

}



