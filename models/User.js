const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Lütfen geçerli bir e-posta adresi girin']
    },
    password: { type: String, required: true, minlength: 6 },
    address: { 
      street: { type: String, required: false },
      city: { type: String, required: false },
      zipCode: { type: String, required: false },
      country: { type: String, required: false }
    },
    isAdmin: { type: Boolean, default: false }
  }, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);