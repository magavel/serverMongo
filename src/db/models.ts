//
import * as mongoose from 'mongoose';

//il faut definir le schema de la collection product
//permet de valider le format des donnes de mongo


const productSchema = new mongoose.Schema({
    _id: String,
    code:Number,
    name: String,
    description: String,
    brand: String,
    //pour 100 g de produit
    nutrition:{
        fibers:Number,
        proteins: Number,
        sugar: Number,
        saturedFats:Number,
        calories: Number,
        salt:Number
    }
});

//creation du model associée

export const productModel = mongoose.model(
    'products',
    productSchema,
    'products'
);
