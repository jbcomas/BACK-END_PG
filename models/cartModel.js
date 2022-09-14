var mongoose = require("mongoose");
const shoesModel = require("./shoesModel");
const usersModel = require("./usersModel");

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: String },
  idPayment: {type: String},
  shoe: {type: Array},
  amount:{type: Number},
  status: {type: String, enum: ["Pending", "Received"], default:"Pending" }
})
 

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
