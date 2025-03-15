const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/mysql/User");

const JWT_SECRET = process.env.JWT_SECRET;

const AuthController = {
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findByEmail(email);
      if (existingUser)
        return res.status(400).json({ message: "Email already in use" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userId = await User.createUser(name, email, hashedPassword);

      res.status(201).json({ message: "User registered", userId });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      let user = await User.findByEmail(email);
      if (!user)
        return res.status(400).json({ message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid email or password" });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      delete user.password;
      res.json({ message: "Login successful", token, user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = AuthController;
