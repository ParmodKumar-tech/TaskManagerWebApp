import React, {  useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API } from '../../api/user.api';
import { useAuth } from '../../authContext';
import toast from 'react-hot-toast';
import axios from 'axios';


export default function SignupPage(){
    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting}}=useForm();
   
    const navigate=useNavigate();
    const {setUsername,token,setToken}=useAuth();

    const onSubmit=async(data)=>{
            try{
            const res=await axios.post(`${USER_API}/signup`,data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            
            if(res.data.success){
                toast.success(res.data.message);
                localStorage.setItem("username",res.data.username);
                localStorage.setItem("token",res.data.token);
                setToken(res.data.token);
                setUsername(res.data.username);
                navigate("/");
                
            }
            
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    
  
    }

    return(
        <div className='w-full h-screen flex items-center bg-pink-200'>
        <form className='m-5 w-[80%] md:w-[70%] lg:w-[45%]  mx-auto bg-[#f2ececea] border border-gray-400 rounded-md p-5 my-10' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center'>
            <h1 className='text-2xl my-2'>Signup for an account!</h1>
            <p className='mx-2'>|</p>
            <span
            className='text-sm mt-1'>Already have an account! 
            <Link to="/login" 
            className='text-pink-600 mx-1'>Login</Link>
            </span>
        </div>
            <div className='flex my-1'>
            <label className='mr-1'>Username</label>
            <span className='text-red-500'>
            {errors.username && errors.username.message}
            </span>
            </div>

            <input
            className='w-full border rounded-md p-1'
            {...register("username", 
            {required:"*Required"})} 
            placeholder="Username" />
        
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
            className='mt-3 p-1 border  rounded-md w-full font-semibold bg-pink-600 text-white' 
            disabled={isSubmitting}>
            {isSubmitting?"Loading...":"Signup"}</button>



        </form>
        </div>
    )
}
