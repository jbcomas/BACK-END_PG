const { Router } = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/controllers");
const router = Router();

router.get("/", async (req, res) => {
try {
	  const allUsers = await getAllUsers();
	  allUsers.length
	    ? res.status(200).send(allUsers)
	    : res.status(404).send("Error in Users");
} catch (error) {
	console.error(error.message);
}
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userId = await getUserById(id);
    if (id) {
      userId.length && res.status(200).send(userId);
    }
  } catch (error) {
    res.status(404).json({ error: "This shoe id doesn't exist" });
  }
});

router.post("/", async (req, res) => {
  let { email, idUser, firstname, lastname, manager, image, status, password  } = req.body;
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
  if (
    user.email === "" ||
    user.password === "" ||
    user.status === "" ||
    user.manager === ""
  ) {
    return res.status(400).json({ error: "Some mandatory info is empty" });
  }
  const update = await updateUser(id, user);
  res.status(200).send(update);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const deleted = await deleteUser(id);
    res.status(200).send(deleted);
  }
});

module.exports = router;
