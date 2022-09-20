const { Router } = require("express");
const chalk = require("chalk");
const {
	getAllShoes,
	getById,
	createShoe,
	deleteShoe,
	getByName,
	updateShoe,
 getOnSale
} = require("../controllers/controllers.js");
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

router.get("/onSale", async (req, res)=>{
 try {
     const onSale = await getOnSale()
     if (onSale) {
         return res.send(onSale)
     }
     return res.send("There are no sales")
 } catch (error) {
     console.log(errorChalk("Try/catch error!"));
     res.status(404).json({ error: error.message });
 }
})

router.post("/", async (req, res) => {
	let { name, description, color, image, brand, price, stock } = req.body;
	try {
		const create = await createShoe(
			name,
			description,
			color,
			image,
			brand,
			price,
			stock
		);
		if (name === "" || description === "" || brand === "") {
			console.log(errorChalk("Sneaker wasn't created"));
			return res.status(400).json({ error: "Name or description is empty" });
		}
		console.log(successChalk("New sneaker was created"));
		res.status(200).send(create);
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
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
