const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {

    const findUser = await User.findOne({ email: req.body.email });

    if (findUser) {
        return res.status(400).json("Bu email adresi zaten kullanılmaktadır!");
    }

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
        address: {
            street: req.body.address.street,
            city: req.body.address.city,
            zipCode: req.body.address.zipCode,
            country: req.body.address.country
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
}

const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("Hatalı kimlik bilgileri!");
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        var originalText = hashedPassword.toString(CryptoJS.enc.Utf8);
        console.log("Çözülmüş şifre:", originalText);

        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (OriginalPassword !== req.body.password) {
            return res.status(401).json("Şifre hatalı!");
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (error) {
        console.log("Hata:", error);

        res.status(500).json("Sunucu hatası oluştu.");
    }
}

module.exports = {
    userRegister,
    userLogin,
};
