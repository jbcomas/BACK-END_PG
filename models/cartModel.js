var mongoose = require("mongoose");
const {userSchema} = require("../models/usersModel.js");
const {shoesSchema} = require("../models/shoesModel.js");

const { Schema } = mongoose;

const cartSchema = new Schema({
  usersModel_id: {type: String},
  picks: [{ type: String }],
  userRelation: userSchema,
  shoeRelation: shoesSchema
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
