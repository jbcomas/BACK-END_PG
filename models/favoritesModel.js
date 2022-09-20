var mongoose = require("mongoose");
const shoesModel = require("./shoesModel");

const { Schema } = mongoose;

const favoritesSchema = new Schema({
 idUser: { type: String },
 shoeId: { type: Schema.Types.ObjectId, ref: shoesModel },
});

const favoritesModel = mongoose.model("favorites", favoritesSchema);

module.exports = favoritesModel;
