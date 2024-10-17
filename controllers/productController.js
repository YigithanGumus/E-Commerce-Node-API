const Product = require("../models/Product");
const Category = require("../models/Category");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const createProduct = async (req, res) => {
    try {
        let categoryId;

        if (ObjectId.isValid(req.body.category_id)) {
            categoryId = new ObjectId(req.body.category_id);
        } else {
            return res.status(400).json({ error: "Geçersiz kategori ID formatı." });
        }

        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(404).json({ error: "Kategori bulunamadı." });
        }

        if (!req.files || !req.files.images || req.files.images.length === 0) {
            return res.status(400).json({ error: "Resim yüklenemedi." });
        }

        const imagePaths = [];
        for (const image of req.files.images) {
            const imagePath = `./images/${Date.now()}_${image.name}`;
            await image.mv(`./${imagePath}`);
            imagePaths.push(imagePath);
        }

        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category_id: categoryId,
            images: imagePaths,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ error: "Ürün oluşturulurken bir hata oluştu.", details: err.message });
    }
}

const updateProduct = async (req, res) => {
    let categoryId;

    if (ObjectId.isValid(req.body.category_id)) {
        categoryId = new ObjectId(req.body.category_id);
    } else {
        return res.status(400).json({ error: "Geçersiz kategori ID formatı." });
    }

    if (!req.files || !req.files.images || req.files.images.length === 0) {
        return res.status(400).json({ error: "Resim yüklenemedi." });
    }

    const imagePaths = [];
    for (const image of req.files.images) {
        const imagePath = `./images/${Date.now()}_${image.name}`;
        await image.mv(`./${imagePath}`);
        imagePaths.push(imagePath);
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productID, { $set: { ...req.body, images: imagePaths } }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: "Ürün güncellenirken bir hata oluştu.", details: err.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete({ _id: req.params.productID });
        res.status(200).json({ message: "Ürün başarıyla silindi." });
    } catch (err) {
        res.status(500).json({ error: "Ürün silinirken bir hata oluştu.", details: err.message });
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productID);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: "Ürün getirilirken bir hata oluştu.", details: err.message });
    }
}

const getAllProducts = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(3);
        } else if (qCategory) {
            products = await Product.find({ categories: { $in: [qCategory] } });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Ürünler getirilirken bir hata oluştu.", details: err.message });
    }
}


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
}
