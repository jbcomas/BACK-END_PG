const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
  })
  .then(() => console.log("\n", "connect db", "\n"));

module.exports = module.exports = {
  ...mongoose.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: mongoose, // para importart la conexión { conn } = require('./db.js');
};
