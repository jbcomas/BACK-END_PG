const mongoose = require("mongoose");
const { Schema } = mongoose;

const coinsSchema = new Schema({
    id: { type: Number },
    name: { type: String, required: true },
    interestRate: { type: Number },
});

const coinsModel = mongoose.model("coins", coinsSchema);

// coinsModel.collection.dropIndex("in_1", function(err, result) {
//     if (err) {
//       console.log("Error eliminando índice:", err);
//     } else {
//       console.log("Índice eliminado:", result);
//     }
//   });

// coinsModel.countDocuments({}, function(err, count) {
//     if (count === 0) {
//         const defaultCoinsModel = [
//             {
//                 name: 'bitcoin',
//                 interestRate: 0.005,
//                 id: 1
//               },
//               {
//                 name: 'etherium',
//                 interestRate: 0.0042,
//                 id: 2
//               },
//               {
//                 name: 'cardano',
//                 interestRate: 0.001,
//                 id: 3
//               }
//         ];
//         coinsModel.insertMany(defaultCoinsModel, function(err) {
//             if (err) {
//               console.log(err);
//             } else {
//               console.log('Valores predeterminados agregados');
//             }
//           });
//         }
//         });



module.exports = coinsModel;