const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.yjdlxrm.mongodb.net/sneakers",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("\n", "connect db", "\n"));

module.exports = module.exports = {
  ...mongoose.models,
  conn: mongoose,
};
