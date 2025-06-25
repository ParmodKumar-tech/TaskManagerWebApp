import User from "../models/user.model.js";
import jWT from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isUserExists = await User.findOne({ where: { email } });
    if (isUserExists) {
      return res.status(409).json({ success: false, message: "User already exists!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashPassword });

    const token = jWT.sign({ userId: newUser.dataValues.id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    return res.status(200).json({
      success: true,
      message: "Signup Successfully!",
      token,
      username: newUser.dataValues.username,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Signup failed", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExists = await User.findOne({ where: { email } });
    if (!isUserExists) {
      return res.status(404).json({ success: false, message: "User not found, Signup now!" });
    }

    const isPasswordMatch = await bcrypt.compare(password, isUserExists.dataValues.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Email or password is incorrect" });
    }

    const token = jWT.sign({ userId: isUserExists.dataValues.id }, process.env.JWT_SECRET_KEY);

    return res.status(200).json({
      success: true,
      message: "Login Successfully!",
      token,
      username: isUserExists.dataValues.username,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
};
