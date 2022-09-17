const { Router } = require("express");
const chalk = require("chalk");
const {
	getAllShoes,
	getById,
	createShoe,
	deleteShoe,
	getByName,
	updateShoe,
} = require("../controllers/controllers.js");
const upload = require("../img/storage.js");
const cloudinary = require('cloudinary')
const fs = require('fs-extra')

cloudinary.config({
	cloud_name: "dj960qol0",
	api_key: "521339563273244",
	api_secret: "SCNE3oZRw9JYQjsckO7ANrPusYg"
})

const router = Router();
const successChalk = chalk.green;
const errorChalk = chalk.bold.red;
const warningChalk = chalk.hex("#FFA500");

router.get("/", async (req, res) => {
	const { brand, name } = req.query;
	try {
		const allShoes = await getAllShoes(brand);
		if (name) {
			const shoeName = await getByName(name);
			console.log(successChalk("Shoes by name were shown"));
			return res.status(200).send(shoeName);
		}
		if (brand) {
			console.log(successChalk("Shoes by brand were shown"));
			return res.status(200).send(allShoes);
		}
		if (!name && !brand) {
			console.log(successChalk("All shoes were shown"));
			return res.status(200).send(allShoes);
		}
		console.log(errorChalk("Route error!"));
		res.status(404).json({ error: error.message });
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

router.post("/", upload.single('image') ,async (req, res) => {
	const { name, description, color, brand, file,image, price, stock } = req.body;
	console.log(req.file);
	console.log(req.body);
	try {

		const result = await cloudinary.v2.uploader.upload(req.file.path)
		console.log(result);
		let path = result.url
		const create = await createShoe(
			name,
			description,
			color,
			path,
			brand,
			price,
			stock
		);
		if (name === "" || description === "" || brand === "") {
			console.log(errorChalk("Sneaker wasn't created"));
			return res.status(400).json({ error: "Name or description is empty" });
		}
		await fs.unlink(req.file.path)
		console.log(successChalk("New sneaker was created"));
		res.status(200).send(create);
	} catch (error) {
		console.log(errorChalk(error));
		res.status(404).json({ error: error});
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const shoeId = await getById(id);
		if (shoeId.length) {
			console.log(successChalk("Shoes by id were shown"));
			return res.status(200).send(shoeId);
		}
		console.log(errorChalk("This shoe id doesn't exist"));
		return res.status(404).json({ error: error.message });
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		return res.status(404).json({ error: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		if (id) {
			const deleted = await deleteShoe(id);
			console.log(successChalk("Shoes by id were deleted"));
			res.status(200).send(deleted);
		}
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const shoe = req.body;
	try {
		if (shoe.name === "" || shoe.description === "" || shoe.brand === "") {
			console.log(errorChalk("Sneaker wasn't modified"));
			return res.status(400).json({ error: "Some mandatory info is empty" });
		}
		const update = await updateShoe(id, shoe);
		console.log(successChalk("Shoes by id were modified"));
		res.status(200).send(update);
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

module.exports = router;
