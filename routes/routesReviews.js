const { Router } = require("express");
const reviewsModel = require("../models/reviewsModel.js");

const router = Router();

router.post("/:shoeId", async (req, res) => {
  const { idUser, review, rating } = req.body;
  const { shoeId } = req.params;
  try {
    await reviewsModel.create({
      idUser: idUser,
      shoeId: shoeId,
      review: review,
      rating: rating,
    });
    return res.send("Review created");
  } catch (error) {
    console.error("Error in getById:", error);
  }
});

//BUSCA Y DEVUELVE REVIEW DE UNA ZAPATILLA (ID), DE UN USUARIO(ID) EN CONCRETO
//DEVUELVE TODAS LAS REVIEWS DE UNA ZAPATILLA
router.get("/:shoeId", async (req, res) => {
  const { idUser } = req.body;
  const { shoeId } = req.params;
  try {
    if (idUser) {
      const review = await reviewsModel.findOne({
        idUser: idUser,
        shoeId: shoeId,
      });
      return res.send(review);
    } else {
      const shoeReviews = await reviewsModel.find({ shoeId: shoeId });
      return res.send(shoeReviews);
    }
  } catch (error) {
    console.error("Error in getById:", error);
  }
});

//BUSCA REVIEW POR ID DE LA REVIEW
router.put("/exact/:idReview", async (req, res) => {
  const { idReview } = req.params;
  const { review, rating } = req.body;
  try {
    const reviewUpdated = await reviewsModel.updateOne(
      { _id: idReview },
      { $set: { review: review, rating: rating } },
      { new: true }
    );
    return res.send(
      reviewUpdated.modifiedCount === 1
        ? "Review updated successfully"
        : "Review wasn't updated"
    );
  } catch (error) {
    console.log(error);
  }
});

router.delete("/exact/:idReview", async (req, res) => {
  const { idReview } = req.params;
  try {
    await reviewsModel.deleteOne({ _id: idReview });
    return res.send("Review successfully deleted");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;