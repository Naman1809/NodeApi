import { User } from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookies } from "../utils/features.js";

export const getHomePage = (req, res) => {
    res.send("Hello");
  }

export const getAllUsers = async (req, res) => {
   
  }

export const getMyPofile = async (req, res) => {
 const {token}  = req.cookies;
  if(!token){
    return res.status(401).json({
      success:false,
      message:"Login First",
    })

  }

      const decodedData = jwt.verify(token,process.env.JWT_SECRET);
      const user =  await User.findById(decodedData._id);
      res.status(200).json({
        success:true,
        user,
      })

    }

export const register = async (req, res) => {
  const {name,email,password} =  req.body;
  let user = await User.findOne({email});
  if(user){
    return res.status(404).json({
      success:false,
      message: "User Already exists"
    })
  }
  const hashedPassword = await bcrypt.hash(password,10);
  user = await User.create({
    name,
    email,
    password:hashedPassword
  })
 sendCookies(res,user,"Registered Successfully",201)
  }

  export const login = async(req,res)=>{
const {email,password} =req.body;
// yha pe select ka use kyu hia ki jo hamne schema bnaya hai na usme jb user ko koi acess kkarega to uske passowrd ko acess nhi kr paeg awo obviously to select se ham keh rhe hai ki jo data jaise name email wagera mil rha hia wo to mile hi sath mai +password bhi mile tabhi acess kr payenge
let user = await User.findOne({email}).select("+password");
if(!user){
  return res.status(404).json({
    success:false,
    message:"Invalid Email or Password"
  })
}
const isMatched = await bcrypt.compare(password,user.password);

if(!isMatched){
  return res.status(404).json({
    success:false,
    message:"Invalid Email or Password"
  })
}
sendCookies(res,user,`Welcome Back ${user.name}`,200);
  }