import express from "express";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../Controllers/userController.js";
import userAuth from "../config/isAuth.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/logout",userAuth, userLogout);

export default userRouter;
