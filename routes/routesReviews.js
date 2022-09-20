const { Router } = require("express");
const {
  getReviewShoeUser,
  createReview,
  editReview,
  deleteReview,
} = require("../controllers/controllers.js");
const chalk = require("chalk");
const successChalk = chalk.green;
const errorChalk = chalk.bold.red;
const warningChalk = chalk.hex("#FFA500");

const router = Router();

//BUSCA Y DEVUELVE REVIEW DE UNA ZAPATILLA (ID), DE UN USUARIO(ID) EN CONCRETO
//DEVUELVE TODAS LAS REVIEWS DE UNA ZAPATILLA
router.get("/:shoeId", async (req, res) => {
  const { idUser } = req.body;
  const { shoeId } = req.params;
  try {
    const reviews = await getReviewShoeUser(idUser, shoeId);
    console.log(successChalk("Reviews by id were shown"));
    return res.send(reviews);
  } catch (error) {
    console.log(errorChalk("Try/catch error!"));
    res.json({ message: error.raw.message });
  }
});

//CREA UNA REVIEW TENIENDO EL ID DE ZAPATILLA
router.post("/:shoeId", async (req, res) => {
  const { idUser, review, rating } = req.body;
  const { shoeId } = req.params;
  try {
    const create = await createReview(idUser, shoeId, review, rating);
    console.log(successChalk("Review was created"));
    return res.send(create);
  } catch (error) {
    console.log(errorChalk("Try/catch error!"));
    res.json({ message: error.raw.message });
  }
});

//BUSCA POR ID DE LA REVIEW Y EDITA
router.put("/exact/:idReview", async (req, res) => {
  const { idReview } = req.params;
  const { review, rating } = req.body;
  try {
    const reviewUpdated = await editReview(idReview, review, rating);
    console.log(successChalk("Review was edited"));
    return res.send(reviewUpdated);
  } catch (error) {
    console.log(errorChalk("Try/catch error!"));
    res.json({ message: error.raw.message });
  }
});

//BUSCA REVIEW POR ID Y LA ELIMINA
router.delete("/exact/:idReview", async (req, res) => {
  const { idReview } = req.params;
  try {
    const deletedReview = await deleteReview(idReview);
    console.log(successChalk("Review was deleted"));
    return res.send(deletedReview);
  } catch (error) {
    console.log(errorChalk("Try/catch error!"));
    res.json({ message: error.raw.message });
  }
});

module.exports = router;