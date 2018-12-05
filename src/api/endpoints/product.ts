import {appRouter} from "../../index";
import {productModel} from "../../db/models";  // on import le model de la bdd
import {error} from "../../utils/logger";

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
    };


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

