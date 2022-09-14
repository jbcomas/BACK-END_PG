const { Router } = require("express");
const {
  newsletterSub,
  contactUsConfirmation,
  contactUsEmail,
} = require("../controllers/controllers.js");
const router = Router();
const chalk = require("chalk");
const successChalk = chalk.green;
const errorChalk = chalk.bold.red;
const warningChalk = chalk.hex("#FFA500");

router.post("/newsletter", async (req, res) => {
  const { email } = req.body;
  try {
    await newsletterSub(email);
    console.log(successChalk("Newsletter email sent"));
    res.status(200).json({ status: "Newsletter email sent" });
  } catch (error) {
    console.log(errorChalk("Try/catch error!"));
    res.status(404).json({ error: error.message });
  }
});

router.post("/contactUs", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await contactUsConfirmation(name, email);
    await contactUsEmail(name, email, message);
    res.status(200).json({ status: "Contact email sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
