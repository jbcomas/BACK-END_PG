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
      const filterBrand = await shoesModel.find({ brand: brand.toLowerCase() });
      if (filterBrand) return filterBrand;
      return "shoes not found";
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
    return "Brand Create";
  } catch (error) {
    console.error("Error in createBrand:", error);
  }
};
const getByName = async (shoe) => {
  try {
    const shoes = await shoesModel.find({ name: shoe });
    if (shoes) return shoes;
    return "shoe not found";
  } catch (error) {
    console.log("Error in getByName:", error);
  }
};

const updateShoe = async (id, shoe) => {
	try {
		await shoesModel.findByIdAndUpdate(id, shoe);
		let update = await shoesModel.findById(id);
		return update
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
	updateShoe,
  createBrand,
  getByName,
};
