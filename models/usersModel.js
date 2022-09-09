var mongoose = require("mongoose");
const shoesModel = require("./shoesModel");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  manager: { type: Boolean, required: true },
  image: { type: String },
  status: { type: String, enum: ["Enabled", "Disabled", "Eliminated"] },
  password: { type: String, maxlength: 64, required: true },
  createdAt: { type: Date, default: Date.now },
  records: [
    {
      shoeId: { type: Schema.Types.ObjectId, ref: shoesModel },
      size: { type: Number },
      q: { type: Number },
      dateOfPurchase: { type: Date, default: Date.now },
    },
  ],
});

const usersModel = mongoose.model("user", userSchema);

module.exports = usersModel;
