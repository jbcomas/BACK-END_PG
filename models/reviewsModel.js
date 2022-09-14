var mongoose = require("mongoose");
const shoesModel = require("./shoesModel")
const { Schema } = mongoose;

const reviewsSchema = new Schema({
  idUser: { type: String, required: true },
  shoeId: { type: Schema.Types.ObjectId, ref: shoesModel },
  review: { type: String },
  rating: { type: Number },
  reviewDate: { type: Date, default: Date.now },
});

const reviewsModel = mongoose.model("review", reviewsSchema);

module.exports = reviewsModel;
