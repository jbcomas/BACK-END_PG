const { Router } = require("express");
const {
  mailerController,
  newsletterSub,
  contactUsConfirmation,
  contactUsEmail,
} = require("../controllers/controllers.js");
const router = Router();

router.post("/", async (req, res) => {
  const { userId, message } = req.body;
  try {
    await mailerController(userId, message);
    res.status(200).json({ status: "Email sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/newsletter", async (req, res) => {
  const { email } = req.body;
  try {
    await newsletterSub(email);
    res.status(200).json({ status: "Newsletter email sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
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