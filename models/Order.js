const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    totalAmount: { type: Number },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' }, 
    shippingAddress: { 
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: { type: String, enum: ['credit_card', 'paypal'], required: true }, 
    createdAt: { type: Date, default: Date.now }
  }, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
