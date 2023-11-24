import express from "express";
import { deleteTask, editTask, getMyTasks, newTask, updateTask } from "../controllers/taskController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/new", isAuthenticated, newTask)

router.get("/my", isAuthenticated, getMyTasks)

router.put("/edit/:id", isAuthenticated, editTask)

router.route("/:id")
.put(isAuthenticated,updateTask )
.delete(isAuthenticated,deleteTask);



export default router;