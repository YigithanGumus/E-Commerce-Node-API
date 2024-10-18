const router = require("express").Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const {
    createCart,
    deleteCart,
    getCart,
    getAllCarts
} = require("../controllers/cartController");

router.post("/", verifyTokenAndAuthorization, createCart);

router.delete("/:cartID", verifyTokenAndAuthorization, deleteCart);

router.get("/:userID", verifyTokenAndAuthorization, getCart);

router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;

