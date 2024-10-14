const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { 
      street: { type: String },
      city: { type: String },
      zipCode: { type: String },
      country: { type: String }
    },
    isAdmin: { type: Boolean, default: false }
  }, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);