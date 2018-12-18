#Ajout d'elements de cours
##Logiciels utilisés

Studio 3T

Postman


##dependance utilisées

multer  gestion des fichiers

avec commande  npm install multer --save

et on import avec la commande 

    import * as multer from 'multer';
## Installer mongo db

installation mac

    brew install mongodb
    
##config base de données

user avel

mdp 123


Avec studio 3T se connecter sur la base de données et créer une bdd 

nom: miw

collection : products

document:

    {
        "nutrition": {
            "fibers": 10,
            "proteins": 10,
            "sugar": 10,
            "saturedFats": 10,
            "calories": 10,
            "salt": 10
        },
        "_id": "100000",
        "code": 1000000,
        "name": "nom du produit",
        "brand": "marque du prodiuit",
        "description": "description du produit"
    }


##Commandes de demarages

mongod permet de démarrer le serveur de données mongo

nmp install pour installer toutes les dependances

npm start ==> démarre le server node

mongod ==> démarre le serveur node






##Quelques élements de cours
###Promesses



exemple de call back


    exemplecallBack(()=>{
        error('jai attendu 5s')
    });


    function exemplecallBack(callback){
        console.log('debut');
        setTimeout(()=>{
            callback();
        }, 5000);
    }


la promesse permet de remplacer les callback pour eviter les callback hell

    exemplePromesse()
        .then(une fonction de callback)   //permet de recuperer la valeur
        .then((valeur renvoyeée)=>{
            console.log(valeurrenvoyée);
            })
         .catch((err)=>{
            console.log('erreur '')
            })
        
        
    
    
    
    function exemplePromesse(){
        return new Promise((resolve, reject)=>{
        setTimeout(()=>{
                return resolve(6)
            }, 2000);
        });
    }



voir asyn et away ds les promesses

postman

pour envoyer un fichier
methode post et cliquer sur form-data et selectionner file

attention à la key  doit être identique  au paramètre de single
attention à ne pas mettre d'espace 

        const formConfig= multer().single('photo');
        



pour ajouter des fichiers dans node on utilise le module fs ==> file system

on doit l'importer

    import * as fs from 'fs';






pour supprimer un fichier on utilise $pull













