
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API } from '../../api/user.api';
import toast from 'react-hot-toast';
import { useAuth } from '../../authContext';


export default function LoginPage(){
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm();
    const {setUsername,token,setToken}=useAuth();
    const navigate=useNavigate();
    

    const onSubmit=async(data)=>{
    
        try{
        const res=await axios.post(`${USER_API}/login`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        
        if(res.data.success){
            localStorage.setItem("username",res.data.username);
            localStorage.setItem("token",res.data.token);
            setUsername(res.data.username);
            setToken(res.data.token);
            toast.success(res.data.message);
            navigate("/");
        
            
        }
        
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        
    }

    return(
        <div className='w-full h-screen flex items-center bg-pink-200'>
        <form onSubmit={handleSubmit(onSubmit)} className=' bg-[#f2ececea] m-5 w-[80%] md:w-[70%] lg:w-[45%] mx-auto  border border-gray-400 rounded-md p-4 my-10' >
            
            <div className='flex items-center'>
                <h1 className='text-2xl my-2'>Login to your account!</h1>
                <p className='mx-2'>|</p>
                <span 
                className='text-sm mt-1'>Don't have an account? 
                <Link to="/signup" 
                className='text-pink-600 mx-1'>Signup</Link>
                </span>
            </div>
            
            <div className='flex mt-4'>
                <label className='mr-1'>Email</label>
                <span className='text-red-500'>
                {errors.email && errors.email.message}
                </span>
            </div>

            <input
            className='w-full border rounded-md p-1'
            {...register("email", 
            {required:"*Required"})} 
            placeholder="email" />

            <div className='flex mt-4'>
            <label className=' mr-2'>Password</label>
            <span className='text-red-500'>
            {errors.password && errors.password.message}
            </span>
            </div>

            <input
            className='w-full border rounded-md p-1'
            {...register("password", 
            {required:"*Required"})} 
            placeholder="password"/>

            <button  
            className='mt-3 p-1 border rounded w-full text-white font-semibold bg-pink-600' 
            disabled={isSubmitting}>
            {isSubmitting?"Loading...":"Login"}</button>

            

        </form>
        </div>
    )
}
