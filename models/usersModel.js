var mongoose = require("mongoose");
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
  records: [{ purchase: { type: Schema.Types.ObjectId }}]
});

const usersModel = mongoose.model("user", userSchema);

module.exports = usersModel;
