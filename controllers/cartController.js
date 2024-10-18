const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { getInformation } = require("../utils/functions");

const createCart = async (req, res) => {
    const user = await getInformation(req, res);
    const productData = await Product.findById(req.body.products[0].product);


    try {
   
        let carts = await Cart.find({ user: user._id, 'products.product': req.body.products[0].product });
        let totalPrice = 0;

        if (carts && carts.length > 0) {
            carts.forEach(cart => {
                cart.products.forEach(product => {
                    if (product.product && req.body.products[0].product && product.product.toString() === req.body.products[0].product.toString()) {
                        totalPrice += productData.price * req.body.products[0].quantity;
                        product.quantity += req.body.products[0].quantity;
                    }
                });
            });
            

            const updatedCart = await Cart.findByIdAndUpdate(carts[0]._id, { $set: carts[0], totalPrice: totalPrice, user: user.users._id }, { new: true });
            res.status(200).json(updatedCart);
        } else {
            const newCart = await Cart.create({
                user: user.users._id,
                products: req.body.products,
                totalPrice: productData.price * req.body.products[0].quantity,
            });

            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        }
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.cartID);
        res.status(200).json("Ürün başarıyla sepetten çıkarıldı.");
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const getCart = async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.params.userID }).populate('products.product');
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
    deleteCart,
    getCart,
    getAllCarts
}
