const { Router } = require("express");
const cartModel = require("../models/cartModel.js");
const shoesModel = require("../models/shoesModel.js");
const usersModel = require("../models/usersModel");
const router = Router();


router.get("/", async (req, res) => {
  const cart = await cartModel.find();
  res.json(cart);
});


//  RECIBE ID DEL USUARIO Y CREA EL OBJETO CON ID DE USUARIO, ID DE ZAPATILLA , TALLE Y CANTIDAD

router.post("/", async (req, res) => {
  const { userId, shoeId, size, q } = req.body;
  await cartModel.create({userId: userId, shoe: shoeId, size, q })
  return res.json({ status: "POST: Carrito created" });
});


// CUANDO HACE UN PUT , EL FRONT  TIENE QUE ENVIARNOS ESTOS DATOS

// {
//   "userId": "6313a44a27a3b2d6193629f3",
//   "shoeId":"63114364928c1b0dc9c13d5c",
//   "size": 30,
//   "q": 4
// }

// EDITAR UNA ZAPATILLA PORQ SE EQUIVOCO DE TALLE O CANTIDAD

//  ESTA RUTA TENDRIA Q IR DENTRO DE UN BOTON EDIT , DENTRO DE LA TARJETA DE LA ZAPATILLA
router.put("/", async (req, res) => {
  const { userId, shoeId, size, q } = req.body; 
  const carrito = await cartModel.findOne({ userId: userId });
  if (carrito) {
    await cartModel.updateOne(
      { userId: userId, shoe: shoeId },
      { $set: { size: size, q: q } },
      { new: true }
    );
    res.status(200).json({ status: "PUT: Carrito edited" })
  }
});




//  ESTA RUTA SOLO VA A DEVOLVER LOS DEL USUARIO ESPECIFICO
// PARA QUE SE PUEDE RENDERIZAR CON EN EL CARRITO, 


// UN ARRAY DE OBJETO QUE LO RENDERIZAN CON UN MAP
// [
  // {
//   "userId": "6313a44a27a3b2d6193629f3",
//   "shoeId":"63114364928c1b0dc9c13d5c",
//   "size": 30,
//   "q": 4
// },// {
//   "userId": "6313a44a27a3b2d6193629f3",
//   "shoeId":"63114364928c1b0dc9c13d5c",
//   "size": 30,
//   "q": 4
// }
// ]
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await cartModel.find({ userId: id }).populate("shoe","name").populate("userId","email");
  res.status(200).send(result);
});

module.exports = router;



// APARTE TENDRIA QUE TENER UN SUBMIT DONDE NOS CONFIRMAN LA COMPRA, Y NOSOTROS ELIMINAMOS TODAS LOS OBJETOS QUE PERTENECEN AL USUARIO EN EL CARRO,
// Y EN EL USUARIO, ACTUALIZAMOS ALGUNA PROPIEDAD CON LAS ID DE COMPRAS