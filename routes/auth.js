const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const {
  userRegister,
  userLogin,
} = require("../controllers/authController");

// register
router.post("/register", userRegister);
// login

router.post("/login", userLogin);

module.exports = router;
