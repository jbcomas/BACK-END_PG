require("dotenv").config();
const server = require("./app.js");
const {PORT} = process.env


server.listen(PORT || 3001, () => {
  console.log("%s listening at 3001");
});
