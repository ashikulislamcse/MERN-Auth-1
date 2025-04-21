import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "token Not Found" });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res
        .status(400)
        .json({ success: false, message: "User not Authorized" });
    }
    req.userId = decode.userId;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Logout Server Error" });
  }
};

export default userAuth;
