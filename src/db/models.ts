//
import * as mongoose from 'mongoose';

//il faut définir le schema de la collection product
//permet de valider le format des données de mongo


const productSchema = new mongoose.Schema({
    _id: String,
    images: [String],
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

//création du model associé



//creer un schema pour les commentaire "commentSchema"
//date entier
//code entier
//name string
//message string

const commentSchema = new mongoose.Schema({
    date: Number,
    code:Number,
    name: String,
    message: String

});


export const commentModel = mongoose.model(
  'comments',
  commentSchema,
  'comments'
);


export const productModel = mongoose.model(
    'products',
    productSchema,
    'products'
);
