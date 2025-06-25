import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import userRoute from "./src/routes/user.route.js";
import taskRoute from "./src/routes/task.route.js";

dotenv.config();
const app=express();
const PORT=process.env.PORT || 4000;

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json());

connectDB();

app.use("/api/user",userRoute);
app.use("/api/task",taskRoute);

app.listen(PORT,()=>{
    console.log("Server is listening...");
})
