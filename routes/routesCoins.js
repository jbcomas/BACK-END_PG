const { Router } = require("express");
const router = Router();
const coinsModel = require("../models/coinsModel");

router.get("/", async (req, res) => {
    try {
        const allCoins = await coinsModel.find();
        if (allCoins) {
            console.log("Coins shown");
            return res.status(200).send(allCoins);
        }
        console.log("Route error!");
        res.status(404).json({ error: error.message });
    } catch (error) {
        console.log("Try/catch error!");
        res.status(404).json({ error: error.message });
    }
});