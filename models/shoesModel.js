var mongoose = require("mongoose");
const { Schema } = mongoose;

const shoesSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	color: String,
	image: String,
	brand: String,
	price: String,
	styleID: String,
	stock: [
		{
			size: { type: Number, required: true },
			q: { type: Number, required: true },
		},
	],
});

const shoesModel = mongoose.model("shoe", shoesSchema);

module.exports = shoesModel;
