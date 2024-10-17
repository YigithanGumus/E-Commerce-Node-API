const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category");
const fileUpload = require('express-fileupload');

dotenv.config();

app.use(fileUpload()); // fileUpload middleware'i burada tanımlanıyor

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "ecommerce",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("başarılı"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);

app.listen(5000, () => {
  console.log("API Aktif durumdadır!");
});
