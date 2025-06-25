import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

const AuthContext=createContext();

export const useAuth=()=>{return useContext(AuthContext)};

export const AuthProvider=({children})=>{
    const [username,setUsername]=useState(()=>localStorage.getItem("username"));
    const [token,setToken]=useState(()=>localStorage.getItem("token"));
    
    useEffect(()=>{
        if(!token){toast.error("token not exists!, login again!")};
        
    },[token,username])

    const value={
        username,setUsername,token,setToken
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
