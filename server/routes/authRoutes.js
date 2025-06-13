const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secretkey"; // Keep this secret in .env

// User Registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("Registering user:", username); // 🔍 Log
    const existing = await User.findOne({ username });
    if (existing) {
      console.log("User already exists:", username); // 🔍 Log
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    console.log("User created:", user); // 🔍 Log
    res.status(201).json({ message: "Registered successfully", user: user.username });
  } catch (err) {
    console.error("Registration error:", err); // 🔥 Print full error
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
});


// User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: user.username });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
