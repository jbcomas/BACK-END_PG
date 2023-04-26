const mongoose = require("mongoose");
const { Schema } = mongoose;

const investmentSchema = new Schema({
	user: { type: String, required: true },
	coin: { type: String, required: true },
	dollar_amount: { type: Number, required: true },
	coin_amount: { type: Number, required: true },
	price_start: { type: Number, required: true },
	price_current: { type: Number, required: true },
	compound_interest_dollars: { type: Number, required: true },
	compound_interest_coins: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
});

const investmentModel = mongoose.model("investment", investmentSchema);

module.exports = investmentModel;
