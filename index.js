const express = require("express");
const app = express();
const PORT = 3000;

const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

const mongoose = require("mongoose");
mongoose
	.connect("mongodb+srv://ferBernal:050812@sneakers.dqkn1je.mongodb.net/test", {
		useNewUrlParser: true,
	})
	.then(() => console.log("\n", "connect db", "\n"));

const shoesModel = require("./models/shoesModel.js");
const usersModel = require("./models/usersModel.js");
const brandsModel = require("./models/brandsModel.js");

const create = sneaks.getMostPopular(300, function (err, products) {
	products.forEach((el) => {
		let {
			shoeName,
			colorway,
			thumbnail,
			brand,
			retailPrice,
			description,
		} = el;
		description = description.trim();
		brand = brand.toLowerCase().trim();
		shoesModel.create({
			name: shoeName,
			description:
				description !== "" ? description : "Shoes without description",
			color: colorway !== "" ? colorway : "white",
			image: thumbnail,
			brand: brand,
			price: retailPrice,
			stock: [
				{
					size: 34,
					q: 50,
				},
				{
					size: 35,
					q: 50,
				},
				{
					size: 36,
					q: 50,
				},
				{
					size: 37,
					q: 50,
				},
				{
					size: 38,
					q: 50,
				},
				{
					size: 39,
					q: 50,
				},
				{
					size: 40,
					q: 50,
				},
				{
					size: 41,
					q: 50,
				},
				{
					size: 42,
					q: 50,
				},
			],
		});

		brandsModel.create(
			{
				name: brand,
			},
			function (err) {
				if (err) return console.error(err);
			}
		);
	});
});

usersModel.create(
	{
		firstname: "Fernand",
		lastname: "Bernal",
		email: "fer4@bernal.com",
		manager: true,
		image:
			"https://www.google.com/search?q=google&sxsrf=ALiCzsZlaLZFTOf-BMMx_HMa_lJG5IxEUw:1661870002822&source=lnms&tbm=isch&sa=X&ved=2ahUKEwib57iZ5O75AhVliJUCHRE6AWgQ_AUoAXoECAIQAw&biw=1225&bih=564&dpr=1.57#imgrc=z4-9vqzb8lYtvM",
		status: "Enabled",
		password: "123",
	},
	function (err) {
		if (err) return console.error(err);
	}
);

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
