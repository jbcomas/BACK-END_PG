var mongoose = require("mongoose");
const shoesModel = require("./shoesModel")
const { Schema } = mongoose;

const reviewsSchema = new Schema({
  idUser: { type: String, required: true },
  shoeId: { type: Schema.Types.ObjectId, ref: shoesModel },
  review: { type: String },
  reviewDate: { type: Date, default: Date.now },
  rating: { type: Number },
});

const reviewsModel = mongoose.model("review", reviewsSchema);

module.exports = reviewsModel;
