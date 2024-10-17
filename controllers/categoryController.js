const Category = require("../models/Category");
const Product = require("../models/Product");


const createCategory = async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryID, { $set: req.body }, { new: true });
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.categoryID);

        await Product.find({ category_id: req.params.categoryID }).deleteMany();

        res.status(200).json("Başarıyla kategori silindi.");
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryID);

        const products = await Product.find({ category_id: req.params.categoryID });
        res.status(200).json({ category, products });
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json("Hata oluştu." + err);
    }
}




module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories,
};
