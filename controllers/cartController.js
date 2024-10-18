const Product = require("../models/Product");
const Cart = require("../models/Cart");

const createCart = async (req, res) => {

       
    const user = await getInformation(req, res);
    res.status(200).json(user);

    // const newCart = new Cart(req.body);
    // try {
    //     const savedCart = await newCart.save();
    //     res.status(200).json(savedCart);
    // } catch (err) {
    //     res.status(500).json("Hata oluştu." + err);
    // }
}

const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.cartID, { $set: req.body }, { new: true });
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.cartID);
        res.status(200).json("Sepet başarıyla silindi.");
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userID });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCart,
    getAllCarts
}
