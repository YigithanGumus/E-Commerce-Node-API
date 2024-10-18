const Category = require("../models/Category");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { getInformation } = require("../utils/functions");

const createOrder = async (req, res) => {

    const user = await getInformation(req, res);

    const cart = await Cart.find({ user: user.users._id, _id: req.body.cart });

    const order = await Order.findOne({ user: user.users._id, _id: req.body.cart });

    try {

        if (order.length > 0 && cart.length > 0) {

            const newOrder = await Order.findByIdAndUpdate(order._id, { $set: req.body, cart: cart._id, totalAmount: cart.totalPrice }, { new: true });
            
            res.status(200).json(newOrder);
        } else {
            const newOrder = new Order({
                user: user.users._id,
                cart: cart._id,
                totalAmount: cart.totalPrice,
                status: req.body.status,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod
            });
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);
        }
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.orderID);
        res.status(200).json("Sipariş başarıyla silindi.");
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderID);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getAllOrders,
    getUserOrders
}


