const { Router } = require("express");
const { findById } = require("../models/cartModel.js");
const cartModel = require("../models/cartModel.js");
const usersModel = require("../models/usersModel");
const router = Router();

router.get("/", async (req, res) => {
  const cart = await cartModel.find();
  res.json(cart);
});

router.post("/", async (req, res) => {
  const { userId, shoeId } = req.body;
  const cart = new cartModel({ usersModel_id: userId, picks: shoeId });
  await cart.save();
  res.json({ status: "Cart saved" });
});

router.put("/addShoe", async (req, res) => {
  const { shoeId, userId } = req.body;
  const user = await usersModel.findById(userId);
  if (user) {
    const userId = user._id.toString();
    await cartModel.updateOne(
      { usersModel_id: userId },
      { $push: { picks: shoeId } }
    );
    res.json({ status: "Shoe added to cart" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await cartModel.find({usersModel_id: id}).
  populate("picks", "name")
  res.status(200).send(result)
});

module.exports = router;
