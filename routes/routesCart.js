const { Router } = require("express");
const {
  getCart,
  addShoeCart,
  getCartById,
  putShoeInCart,
  emptyCart,
  deleteShoeCart,
} = require("../controllers/controllers.js");
const Stripe = require("stripe");

const stripe = new Stripe(
  "sk_test_51Lgvm7FNV3brqOrQcBGGJTYhREYOAa3bUfwMh16NYL404FFfC7ALHjIwu2LjdJ5EeznkkdUX4wlRequzhE4EzTMs00hjEt6ZZv"
);
const router = Router();

router.get("/", async (req, res) => {
  const cart = await getCart();
  res.json(cart);
});

router.post("/", async (req, res) => {
  const { userId, shoeId, size, q } = req.body;
  const addShoe = await addShoeCart(userId, shoeId, size, q);
  return res.json(addShoe);
});

router.post("/checkout", async (req, res) => {
  const { userId, id, shoe, amount } = req.body;

  try {
    const pay = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "shoes",
      payment_method: id,
      confirm: true,
    });
    console.log(pay);

    const payment = addShoeCart(userId, id, shoe, amount);
  
    res.status(200).json({message: 'success pay'});
  } catch (error) {
    res.json({ message: error.raw.message });
  }
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
