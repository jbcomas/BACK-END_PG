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
  if (name === "" || description === "" || brand === "") {
    console.log(errorChalk("Sneaker wasn't created"));
    return res.status(400).json({ error: "Name or description is empty" });
  }
  console.log(successChalk("New sneaker was created"));
  res.status(200).send(create);
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const shoeId = await getById(id);
    if (id) {
      shoeId.length && res.status(200).send(shoeId);
    }
  } catch (error) {
    res.status(404).json({ error: "This shoe id doesn't exist" });
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
  if (shoe.name === "" || shoe.description === "" || shoe.brand === "") {
    return res.status(400).json({ error: "Some mandatory info is empty" });
  }
  const update = await updateShoe(id, shoe);
  res.status(200).send(update);
});

module.exports = router;
