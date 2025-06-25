import express from "express";
import { AuthUser } from "../middlewares/auth.middleware.js";
import { createTask, getAllTasks } from "../controllers/task.controller.js";

const router=express.Router();

router
    .route("/tasks")
    .get(AuthUser,getAllTasks)

router 
    .route("/task")
    .post(AuthUser,createTask)

export default router;