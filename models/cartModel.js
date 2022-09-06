var mongoose = require("mongoose");
const shoesModel = require("./shoesModel");
const usersModel = require("./usersModel");

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: usersModel },
  picks: [{ type: Schema.Types.ObjectId, ref: shoesModel }],
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
