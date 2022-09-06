const { Router } = require("express");
const cartModel = require("../models/cartModel.js");
const shoesModel = require("../models/shoesModel.js");
const usersModel = require("../models/usersModel");
const router = Router();

// Cuando haga POST, quiero checkear si existe un Carrito con el userId que me pasan.
// Si ya existe el carrito, que le haga un $push
// Si no existe el carrito, que le haga un new/create

router.get("/", async (req, res) => {
  const cart = await cartModel.find();
  res.json(cart);
});

router.post("/", async (req, res) => {
  const { userId, shoeId } = req.body;
  const user = await usersModel.findById(userId);
  const carrito = await cartModel.findOne({ userId: userId });
  if (carrito) {
    const userId = user._id.toString();
    await cartModel.updateOne({ userId: userId }, { $push: { picks: shoeId } });
    return res.json({ status: "PUT: Carrito edited" });
  } else {
    const cart = new cartModel({ userId: userId, picks: shoeId });
    await cart.save();
    return res.json({ status: "POST: Carrito created" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await cartModel.find({ userId: id }).populate("picks");
  res.status(200).send(result);
});

module.exports = router;
