import { User } from "../models/usermodel.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getHomePage = (req, res) => {
  res.send("Hello");
};

export const getMyPofile = (req, res,next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    sendCookies(res, user, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    // yha pe select ka use kyu hia ki jo hamne schema bnaya hai na usme jb user ko koi acess kkarega to uske passowrd ko acess nhi kr paeg awo obviously to select se ham keh rhe hai ki jo data jaise name email wagera mil rha hia wo to mile hi sath mai +password bhi mile tabhi acess kr payenge
    let user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookies(res, user, `Welcome Back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res,next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
        user: req.user,
      });
  } catch (error) {
    next(error);
  }
};
