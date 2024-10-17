const Category = require("../models/Category");
const Product = require("../models/Product");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderID, { $set: req.body }, { new: true });
        res.status(200).json(updatedOrder);
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


