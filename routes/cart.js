const router = require("express").Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const {
    createCart,
    updateCart,
    deleteCart,
    getCart,
    getAllCarts
} = require("../controllers/cartController");

router.post("/", verifyTokenAndAuthorization, createCart);

router.put("/:cartID", verifyTokenAndAuthorization, updateCart);

router.delete("/:cartID", verifyTokenAndAuthorization, deleteCart);

router.get("/:userID", verifyTokenAndAuthorization, getCart);

router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;

