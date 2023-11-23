import express from "express";
import { getAllUsers, getHomePage, getMyPofile, login, register } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getHomePage);

router.get("/all",getAllUsers );

router.get("/me",getMyPofile );

router.post("/new",register );

router.post("/login",login );


export default router;
