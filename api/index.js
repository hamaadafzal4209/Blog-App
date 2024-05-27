const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require('./models/User.js')
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://127.0.0.1:27017/MyBlogApp")
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const user = await userModel.create({
                username,
                email,
                password: hash
            })
            res.json(user);
        });
    });

});

app.listen(4000, () => {
    console.log("Server is running on port : 4000");
});
