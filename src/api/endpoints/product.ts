import * as multer from 'multer';
import * as fs from 'fs';
import {appRouter} from "../../index";
import {commentModel, productModel} from "../../db/models";  // on import le model de la bdd


import {error, info} from "../../utils/logger";
import {json} from "express";

export default ()=>{
    appRouter.get('/product/:code', (req, res)=>{

            try {
                productModel.findOne(
                    {code:req.params.code}
                )
                    .exec()
                    .then((product)=>{
                        if(product){
                            //product trouve
                            return res.json(product);
                        }else {
                            //product non trouve
                            res.status(404).json({
                                status: 'fail',
                                message: `Produit ${req.params.code} introuvalble`
                            });
                        }
                    })
                    .catch((err)=>{
                        //on renvoie en status oour  que le client puisse avoir une info sur l'erreur
                        return res.status(500).json({
                            status: 'fail',
                            message: `Erreur lors de la requete : ${err.toString()}`
                        });
                    });
            }catch (e) {
                return res.status(500).json({
                    status: 'fail',
                    message: `Le serveur déconne : ${e.toString()}`
                });
            }
        });


    appRouter.post('/product/insert/:code', (req, res)=>{
        console.log(` le code en get ${req.params.code} et post ${req.body.name}`);

        try {
            //donnee a inserer ds le req.body
            productModel.updateOne(
                {code:req.params.code }, //querydu code = req.params.code
                formatProduct(req.body, req.params.code),  // document a inserer
                {upsert: true} // insertion ou maj
            ).then((insertionresult)=>{
                if(insertionresult.ok>0){
                    //message succes
                    return res.json({
                        status: 'succes',
                        message: `Produit ${req.params.code} inserer ds la bdd`
                    })

                }else {
                    //message erreur
                    return res.status(500).json({
                        status: 'fail',
                        message: `Le serveur déconne `
                    });
                    }
                }).catch((err)=>{
                //message erreur
            });
        }catch (e) {
            error( 'erreur lors de l\'ajout d\'un produit'+ `${req.params.code} : ${e.toString()}` );
            return res.status(500).json({
                status: 'fail',
                message: `Le serveur déconne : ${e.toString()}`
            });

        }
    });

    //gestion par multer acceptation d'un champ photo qui recoit un fichier image
    const formConfig= multer().single('photo');
    appRouter.post('/product/insertPhoto/:code', formConfig,(req, res)=>{
        productExists(req.params.code)
            .then((exists)=>{
                console.log('le produit existe: ' + exists)
                if(!exists){
                    return res.json({
                        status: 'fail',
                        message: `le produit ${req.params.code} n existe pas`
                    });
                }
                //grace à multer on a une nouvelle variable req.file
                if(!req.file){
                    // le fichier est manquant
                    return res
                        .status(403)
                        .json({
                            status: 'fail',
                            message:' champ photo manquant'
                    });
                }
                //console.log(req.file);
                if(!isMimeTypeValid(req.file.mimetype)){
                    return res
                        .status(403)
                        .json({
                            status: 'fails',
                            message: 'probleme de type incorrect'
                        })
                }
                if(!isFileSizeValid(req.file.size)){
                    return res
                        .status(403)
                        .json({
                            status: 'fail',
                            message :'fichier trop gros'
                        })
                }
                // faire un return pour les tests en attendant de continuer le code pour eviter les boucles infinies
                //return res.send('ok')

                //on considere que le fichier est valide et on le stoque sur le serveur
                const fileName = `${Date.now()}-${req.file.originalname}`;
                fs.writeFile(
                    `./static/images/${fileName}`, // nom du chemin complet
                    req.file.buffer,   //donnees a ecrire
                    (err)=>{   //callback avce erreur potentiel
                        if(err){
                            res
                                .status(500)
                                .json({
                                status: 'fail',
                                message:'erreur ds l envoie du fichier'
                            });
                        }

                        //on ajoute ds le tableau image le niom du fichier que l'on vient d'enregistrer
                        productModel.findOneAndUpdate(
                            {code: req.params.code},
                            {$push:{images: fileName}}

                        ).exec();
                        return res.json({
                            status: 'succes,',
                            message:' Fichier envoyé avec succes'
                        });
                    }
                    )


            });
    });

    };


function  isFileSizeValid(size) {
    const SIZE_MAX = 3; // en m octet

     return (size/1024/1024<SIZE_MAX)
}


function isMimeTypeValid(mimetype){
    //return true pour jpeg, jpg, png
    // false pour le reste
    const ACCEPTED_TYPE = ['image/jpeg', 'image/jpg', 'image/png'];

    return ACCEPTED_TYPE.indexOf(mimetype)!== -1
   // console.log(ACCEPTED_TYPE.indexOf(mimetype)!== -1)



   // for (let i = 0 ; i<ACCEPTED_TYPE.length; i++){
     //   if(mimeType===`image/${ACCEPTED_TYPE[i]}`)
       //     return true
        //else return false
    //}
}

function formatProduct (foodToInsert, code) {
    //foodToInsert fournit par postman
    return{
        _id: code,
        code, //code:code
        name: foodToInsert.name,
        brand: foodToInsert.brand,
        description: foodToInsert.description,
        nutrition: {
            fibers: foodToInsert.fibers,
            proteins: foodToInsert.proteins,
            sugar: foodToInsert.sugar,
            saturedFats: foodToInsert.saturedFats,
            calories:foodToInsert.calories,
            salt:foodToInsert.salt
        }
    };
}



//fonction qui veridie si le code barre existe

export function productExists(productCode) {
    return new Promise((resolve, reject)=>{
        //1 importer productModel
        productModel.findOne(
            {code:productCode}
        )
            .exec()  //la requete renvoie une promesse
            .then((product)=>{
                //verifier si le product existe
                info(product);
                if(product){
                    return resolve(true);
                }else {
                    return resolve(false)
                }
            })
            .catch((err)=>{
                //gestion de l'erreur
                error('erreur su la promesse de comment')
            })
        //2 faire une requete pour trouver un doc avec productcode
        //3 resoudre avec true/false si il est trouvé

    });

}