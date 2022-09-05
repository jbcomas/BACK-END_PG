var mongoose = require("mongoose");
const { populate } = require("sneaks-api/models/Sneaker");
const { Schema } = mongoose;

const cartSchema = new Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String, default: "undefined" },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  size: { type: Schema.ObjectId, ref: "shoe" },
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
