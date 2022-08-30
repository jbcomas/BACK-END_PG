const usersModel = require("../models/usersModel.js");

const createUser = async (
  firstname,
  lastname,
  email,
  manager,
  image,
  status,
  password
) => {
  await usersModel.create(
    {
      firstname,
      lastname,
      email,
      manager,
      image,
      status,
      password,
    },
    function (err) {
      if (err) return console.error(err);
    }
  );
  return "";
};

module.exports = {
  createUser,
};
