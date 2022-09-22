const shoesModel = require("../models/shoesModel.js");
const usersModel = require("../models/usersModel.js");
const brandsModel = require("../models/brandsModel.js");
const cartModel = require("../models/cartModel.js");
const reviewsModel = require("../models/reviewsModel");
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
		let noDuplicated = await usersModel.find({ email: email });

		if (noDuplicated.length) {
			return `${email} logIn`;
		}
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

const getOnSale = async () => {
	try {
		const onSale = await shoesModel.find({ onSale: true });
		if (onSale) {
			return onSale;
		}
		return res.send("There are no sales");
	} catch (error) {
		console.log("Error in getOnSale:", error);
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


const newsletterSub = async (email) => {
	try {
		await transporter.sendMail({
			from: '"Sneaker Paradise" <sneaker.paradise.mail@gmail.com>',
			to: email,
			subject: `Sneaker Paradise: Newsletter Subscription`,
			html: `<h1>Welcome to Paradise!</h1><br>
           <h2>You have subscribed successfully to our newsletter.<h2>
           <p>You will be one of the first people to now about our shoes on sale, new arrivals and more!</p><br>
           <p>See you around, <a href="https://front-cg50vmhbd-fernando-bernal.vercel.app">Sneaker Paradise<a></p>`,
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
          <p>See you around, <a href="https://front-cg50vmhbd-fernando-bernal.vercel.app">Sneaker Paradise<a></p>`,
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
			path: "records.idPayment",
			select: "shoe amount",
		});

		return allUsers;
	} catch (error) {
		console.error("Error in getAllUsers:", error);
	}
};

const createShoe = async ({
	name,
	description,
	color,
	path,
	brand,
	price,
	size,
	q,
}) => {
	const duplicate = await shoesModel.find({ name });
	if (duplicate.length) return "sneaker with this name already exists";
	try {
    let aux = brand.toLowerCase();
		shoesModel.create(
			{
				name,
				description,
				color,
				image: path,
				brand: aux,
				price,
				stock: [
					{
						size,
						q,
					},
				],
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
		const duplicate = await brandsModel.find({ name: brand });
		if (duplicate.length) return "Brand duplicate";
    const aux = brand.toLowerCase();
		brandsModel.create(
			{
				name: aux,
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
	const { name, description, color, path, brand, price, size, q, onSale } =
		shoe;

	try {
		if (id.length !== 24) {
			return "Shoe doesn't exist";
		}
    const aux = brand.toLowerCase();
		await shoesModel.findByIdAndUpdate(id, {
			name,
			description,
			color,
			brand: aux,
			price,
			onSale,
		});
		path !== undefined &&
			(await shoesModel.findByIdAndUpdate(id, { image: path }));
		let update = await shoesModel.findById(id);
		if (size) {
			await shoesModel.updateOne(
				{ _id: id, "stock._id": size },
				{ $set: { "stock.$.q": q } }
			);
		}
		if (brand) createBrand(brand);
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
    const aux = name.toLowerCase()
		const brandUpdate = await brandsModel.findByIdAndUpdate(id, aux, {
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

const addShoeCart = async (uid, id, shoes, amount, email) => {
	try {
		await cartModel.create({
			email,
			userId: uid,
			idPayment: id,
			shoe: shoes,
			amount,
		});
		const cart = await cartModel.find({
			idPayment: id,
		});

		const aux = await usersModel.updateOne(
			{ email: email },
			{
				$push: {
					records: {
						idPayment: cart[0]._id,
					},
				},
			}
		);
		shoes?.forEach(async function (shoe) {
			await shoesModel.findOneAndUpdate(
				{ _id: shoe._id, "stock.size": shoe.size },
				{
					$inc: { "stock.$.q": -shoe.quantity },
				}
			);
		});

		return { message: "succesfull payment" };
	} catch (error) {
		console.error("Error in addShoeCart:", error);
	}
};

const getCartByOrder = async (idPayment) => {
	try {
		const result = await cartModel.findOne({ idPayment: idPayment });
		return result;
	} catch (error) {
		console.error("Error in getCartByOrder:", error);
	}
};

const updateStatusOrder = async (idPayment, state) => {
	try {
		const updateStatus = await cartModel.findOneAndUpdate(
			{ idPayment: idPayment },
			{ $set: { status: state } },
			{ new: true }
		);
		console.log(updateStatus);
		return updateStatus;
	} catch (error) {
		console.log(error);
	}
};

//* borrado logico de clientes

const updateStatusClient = async (_id, status) => {
	try {
		const updateStatus = await usersModel.findOneAndUpdate(
			{ _id: _id },
			{ $set: { status: status } },
			{ new: true }
		);
		return updateStatus;
	} catch (error) {
		console.log(error);
	}
};

//* cuentas manager

const updateManager = async (_id, manager) => {
	try {
		const updateStatus = await usersModel.findOneAndUpdate(
			{ _id: _id },
			{ $set: { manager: manager } },
			{ new: true }
		);
		return updateStatus;
	} catch (error) {
		console.log(error);
	}
};
// TODO---------------------------------

const getCartByIdUser = async (email) => {
	try {
		const result = await cartModel.find({ email: email });
		return result;
	} catch (error) {
		console.error("Error in getCartById:", error);
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
			path: "records.idPayment",
			select: "shoe",
		});
		if (user) return [user];
		return "User not found";
	} catch (error) {
		console.error("Error in getUserById:", error);
	}
};

const addSize = async (id, body) => {
	try {
		const { size, q } = body;
		await shoesModel.updateOne({ _id: id }, { $push: { stock: { size, q } } });
		return "Add Size";
	} catch (error) {
		console.error("Error in addSize:", error);
	}
};

const deleteSize = async (id) => {
	try {
		const aux = await shoesModel.updateMany(
			{},
			{ $pull: { stock: { _id: id } } }
		);
		console.log(aux);
		return "Size removed";
	} catch (error) {
		console.error("Error in deleteSize:", error);
	}
};

const updateOnSale = async (_id, onSale) => {
	try {
		const updateStatus = await shoesModel.findOneAndUpdate(
			{ _id: _id },
			{ $set: { onSale: onSale } },
			{ new: true }
		);
		return updateStatus;
	} catch (error) {
		console.log(error);
	}
};

const getReviewShoeUser = async (idUser, shoeId) => {
	try {
		if (idUser) {
			const review = await reviewsModel.findOne({
				idUser: idUser,
				shoeId: shoeId,
			});
			if (review) {
				return review;
			} else {
				return "User's review doesn't exist";
			}
		} else {
			const shoeReviews = await reviewsModel.find({ shoeId: shoeId });
			if (shoeReviews[0]) {
				return shoeReviews;
			} else {
				return [];
			}
		}
	} catch (error) {
		console.error("Error in getReviewShoeUser:", error);
	}
};

const createReview = async (idUser, shoeId, review, rating) => {
	try {
		const alreadyReviewed = await getReviewShoeUser(idUser, shoeId);
		if (alreadyReviewed.idUser) return "User has already reviewed this shoe";
		await reviewsModel.create({
			idUser: idUser,
			shoeId: shoeId,
			review: review,
			rating: rating,
		});
		return "Review created";
	} catch (error) {
		console.error("Error in createReview:", error);
	}
};

const editReview = async (idReview, review, rating) => {
	try {
		const reviewUpdated = await reviewsModel.updateOne(
			{ _id: idReview },
			{ $set: { review: review, rating: rating } },
			{ new: true }
		);
		return reviewUpdated.modifiedCount === 1
			? "Review updated successfully"
			: "Review wasn't updated";
	} catch (error) {
		console.error("Error in createReview:", error);
	}
};

const deleteReview = async (idReview) => {
	try {
		await reviewsModel.deleteOne({ _id: idReview });
		return "Review successfully deleted";
	} catch (error) {
		console.error("Error in deleteReview:", error);
	}
};

const getUserByEmail = async (email) => {
	try {
		const user = await usersModel.findOne({ email: email }).populate({
			path: "records.idPayment",
			select: "shoe",
		});
		if (user) return [user];
		return "User not found";
	} catch (error) {
		console.error("Error in getUserByEmail:", error);
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
	getCart,
	updateUser,
	deleteUser,
	getUserById,
	newsletterSub,
	getCartByIdUser,
	contactUsConfirmation,
	contactUsEmail,
	updateStatusOrder,
	updateStatusClient,
	updateManager,
	getCartByOrder,
	getReviewShoeUser,
	createReview,
	editReview,
	deleteReview,
	updateOnSale,
	addSize,
	getUserByEmail,
	getOnSale,
	deleteSize,
};
