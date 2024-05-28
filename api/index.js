const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/User.js");
const postModel = require("./models/Post.js");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const secret = "jkjkdjklsjdksjdklsjkdjs";

// Set up multer for file uploads
const uploadMiddleware = multer({ dest: "uploads/" });

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1:27017/MyBlogApp")
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Authorization Middleware
const authorize = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, secret, {}, (err, info) => {
    if (err || !info || !info.username) {
      console.error("Invalid token or missing username:", info);
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = info;
    next();
  });
};

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      jwt.sign(
        { email, id: user._id, username: user.username },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
          });
          res.status(200).json({ message: "Login successful!", token });
        }
      );
    } else {
      return res.status(400).json({ error: "Invalid credentials!" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Failed to log in" });
  }
});

app.get("/profile", authorize, (req, res) => {
  res.json(req.user);
});

app.post("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
    })
    .json({ message: "Logout successful" });
});

app.post(
  "/post",
  authorize,
  uploadMiddleware.single("file"),
  async (req, res) => {
    const { originalname, path: tempPath } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = tempPath + "." + ext;

    try {
      fs.renameSync(tempPath, newPath);
      const { title, summary, content } = req.body;
      const coverPath = newPath.replace(/\\/g, "/");
      const post = await postModel.create({
        title,
        summary,
        content,
        cover: coverPath,
        author: req.user.id,
      });
      res.json(post);
    } catch (error) {
      console.error("Error renaming file:", error);
      res.status(500).json({ error: "Failed to save file" });
    }
  }
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/post", async (req, res) => {
  try {
    const allPosts = await postModel
      .find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 });
    res.json(allPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id).populate('author', ['username']);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port: 4000");
});
