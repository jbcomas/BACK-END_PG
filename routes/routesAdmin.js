const { Router } = require("express");
const {updateStatusClient, updateManager, updateOnSale } = require("../controllers/controllers")
const chalk = require("chalk");
const successChalk = chalk.green;
const errorChalk = chalk.bold.red;
const warningChalk = chalk.hex("#FFA500");
const router = Router();


//* Ruta para modificar el tipo de cuenta

router.put("/client/:_id", async (req, res) => {
	const { _id } = req.params;
	const {status} = req.body;
	try {
		const update = await updateStatusClient(_id, status);
		if (update) {
			console.log(successChalk("Changed user status"));
			return res.status(200).send(update);
		}
		console.log(errorChalk("Route error!"));
		res.status(404).json({ error: "Error when modifying" });
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

//* ruta para ser manager
router.put("/manager/:_id", async (req, res) => {
	const { _id } = req.params;
	const {manager} = req.body;
	try {
		const update = await updateManager(_id, manager);
		if (update) {
			console.log(successChalk("Changed user status"));
			return res.status(200).send(update);
		}
		console.log(errorChalk("Route error!"));
		res.status(404).json({ error: "Error when modifying" });
	} catch (error) {
		console.log(errorChalk("Try/catch error!"));
		res.status(404).json({ error: error.message });
	}
});

router.put("/onsale/:_id", async (req, res) => {
	const { _id } = req.params;
	const {onSale} = req.body;
	try {
		const update = await updateOnSale(_id, onSale);
		if (update) {
			console.log(successChalk("Changed user status"));
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