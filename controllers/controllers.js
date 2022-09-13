const shoesModel = require("../models/shoesModel.js");
const usersModel = require("../models/usersModel.js");
const brandsModel = require("../models/brandsModel.js");
const cartModel = require("../models/cartModel.js");
const transporter = require("../mailer.js");

const createUser = async (
  email,
  idUser,
  firstname,
  lastname,
  manager,
  image,
  status,
  password
) => {
  try {
    await usersModel.create(
      {
        email,
        idUser,
        firstname,
        lastname,
        manager,
        image,
        status,
        password,
      },
      function (err) {
        if (err) return console.error(err);
      }
    );
    return "User created successfully";
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

const getByName = async (shoe) => {
  try {
    const shoes = await shoesModel.find({ name: { $regex: `.*${shoe}` } });
    if (shoes.length) return shoes;
    return "Shoe not found";
  } catch (error) {
    console.log("Error in getByName:", error);
  }
};

const updateUser = async (id, user) => {
  try {
    if (id.length !== 24) {
      return "User doesn't exist";
    }
    await usersModel.findByIdAndUpdate(id, user);
    let update = await usersModel.findById(id);
    if (update !== undefined && update !== null) return [update];
    return "User doesn't exist: Object empty";
  } catch (error) {
    console.log(error);
  }
};

const mailerController = async (userId, message) => {
  try {
    const { email, firstname, lastname } = await usersModel.findById({
      _id: userId,
    });
    await transporter.sendMail({
      from: '"Testing Email" <sneaker.paradise.mail@gmail.com>',
      to: email,
      subject: `Testing Email for ${firstname} ${lastname}`,
      html: `<b>${message}</b>`,
    });
    return;
  } catch (error) {
    return error;
  }
};

const newsletterSub = async (email) => {
  try {
    await transporter.sendMail({
      from: '"Sneaker Paradise" <sneaker.paradise.mail@gmail.com>',
      to: email,
      subject: `Sneaker Paradise: Newsletter Subscription`,
      html: `<h1>Welcome to Paradise!</h1><br>
           <h2>You have subscribed successfully to our newsletter.<h2>
           <p>You will be one of the first people to now about our shoes on sale, new arrivals and more!</p><br>
           <p>See you around, <a href="http://localhost:3000">Sneaker Paradise<a></p>`,
    });
    return;
  } catch (error) {
    return error;
  }
};

const contactUsConfirmation = async (name, email) => {
  try {
    await transporter.sendMail({
      from: '"Sneaker Paradise" <sneaker.paradise.mail@gmail.com>',
      to: email,
      subject: `Sneaker Paradise: Contact Us confirmation`,
      html: `<h1>Hello, ${name}!</h1><br>
          <h2>We have received your email to contact us.<h2>
          <p>We shortly will write you back...</p><br>
          <p>See you around, <a href="http://localhost:3000">Sneaker Paradise<a></p>`,
    });
    return;
  } catch (error) {
    return error;
  }
};

const contactUsEmail = async (name, email, message) => {
  try {
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: "sneaker.paradise.mail@gmail.com",
      subject: `Contact Us from ${name}`,
      html: `<h1>${name} wrote the following message:</h1><br>
          <p>${message}</p><br>`,
    });
    return;
  } catch (error) {
    return error;
  }
};

// !--------- MANAGER -------------------------------

const getAllUsers = async () => {
  try {
    const allUsers = await usersModel.find({}).populate({
      path: "records.shoeId",
      select: "name color brand image price",
    });

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
    const brandUpdate = await brandsModel.findByIdAndUpdate(id, name, {
      new: true,
    });
    return [brandUpdate];
  } catch (error) {
    console.log(error);
  }
};

const getCart = async () => {
  try {
    const cart = await cartModel.find().clone();
    if (cart) return cart;
    return "empty cart";
  } catch (error) {
    console.error("Error in getCart:", error);
  }
};

const addShoeCart = async (userId, shoeId, size, q) => {
  try {
    await cartModel.create({ userId: userId, shoe: shoeId, size, q });
    return { status: "POST: Carrito created" };
  } catch (error) {
    console.error("Error in addShoeCart:", error);
  }
};

const getCartById = async (id) => {
  try {
    const result = await cartModel
      .find({ userId: id })
      .populate("shoe", "name");
    return result;
  } catch (error) {
    console.error("Error in getCartById:", error);
  }
};

const emptyCart = async (id) => {
  try {
    const insert = await cartModel.find({ userId: id });

    insert?.forEach(async function (shoe) {
      console.log(shoe.shoe);
      await usersModel.updateOne(
        { _id: id },
        {
          $push: {
            records: {
              shoeId: shoe.shoe,
              size: shoe.q,
              q: shoe.q,
            },
          },
        }
      );
    });
    insert?.forEach(async function (shoe) {
      await shoesModel.findOneAndUpdate(
        { _id: shoe.shoe, "stock.size": shoe.size },
        {
          $inc: { "stock.$.q": -shoe.q },
        }
      );
    });
    await cartModel.deleteMany({ userId: id });

    return { status: "empty cart" };
  } catch (error) {
    console.error("Error in deleteProduct:", error);
  }
};

const putShoeInCart = async (userId, shoeId, size, q) => {
  try {
    await cartModel.updateOne(
      { userId: userId, shoe: shoeId },
      { $set: { size: size, q: q } },
      { new: true }
    );
    return { status: "PUT: Carrito edited" };
  } catch (error) {
    console.error("Error in putShoeInCart:", error);
  }
};

const deleteShoeCart = async (id, shoeId) => {
  try {
    await cartModel.deleteOne({ userId: id, shoe: shoeId });
    return { status: "shoe deleted" };
  } catch (error) {
    console.error("Error in deleteShoeCart:", error);
  }
};
const deleteUser = async (id) => {
  try {
    if (id.length !== 24) {
      console.log(id);
      return "User never existed";
    }
    const deleted = await usersModel.findByIdAndDelete(id);
    if (deleted !== undefined && deleted !== null) return "User was deleted";
    return "User never existed: Object empty";
  } catch (error) {
    console.error("Error in deleteUser:", error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await usersModel.findById(id).populate({
      path: "records.shoeId",
      select: "name color brand image price",
    });
    if (user) return [user];
    return "User not found";
  } catch (error) {
    console.error("Error in getUserById:", error);
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
  addShoeCart,
  putShoeInCart,
  getCart,
  emptyCart,
  updateUser,
  deleteUser,
  getUserById,
  mailerController,
  newsletterSub,
  getCartById,
  deleteShoeCart,
  contactUsConfirmation,
  contactUsEmail,
};
