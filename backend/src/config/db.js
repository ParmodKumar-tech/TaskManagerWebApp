import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize =new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:process.env.DB_DIALECT
})

export const connectDB=async()=>{
    try{
    await sequelize.authenticate();
    console.log("Connected DB");
    await sequelize.sync();
    }
    catch(error){
        console.log("Error",error.message);
        process.exit(1);
    }
}

export default sequelize;