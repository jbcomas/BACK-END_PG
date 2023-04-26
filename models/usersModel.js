var mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  firstname: { type: String },
  lastname: { type: String },
  password: { type: String, maxlength: 64},
  createdAt: { type: Date, default: Date.now },
});

const usersModel = mongoose.model("user", userSchema);

module.exports = usersModel;
