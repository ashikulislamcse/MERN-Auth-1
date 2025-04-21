import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user Already Exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    return res
      .status(200)
      .json({ success: true, message: "Register Succeess" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Register Server Error" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are reguired" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password not match" });
    }
    const token = await jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({
        success: true,
        message: "User Login Success",
        user: {
          userId: user._id,
          Name: user.name,
          email: user.email,
          token: token,
        },
      });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Login Server Error" });
  }
};

export const userLogout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        secure: true,
        sameSite: "None",
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User Logout Success",
      });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Logout Server Error" });
  }
};
