var mongoose = require("mongoose");
const shoesModel = require("./shoesModel");
const usersModel = require("./usersModel");

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: usersModel },
  shoe: {type: Schema.Types.ObjectId, ref: shoesModel},
  size: { type: Number },
  q:     { type: Number }
})
 

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
