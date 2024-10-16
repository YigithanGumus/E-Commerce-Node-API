const router = require("express").Router();
const Category = require("../models/Category");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { verifyTokenAndAdmin, verifyToken,verifyTokenAndAuthorization } = require("../middleware/verifyToken");

const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
} = require("../controllers/categoryController");

router.post("/", verifyTokenAndAdmin, createCategory);

router.put("/:categoryID", verifyTokenAndAdmin, updateCategory);

router.delete("/:categoryID", verifyTokenAndAdmin, deleteCategory);

router.get("/:categoryID", getCategory);

router.get("/", getAllCategories);

module.exports = router;
