const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/", createProduct);

router.put("/:productID", updateProduct);

router.delete("/:productID", deleteProduct);

router.get("/:productID", getProduct);

router.get("/", getAllProducts);

module.exports = router;