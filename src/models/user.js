const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true,
  },
  address: {
    type: Number,
    required: true,
  },
  isAdm: {
    type: bool,
    required: true,
  }
});

const User = mongoose.model("User", UserSchema);
exports.User = User;
exports.UserSchema = UserSchema;
