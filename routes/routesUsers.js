const { Router } = require("express");
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require("../controllers/controllers");
const router = Router();
const chalk = require("chalk");
const successChalk = chalk.green;
const errorChalk = chalk.bold.red;
const warningChalk = chalk.hex("#FFA500");

router.get("/", async (req, res) => {
	try {
		const allUsers = await getAllUsers();
		if (allUsers) {
			console.log(successChalk("Users shown"));
			return res.status(200).send(allUsers);
		}
		console.log(errorChalk("Route error!"));
		res.status(404).json({ error: error.message });
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const userId = await getUserById(id);
		if (userId) {
			console.log(successChalk("User by id shown"));
			return res.status(200).send(userId);
		}
		console.log(errorChalk("Route error!"));
		res.status(404).json({ error: "This shoe id doesn't exist" });
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

router.post("/", async (req, res) => {
	let { email, idUser, firstname, lastname, manager, image, status, password } =
		req.body;
	const create = await createUser(
		email,
		idUser,
		firstname,
		lastname,
		manager,
		image,
		status,
		password
	);
	if (idUser === "" || email === "") {
		return res.status(400).json({ error: "Some mandatory info is empty" });
	}
	res.status(200).send(create);
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const user = req.body;
	try {
		if (user.email === "" || user.status === "" || user.manager === "") {
			console.log(errorChalk("User wasn't modified"));
			return res.status(400).json({ error: "Some mandatory info is empty" });
		}
		const update = await updateUser(id, user);
		console.log(successChalk("User updated"));
		res.status(200).send(update);
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		if (id) {
			const deleted = await deleteUser(id);
			console.log(successChalk("User deleted"));
			return res.status(200).send(deleted);
		}
		console.log(errorChalk("Route error!"));
		res.status(404).json({ error: error.message });
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

module.exports = router;
