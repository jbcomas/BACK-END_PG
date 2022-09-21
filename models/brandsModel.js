var mongoose = require("mongoose");
const { Schema } = mongoose;

const brandsSchema = new Schema({
  name: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, default: "This brand is unique" },
});

const brandsModel = mongoose.model("brand", brandsSchema);

module.exports = brandsModel;
