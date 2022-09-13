const { Router } = require("express");
const {
  mailerController,
  newsletterSub,
} = require("../controllers/controllers.js");
const router = Router();

router.post("/", async (req, res) => {
  const { userId, message } = req.body;
  try {
    await mailerController(userId, message);
    console.log(successChalk("Email sent"));
    res.status(200).json({ status: "Email sent" });
  } catch (error) {
    console.log(errorChalk("Try/catch error!"));
    res.status(404).json({ error: error.message });
  }
});

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
module.exports = router;
