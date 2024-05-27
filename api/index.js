const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

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
    res.status(201).json("OK!");
});

app.listen(4000, () => {
    console.log("Server is running on port : 4000");
});
