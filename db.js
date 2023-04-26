require('dotenv').config();
const mongoose = require("mongoose");
const uri = process.env.MONGODB;


mongoose.connect(uri, {
	useNewUrlParser: true,
	dbName: "DisruptiveStudio",
});

mongoose.connection
	.once("open", () => {
		console.log("\n", "connect db", "\n");
	})
	.on("error", (error) => {
		console.log("\n", "Error in connect db:", error, "\n");
	});

module.exports = module.exports = {
	...mongoose.models,
};
