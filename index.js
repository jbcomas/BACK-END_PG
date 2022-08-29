var express = require("express");
var app = express();
var PORT = 3000;

const SneaksAPI = require('sneaks-api');
const sneaks = new SneaksAPI();

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jb:Feli2908@cluster0.di2b3ac.mongodb.net/Sneaks', { useNewUrlParser: true });
// const { shoesModel } = mongoose.models
const shoesModel = require('./models/shoesModel.js')
// sneaks.getProducts("Yeezy Cinder", 10, function(err, products){
//  console.log(products)
// })

const create = sneaks.getMostPopular(300, function (err, products) {
  console.log(products);
  products.forEach(el => {

    let { _id, shoeName, colorway, thumbnail, brand, retailPrice, description, styleID } = el
    let marca = brand
    
    shoesModel.create({
      nombre: shoeName,
      descripcion: description,
      color: colorway,
      imagen: thumbnail,
      marca: marca,
      precio: retailPrice,
      styleID: styleID,
      stock: [
        {
          num: 38,
          cant: 50
        }]
    })

  });

})



app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});


