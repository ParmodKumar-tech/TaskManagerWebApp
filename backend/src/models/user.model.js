import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User=sequelize.define("User",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING(50),
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }   
},{
    tableName:"user",
    timestamps:true
})

export default User;