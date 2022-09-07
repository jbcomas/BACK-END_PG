const { Router } = require("express");
const { mailerController } = require("../controllers/controllers.js");
const router = Router();

router.post("/", async (req, res) => {
  const { email, name, message } = req.body;
  try {
    await mailerController(email, name, message);
    res.status(200).json({ status: "Email sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
