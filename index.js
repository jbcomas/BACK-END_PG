var express = require("express");
var app = express();
var PORT = 3000;

const SneaksAPI = require('sneaks-api');

const sneaks = new SneaksAPI();

sneaks.getProducts("Yeezy Cinder", 10, function(err, products){
 console.log(products)
})

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});