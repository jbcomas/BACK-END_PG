var mongoose = require("mongoose");
const cartModel = require("./cartModel");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  idUser: { type: String, required: true},
  firstname: { type: String },
  lastname: { type: String },
  manager: { type: Boolean, default: false },
  status: { type: String, enum: ["Enabled", "Disabled", "Eliminated"], default: "Enabled"},
  password: { type: String, maxlength: 64},
  createdAt: { type: Date, default: Date.now },
  records: [
    {
      idPayment: {type: Schema.Types.ObjectId , ref: cartModel},
      dateOfPurchase: { type: Date, default: Date.now },
    },
  ],
});

const usersModel = mongoose.model("user", userSchema);

module.exports = usersModel;
