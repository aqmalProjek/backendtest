const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, full_name, role } = req.body;

    // Cek kalau username sudah ada
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = saltRounds

    // Simpan user baru
    const newUser = await User.create({
      username,
      password: hashedPassword,
      full_name,
      role
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: {
        id: newUser.id,
        username: newUser.username,
        full_name: newUser.full_name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Cari user
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // Cek password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || "1h" }
      );
  
      return res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          role: user.role
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };



module.exports = { register, login };
