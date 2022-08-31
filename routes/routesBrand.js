const { Router } = require("express");
const { getAllBrand } = require("../controllers/controllers");
const router = Router();

router.get("/", async (req, res) => {
  const allBrand = await getAllBrand();
  allBrand.length
    ? res.send(allBrand)
    : res.status(404).res.send("Error in AllShoes");
});
module.exports = router;
