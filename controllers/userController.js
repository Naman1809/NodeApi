import { User } from "../models/usermodel.js";



export const getHomePage = (req, res) => {
    res.send("Hello");
  }

export const getAllUsers = async (req, res) => {
    const users = await User.find({});
  
    res.send({
      success: true,
      users,
    });
  }

export const getUserDetails = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
  
    res.json({
      success: true,
      user,
    });
  }

export const register = async (req, res) => {
    const { name, email, password } = req.body;
  
    await User.create({
      name,
      email,
      password,
    });
  
    res.status(201).cookie("temp", "lol").send({
      success: true,
      message: "Registered Sucessfully",
    });
  }