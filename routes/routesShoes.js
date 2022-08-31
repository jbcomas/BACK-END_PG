const { Router } = require("express");
const {
  getAllShoes,
  getById,
  createShoe,
  deleteShoe,
} = require("../controllers/controllers.js");
const router = Router();

router.get("/", async (req, res) => {
  const allShoes = await getAllShoes();
  if (allShoes.length) return res.send(allShoes);
  return res.status(404).res.send("Error in AllShoes");
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

module.exports = router;
