import {appRouter} from "../../index";

//om import le fichier productModel pour faire les comparaison
import {productModel, commentModel } from "../../db/models";
import {productExists} from "./product";
import {error, info, succes} from "../../utils/logger";

export default ()=>{

    appRouter.get('/comment/:productCode', (req, res)=>{
        //1 verifier que le produits existe
        // recuperation de tous les commentaires par la methode find()
        // 3: renvoi des commentaires en json + gestion des erreurs


        productExists(req.params.productCode)
            .then((exists)=>{
                console.log('le produit existe: ' + exists)
                if(!exists){
                    return res.json({
                        status: 'fail',
                        message: `le produit ${req.params.productCode} n existe pas`
                    });
                }

                commentModel.find({
                    code: req.params.productCode
                })
                    .exec()
                    .then((comments)=>{
                        info(comments);
                        if(comments.length>0){
                            return res.json({
                                status: 'succes',
                                comments // comments:comments
                            })
                        }else {
                            //pas de commentaire
                            return res.json({
                                status : 'fail',
                                message : 'ya pas de commentaires'
                            })
                        }
                    })
                    .catch((err)=>{
                        return res
                            .status (500)
                            .json({
                                status: 'fail',
                                message: `erreur serveur ${err.toString()}`
                            })
                    })

            });


    });


    //creation d'une route en precisianr la methode
    //par exemple ecrire une route option qui supprime les dossiers ds un fichier
    appRouter.post('/comment/insert/:productCode', (req, res)=>{
        //on veridie si l eproduit existe
        productExists(req.params.productCode)
            .then((exists)=>{
                   console.log('le produit existe: ' + exists)
                if(!exists){
                        return res.json({
                            status: 'fail',
                            message: `le produit ${req.params.productCode} n existe pas`
                        });
                }

                //1 recuperer name et message ds le body de la requete
                // =--> req.body
                // verifier que name et message soient definis
                // --> si faux : erreur
                // --> sinon on continue

                if(!req.body.name || !req.body.message){
                    return res.json({
                        status: (403),
                        message : 'certains parametre du comment sont manquant'

                    });

                }

                const insertRequest = new commentModel({
                    date: Date.now(),    // permet de creer une date a partir de 1970
                    code: req.params.productCode,
                    message: req.body.message,
                    name: req.body.name
                });

                insertRequest
                    .save()
                    .then((inserted)=>{
                       //insertion reussi

                        return res.json({
                            status: 'succes',
                            message: 'le commentaire est envoyé'
                        })
                    })
                    .catch((err)=>{
                        //insertion echouée
                        return res.json({
                            status: 'echec',
                            message: `le commentaire nest pas envoyé ${err.toString()}`
                        })
                    });
                // premier retour pour eviter les plantage du serveur mais à supprimer ensuite pour eviter les conflits sur les res
                //return res.send({'status': 'succes renvoye par la promise'});
            });
    });
};


