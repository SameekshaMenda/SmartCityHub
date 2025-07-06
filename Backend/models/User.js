// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, default: "" },
  address: { type: String, default: "" }
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create and export User model
const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
