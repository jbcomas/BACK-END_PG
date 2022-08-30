const { Router } = require("express");
const router = Router();
const shoesModel = require("../models/shoesModel");

const getAllShoes = async () => {
  try {
    return await shoesModel.find();
  } catch (error) {
    console.log("Error in getAllShoes:", error);
  }
};

module.exports = {
  getAllShoes,
};
