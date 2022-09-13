const { Router } = require("express");
const {
  getCart,
  addShoeCart,
  getCartById,
  putShoeInCart,
  emptyCart,
  deleteShoeCart,
} = require("../controllers/controllers.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const cart = await getCart();
    console.log(successChalk("Cart shown"));
    return res.status(200).json(cart);
  } catch (error) {
    console.log(errorChalk("Try/catch error!"));
    res.status(404).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { userId, shoeId, size, q } = req.body;
  const addShoe = await addShoeCart(userId, shoeId, size, q);
  return res.json(addShoe);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await getCartById(id);
  res.status(200).send(result);
});

router.put("/", async (req, res) => {
  const { userId, shoeId, size, q } = req.body;
  const result = await putShoeInCart(userId, shoeId, size, q);
  res.status(200).send(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await emptyCart(id);
  res.status(200).json(result);
});
router.delete("/deletecart/:id", async (req, res) => {
  const { id } = req.params;
  const { shoeId } = req.body;
  const result = await deleteShoeCart(id, shoeId);
  res.status(200).json(result);
});
module.exports = router;
