const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    address: {
      street: req.body.street,  
      city: req.body.city,
      zipCode: req.body.zipCode,
      country: req.body.country
    },
  });


  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      console.log(error);
      res.status(500).json({ error: "Sunucu hatası oluştu." });
    }
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password && res.status(401).json("Wrong");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken});
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
});

module.exports = router;
