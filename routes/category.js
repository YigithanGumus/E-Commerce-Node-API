const router = require("express").Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const {
  createCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
} = require("../controllers/categoryController.js");

router.post("/", verifyTokenAndAdmin, createCategory);

router.delete("/:categoryID", verifyTokenAndAdmin, deleteCategory);

router.get("/:categoryID", getCategory);

router.get("/", getAllCategories);

module.exports = router;
