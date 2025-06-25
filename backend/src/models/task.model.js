import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const Task=sequelize.define("Task",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    
    status:{
        type:DataTypes.ENUM("To Do","In Progress","Done"),
        defaultValue:"To Do"
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
},{
    tableName:"task",
    timestamps:true
})

User.hasMany(Task,{foreignKey:"userId",onDelete:"CASCADE"});
Task.belongsTo(User,{foreignKey:"userId"});

export default Task;