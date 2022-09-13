var mongoose = require("mongoose");
const shoesModel = require("./shoesModel");
const usersModel = require("./usersModel");

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  idPayment: {type: String},
  shoe: {type: Array},
  amount:{type: Number}
})
 

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
