const { Router } = require("express");
const {
  getAllBrand,
  getBrandId,
  deleteBrandId
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
module.exports = router;
