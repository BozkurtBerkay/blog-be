const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
    lastLoginDate: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("user", UserSchema);
