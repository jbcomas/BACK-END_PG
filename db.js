const mongoose = require("mongoose");
const {MONGODB} = process.env;
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  
  mongoose.connection
    .once("open", ()=>{
      console.log("\n", "connect db", "\n");
    })
    .on('error',error =>{
      console.log("\n", "Erro in connect db:",error, "\n");
    })
module.exports = module.exports = {
  ...mongoose.models,
  conn: mongoose,
};
