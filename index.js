require("dotenv").config();
const server = require("./app.js");
const {PORT} = process.env
//const SneaksAPI = require("sneaks-api");
//const sneaks = new SneaksAPI();

// const shoesModel = require("./models/shoesModel.js");
// const usersModel = require("./models/usersModel.js");
// const brandsModel = require("./models/brandsModel.js");

// const create = sneaks.getMostPopular(300, function (err, products) {
//   products.forEach((el) => {
//     let { shoeName, colorway, thumbnail, brand, retailPrice, description } = el;
//     description = description.trim();
//     brand = brand.toLowerCase().trim();
//     shoeName = shoeName.toLowerCase().trim();
//     if(!shoeName.includes("hoodie") &&
//       !shoeName.includes("bag") &&
//       brand !== "off-white" &&
//       brand !== "burberry" &&
//       brand != "lego" &&
//       brand != "palm angels"){
//        shoesModel.create({
//         name: shoeName,
//         description:
//           description !== "" ? description : "Shoes without description",
//         color: colorway !== "" ? colorway : "white",
//         image: thumbnail,
//         brand: brand,
//         price: retailPrice,
//         stock: [
//           {
//             size: 34,
//             q: 50,
//           },
//           {
//             size: 37,
//             q: 50,
//           },
//           {
//             size: 40,
//             q: 50,
//           },
//           {
//             size: 42,
//             q: 50,
//           },
//         ],
//       });
//     brandsModel.create(
//       {
//         name: brand,
//       },
//       function (err) {
//         if (err) return console.error(err);
//       }
//     );
//       }
//   });
// });

server.listen(PORT || 3001, () => {
  console.log("%s listening at 3001");
});
