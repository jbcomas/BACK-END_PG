var mongoose = require("mongoose");
const { Schema } = mongoose;

const shoesSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  color: { type: String },
  image: { type: String },
  brand: { type: String },
  price: { type: Number },
  stock: [
    {
      size: { type: Number },
      q: { type: Number  },
    },
  ],
  onSale: { type: Boolean, default: false },
});

const shoesModel = mongoose.model("shoe", shoesSchema);

module.exports = shoesModel;
