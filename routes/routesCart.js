const { Router } = require("express");
const {
	getCart,
	addShoeCart,
	getCartByIdUser,
	updateStatusOrder,
	getCartByOrder,
} = require("../controllers/controllers.js");
const Stripe = require("stripe");

const stripe = new Stripe(
	"sk_test_51Lgvm7FNV3brqOrQcBGGJTYhREYOAa3bUfwMh16NYL404FFfC7ALHjIwu2LjdJ5EeznkkdUX4wlRequzhE4EzTMs00hjEt6ZZv"
);
const router = Router();
const chalk = require("chalk");
const successChalk = chalk.green;
const errorChalk = chalk.bold.red;
const warningChalk = chalk.hex("#FFA500");

router.get("/", async (req, res) => {
	try {
		const cart = await getCart();
		console.log(successChalk("Cart shown"));
		return res.status(200).json(cart);
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

router.post("/checkout", async (req, res) => {
	const { userId, id, shoes, amount, email } = req.body;

	try {
		const pay = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "shoes",
			payment_method: id,
			confirm: true,
		});

		const payment = addShoeCart(userId, id, shoes, amount, email);

		res.status(200).json({ message: "success pay" });
	} catch (error) {
		res.json({ message: error.raw.message });
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const result = await getCartByIdUser(id);
	res.status(200).send(result);
});

//? buscar una compra especifica

router.get("/order/:idPayment", async (req, res) => {
	const { idPayment } = req.params;
	const order = await getCartByOrder(idPayment);
	res.status(200).send(order);
});

//? Manager, para modificar el estado de la compra
router.put("/order/:idPayment", async (req, res) => {
	const { idPayment } = req.params;
	const {status} = req.body;
	try {
		const update = await updateStatusOrder(idPayment, status);
		if (update) {
			console.log(successChalk("Order delivered "));
			return res.status(200).send(update);
		}
		console.log(errorChalk("Route error!"));
		res.status(404).json({ error: "Error when modifying" });
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

module.exports = router;