var mongoose = require("mongoose");
const { Schema } = mongoose;

const shoesSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  color: { type: String },
  image: { type: String },
  brand: { type: String },
  price: { type: String },
  stock: [
    {
      size: { type: Number, required: true },
      q: { type: Number, required: true },
    },
  ],
});
// { typeKey: '$type' }
const shoesModel = mongoose.model("shoe", shoesSchema);

module.exports = shoesModel;
