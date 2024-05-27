const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/User.js");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://127.0.0.1:27017/MyBlogApp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected successfully!");

        mongoose.connection.db.dropCollection("users", (err, result) => {
            if (err) {
                console.log("Error dropping collection:", err);
            } else {
                console.log("Collection dropped successfully:", result);
            }
            mongoose.connection.close();
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    try {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const user = await userModel.create({
                    username,
                    email,
                    password: hash,
                });
                res.json(user);
            });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email })
    if (!user) {
        res.status(404).json('Something Went Wrong!');
    }
    bcrypt.compare(password, hash, function (err, result) {
        result == true;
    });
})

app.listen(4000, () => {
    console.log("Server is running on port : 4000");
});
