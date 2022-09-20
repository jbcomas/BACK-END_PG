var mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
	email: { type: String },
	userId: { type: String },
	idPayment: { type: String },
	shoe: { type: Array },
	amount: { type: Number },
	status: { type: String, enum: ["Pending", "Received"], default: "Pending" },
	date: {type: Date, default: new Date()}
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
