var mongoose = require('mongoose');
const { Schema } = mongoose;



const shoesSchema = new Schema({
    nombre: String,
    descripcion: String,
    color: String,
    imagen: String,
    marca: String,
    precio: String,
    styleID: String,
    stock: Array
  });

  const shoesModel = mongoose.model('shoe', shoesSchema)





  
  module.exports  = shoesModel