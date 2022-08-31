const { Router } = require("express");
const {
	getAllShoes,
	getById,
	createShoe,
	deleteShoe,
  getByName,
	updateShoe,
} = require("../controllers/controllers.js");
const shoesModel = require("../models/shoesModel.js");
const router = Router();

router.get("/", async (req, res) => {
  const { brand, name } = req.query;
  const allShoes = await getAllShoes(brand);
  if (name) {
    const shoeName = await getByName(name);
    return res.send(shoeName);
  }
  if (brand) {
    return res.send(allShoes);
  }

  return res.send(allShoes);
});

router.post("/", (req, res) => {
	let { name, description, color, image, brand, price, stock } = req.body;

	const create = createShoe(
		name,
		description,
		color,
		image,
		brand,
		price,
		stock
	);

	return res.status(200).send(create);
});
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const shoeId = await getById(id);
	if (id) {
		shoeId.length
			? res.status(200).send(shoeId)
			: res.status(404).send("erro  id");
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	if (id) {
		const deleted = await deleteShoe(id);
		res.status(200).send(deleted);
	}
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const shoe = req.body;

	const update = await updateShoe(id, shoe);
	res.status(200).send(update);
});

module.exports = router;
