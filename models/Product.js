const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    images: [String],
    createdAt: { type: Date, default: Date.now }
  }, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);