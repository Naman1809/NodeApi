import express from "express";
import { getAllUsers, getHomePage, getUserDetails, register } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getHomePage);

router.get("/all",getAllUsers );

router.get("/userid/:id",getUserDetails );

router.post("/new",register );

export default router;
