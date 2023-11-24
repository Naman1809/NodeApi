import express from "express";
import {getHomePage, getMyPofile, login, logout, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getHomePage);


router.get("/me", isAuthenticated ,getMyPofile );

router.post("/new",register );

router.post("/login",login );

router.get("/logout",logout );


export default router;
