const { Router } = require("express");
const { findById } = require("../models/cartModel.js");
const cartModel = require("../models/cartModel.js");
const usersModel = require("../models/usersModel");
const router = Router();

router.get("/", async (req, res) => {
  const cart = await cartModel.find();
  res.json(cart);
});

//ASIGNAR ID CARRITO A UN USUARIO
//SI USUARIO TIENE CARRITO, BUSCARLO y AGREGARLE SNEAKER
//SI USUARIO NO TIENE CARRITO, CREARLO Y AGREGARLE SNEAKER

router.post("/", async (req, res) => {
  const { userId, shoeId } = req.body;
  const cart = new cartModel({ usersModel_id: userId, picks: shoeId });
  await cart.save();
  res.json({ status: "Cart saved" });
});

// ACTUALIZAR CARRITO (FUNCIONA)
// ZAPATILLA A ZAPATILLA
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
  await cartModel.find({usersModel_id: id}).
  populate([{ path: "user", strictPopulate: false }]).
  exec(function (err, result) {
    if (err) console.log(err);
    res.json(result)
  });  
});

module.exports = router;
