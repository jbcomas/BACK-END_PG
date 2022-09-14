const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const shoes = require("./routes/routesShoes.js");
const brands = require("./routes/routesBrand.js");
const users = require("./routes/routesUsers.js");
const carrito = require("./routes/routesCart.js");
const mail = require("./routes/routesMail.js");
const reviews = require("./routes/routesReviews.js")

const server = express();

server.name = "API";
require("./db.js");
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


server.use("/shoes", shoes);
server.use("/users", users);
server.use("/brands", brands);
server.use("/cart", carrito);
server.use("/mail", mail);
server.use("/reviews", reviews);


// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
module.exports = server;
