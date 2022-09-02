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

const getAllShoes = async (brand) => {
  try {
    if (brand) {
      let aux = brand.toLowerCase();
      const filterBrand = await shoesModel.find({ brand: aux });
      if (filterBrand) return filterBrand;
      return "Shoes not found";
    } else {
      const allShoes = await shoesModel
        .find(function (err, shoes) {
          if (err) return console.error(err);
        })
        .clone();
      return allShoes;
    }
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
    createBrand(brand);
    return "Shoe Created";
  } catch (error) {
    console.error("Error in createShoe:", error);
  }
};

const deleteShoe = async (id) => {
  try {
    if (id.length !== 24) {
      console.log(id);
      return "Shoe never existed";
    }
    const deleted = await shoesModel.findByIdAndDelete(id);
    if (deleted !== undefined && deleted !== null) return "Shoe was deleted";
    return "Shoe never existed: Object empty";
  } catch (error) {
    console.error("Error in deleteShoe:", error);
  }
};

const createBrand = async (brand) => {
  try {
    brandsModel.create(
      {
        name: brand,
      },
      function (err) {
        if (err) return console.error(err);
      }
    );
    return "Brand Created";
  } catch (error) {
    console.error("Error in createBrand:", error);
  }
};

const getByName = async (shoe) => {
  try {
    const shoes = await shoesModel.find({ name: { $regex: `.*${shoe}` } });
    if (shoes.length) return shoes;
    return "Shoe not found";
  } catch (error) {
    console.log("Error in getByName:", error);
  }
};

const updateShoe = async (id, shoe) => {
  try {
    if (id.length !== 24) {
      return "Shoe doesn't exist";
    }
    await shoesModel.findByIdAndUpdate(id, shoe);
    let update = await shoesModel.findById(id);
    createBrand(shoe.brand);
    if (update !== undefined && update !== null) return [update];
    return "Shoe doesn't exist: Object empty";
  } catch (error) {
    console.log(error);
  }
};

const getBrandId = async (id) => {
  try {
    const brand = await brandsModel.findById(id);
    if (brand) return [brand];
    return "Brand not found";
  } catch (error) {
    console.error("Error in getBrandId:", error);
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

const updateBrand = async (id, name) => {
  try {
    await brandsModel.findByIdAndUpdate(id, name);
    let update = await brandsModel.findById(id);
    return [update];
  } catch (error) {
    console.log(error);
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
  updateShoe,
  createBrand,
  getByName,
  updateBrand,
};
