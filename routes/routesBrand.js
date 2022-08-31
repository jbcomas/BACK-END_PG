const { Router } = require("express");
const { createBrand } = require("../controllers/controllers");
const router = Router();

router.get("/", async (req, res) => {
  const allBrand = await getAllBrand();
  allBrand.length
    ? res.send(allBrand)
    : res.status(404).res.send("Error in AllShoes");
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  console.log(name);
  const create = await createBrand(name);
  res.send(create);
});
module.exports = router;
