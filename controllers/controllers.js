const shoesModel = require("../models/shoesModel.js");
const usersModel = require("../models/usersModel.js");
const brandsModel = require("../models/brandsModel.js");

const createUser = async (
  firstname,
  lastname,
  email,
  manager,
  image,
  status,
  password
) => {
  try {
    usersModel.create(
      {
        firstname,
        lastname,
        email,
        manager,
        image,
        status,
        password,
      },
      function (err) {
        if (err) return console.error(err);
      }
    );
    return "Users Create";
  } catch (error) {
    console.error("Error in createUser:", error);
  }
};

const getAllShoes = async () => {
  try {
    const allShoes = await shoesModel
      .find(function (err, shoes) {
        if (err) return console.error(err);
      })
      .clone();
    return allShoes;
  } catch (error) {
    console.error("Error in getAllShoes:", error);
  }
};

const getById = async (id) => {
  try {
    const shoe = await shoesModel.findById(id);
    if (shoe) return [shoe];
    return "shoe not found";
  } catch (error) {
    console.error("Error in getById:", error);
  }
};

const getAllBrand = async () => {
  try {
    const allBrands = await brandsModel
      .find(function (err, brands) {
        if (err) return console.error(err);
      })
      .clone();
    return allBrands;
  } catch (error) {
    console.error("Error in getAllBrand:", error);
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await usersModel
      .find(function (err, user) {
        if (err) return console.error(err);
      })
      .clone();
    return allUsers;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
  }
};
const createShoe = (name, description, color, image, brand, price, stock) => {
  try {
    shoesModel.create(
      {
        name,
        description,
        color,
        image,
        brand,
        price,
        stock,
      },
      function (err) {
        if (err) return console.error(err);
      }
    );
    return "Shoe Create";
  } catch (error) {
    console.error("Error in createProduct:", error);
  }
};

const deleteShoe = async (id) => {
  try {
    const deleted = await shoesModel.findByIdAndDelete(id);
    return "Shoe Deleted";
  } catch (error) {
    console.error("Erro in deleteShoe:", error);
  }
};

const getBrandId = async (id) => {
  try {
    const brand = await brandsModel.findById(id);
    if (brand) return [brand];
    return "Brand not found";
  } catch (error) {
    console.error("Error in getById:", error);
  }
};

const deleteBrandId = async (id) => {
  try {
    const deletedBrand = await brandsModel.deleteOne({ _id: id });
    if (deletedBrand) return "Brand deleted";
    return "Brand not found";
  } catch (error) {
    console.error("Error in deleteBrandId:", error);
  }
};
module.exports = {
  createUser,
  getAllShoes,
  getAllBrand,
  getAllUsers,
  getById,
  createShoe,
  deleteShoe,
  getBrandId,
  deleteBrandId,
};
