const router = require("express").Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const {
    createOrder,
    deleteOrder,
    getOrder,
    getAllOrders,
    getUserOrders
} = require("../controllers/orderController");

router.post("/", verifyTokenAndAuthorization, createOrder);

router.delete("/:orderID", verifyTokenAndAdmin, deleteOrder);

router.get("/:orderID", verifyTokenAndAdmin, getOrder);

router.get("/", verifyTokenAndAdmin, getAllOrders);

router.get("/user/:userID", verifyTokenAndAuthorization, getUserOrders);

module.exports = router;    
