const { Router } = require("express");
const {
  getAllBrand,
  getBrandId,
  deleteBrandId,
  updateBrand,
  createBrand,
} = require("../controllers/controllers");
const router = Router();

router.get("/", async (req, res) => {
  const allBrand = await getAllBrand();
  allBrand.length
    ? res.send(allBrand)
    : res.status(404).res.send("Error in AllShoes");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const brandId = await getBrandId(id);
  if (brandId.length) return res.send(brandId);
  return res.status(404).res.send("Error in brandId");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const brandId = await deleteBrandId(id);
    return res.send(brandId);
  }
  return res.status(404).res.send("Error in brandId");
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const name = req.body;
  if (name) {
    const update = await updateBrand(id, name);
    if (update) return res.status(200).send(update);
    return res.status(404).send("Error in search brand");
  }
});

router.post("/", (req, res) => {
  let { name } = req.body;
  createBrand(name);
  if (name === "") {
    return res.status(400).json({ error: "Brand name is empty" });
  }
  res.status(200).send("Brand created");
});

module.exports = router;
