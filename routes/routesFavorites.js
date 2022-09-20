const { Router } = require("express");
const favoritesModel = require("../models/favoritesModel");
const chalk = require("chalk");
const successChalk = chalk.green;
const errorChalk = chalk.bold.red;
const warningChalk = chalk.hex("#FFA500");

const router = Router();

router.get("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const favorites = await favoritesModel.find({ idUser: idUser });
    console.log(successChalk("Favorites were shown"));
    return res.send(favorites);
  } catch (error) {
    console.log(errorChalk("Try/catch error!"));
    res.json({ message: error.message });
  }
});

router.post("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const { shoeId } = req.body;
  try {
    const alreadyFav = await favoritesModel.find({
      idUser: idUser,
      shoeId: shoeId,
    })
    console.log(alreadyFav)
    if (alreadyFav[0]) {
      return res.send("Shoe is already favorited");
    } else {
      await favoritesModel.create({
        idUser: idUser,
        shoeId: shoeId,
      });
      console.log(successChalk("Added to favorite"));
      return res.send("Added to favorite");
    }
  } catch (error) {
    console.log(errorChalk("Try/catch error!"));
    res.json({ message: error.message });
  }
});

router.delete("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const { shoeId } = req.body;
  try {
    await favoritesModel.deleteOne({ idUser: idUser,  shoeId: shoeId});
    return res.send("Eliminated from favorites");
  } catch (error) {
    console.error("Error in deleteBrandId:", error);
    res.json({ message: error.message });
  }
});

module.exports = router;
