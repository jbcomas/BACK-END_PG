const { Router } = require("express");
const { getAllUsers } = require("../controllers/controllers");
const router = Router();

router.get("/", async (req, res) => {
  const allsUsers = await getAllUsers();
  allsUsers.length
    ? res.status(200).send(allsUsers)
    : res.status(404).send("Error in Users");
});

module.exports = router;
