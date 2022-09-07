const { Router } = require("express");
const { mailerController } = require("../controllers/controllers.js");
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

module.exports = router;
