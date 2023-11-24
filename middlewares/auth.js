import { User } from "../models/usermodel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async(req,res,next)=>{
   // dekho ye to waise normaal cookie wala method tha jo hamne use kra lekin aab harr bari itna bada method use nhi kr skate islaiye ek isauthenitaced wala function bna liya jisko aab routes mai add kar dliya to jab usmenext call hoga tab jake routes mai agale wala function call hoga
    const {token}  = req.cookies;
    if(!token){
      return res.status(401).json({
        success:false,
        message:"Login First",
      })
  
    }
  
        const decodedData = jwt.verify(token,process.env.JWT_SECRET);
        // yha pe agar main controller mai use krte to req.user ki bajaye user likh skte the but aab yha kr rhe hai to aisa likh rhe hai aab contrloller ami bhi jake req.user hi likhenge

        req.user =  await User.findById(decodedData._id);
        next();
}