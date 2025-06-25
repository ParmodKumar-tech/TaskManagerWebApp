import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const AuthUser=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    if(!token) return res.status(404).json({success:false,message:"Token doesn't exists"});

    try{
    const verifyToken=JWT.verify(token,process.env.JWT_SECRET_KEY);
    req.userId=verifyToken.userId;
    next();
    }
    catch(error){
        res.status(403).json({message:"Token failed, please Signup now!",success:false});
    }
}