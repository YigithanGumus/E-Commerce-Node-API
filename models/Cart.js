const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number },
    updatedAt: { type: Date, default: Date.now }
  }, {timestamps: true});

module.exports = mongoose.model("Cart", CartSchema);
