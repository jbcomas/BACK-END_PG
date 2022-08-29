const express = require("express");
const app = express();
const PORT = 3000;

const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://jb:Feli2908@cluster0.di2b3ac.mongodb.net/Sneaks",
  { useNewUrlParser: true }
);

const shoesModel = require("./models/shoesModel.js");

const create = sneaks.getMostPopular(300, function (err, products) {
  console.log(products);
  products.forEach((el) => {
    let {
      _id,
      shoeName,
      colorway,
      thumbnail,
      brand,
      retailPrice,
      description,
      styleID,
    } = el;
    let marca = brand;
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
          cant: 50,
        },
      ],
    });
  });
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
