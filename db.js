const mongoose = require("mongoose");
const uri =
	"mongodb+srv://m001-student:m001-mongodb-basics@sandbox.yjdlxrm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
	useNewUrlParser: true,
	dbName: "sneakers",
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
