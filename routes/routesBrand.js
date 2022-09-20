const { Router } = require("express");
const {
	getAllBrand,
	getBrandId,
	deleteBrandId,
	updateBrand,
	createBrand,
} = require("../controllers/controllers");
const router = Router();

const chalk = require("chalk");
const successChalk = chalk.green;
const errorChalk = chalk.bold.red;
const warningChalk = chalk.hex("#FFA500");

router.get("/", async (req, res) => {
	try {
		const allBrand = await getAllBrand();
		if (allBrand) {
			console.log(successChalk("All shoes were shown"));
			return res.status(200).send(allBrand);
		}
		console.log(errorChalk("Route error!"));
		res.status(404).json({ error: error.message });
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const brandId = await getBrandId(id);
		if (brandId.length) {
			console.log(successChalk("Shoe by id were shown"));
			return res.status(200).send(brandId);
		}
		console.log(errorChalk("Route error!"));
		res.status(404).json({ error: error.message });
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		if (id) {
			const brandId = await deleteBrandId(id);
			console.log(successChalk("Shoe by id were deleted"));
			return res.status(200).send(brandId);
		}
		console.log(errorChalk("Route error!"));
		res.status(404).json({ error: error.message });
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const name = req.body;
	try {
		if (name.name === "") {
			console.log(errorChalk("Route error!"));
			return res.status(404).json({ message: "Name is empty" });
		}

		const update = await updateBrand(id, name);
		if (update.length) {
			console.log(successChalk("\n", "Shoe by id were modified", "\n"));
			return res.status(200).send(update);
		}
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

router.post("/", async (req, res) => {
	let { name } = req.body;
	try {
		if (name === "") {
			console.log(errorChalk("Brand name is empty!"));
			return res.status(400).json({ error: "Brand name is empty!" });
		}
		const aux = await createBrand(name);
		console.log(successChalk(aux));
		res.status(200).send(aux);
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

module.exports = router;