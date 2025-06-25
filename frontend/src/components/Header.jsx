import React, { useState } from 'react';
import {Link, NavLink } from 'react-router-dom';
import { useAuth } from '../authContext'

function Header(){
    const {username,setUsername,setToken}=useAuth();
    const [menuItems,setMenuItems]=useState(false);

    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUsername(null);
        setToken(null);

    }


    const handleMenuItems=()=>{
        setMenuItems(!menuItems);
    }

    const handleAutoCloseMenu=()=>{
        setMenuItems(false);
    }
    return(
        <header className='mb-2 w-screen flex items-center gap-2 p-2 z-10'>
        
        <div className='w-[50%] mx-2 p-2 flex items-center justify-center'>
    
        <div className='p-1 mx-2 h-fit rounded items-center justify-center bg-pink-200'>
        <h1 className='text-2xl'>TMA</h1>
        </div>

        <div className='flex flex-col'>
        <Link to="/"><h2 className='font-bold sm:text-xl lg:text-xl'>Task Manager App</h2></Link>
        <p className='hidden lg:block'>{username?'Welcome Back!':'please login/signup for view your tasks!'}</p>
        </div>
        
        </div>

        <nav className='w-[50%] flex md:flex-row md:h-fit items-center justify-center'>
            <ul className={menuItems?'w-screen bg-white left-0 flex flex-col items-start absolute h-auto border border-t-2 p-3 top-[13%]':
                'hidden md:flex'}>
                {username &&
                <div className='flex flex-col sm:flex-row p-2 gap-7 items-start '>
                <li onClick={handleAutoCloseMenu} className='font-bold'> 
                <NavLink to="/" state={{ showAddTask: true }}>Add Task</NavLink></li>
                <li onClick={handleLogout} className='mx-2 font-bold'><NavLink to="/login">Logout</NavLink></li>
                </div>
                }

                {!username &&
                <li onClick={handleAutoCloseMenu} className='rounded-2xl p-1 bg-pink-600 text-white font-semibold'>
                    <NavLink to="/login">Login/Signup</NavLink></li>
                
                }
                    
                {
                <div className='hidden md:flex'>    
                <p className='separator my-auto font-bold mx-1'>|</p>
                <p className='username align-middle my-auto mx-2'>
                {username?username:"Not login"}</p>
                </div>
                }
            </ul>
            
        </nav>
        
        <div 
            className="w-auto mr-5 md:hidden lg:hidden flex flex-col  gap-1 p-2 cursor-pointer bg-pink-200 rounded" 
            onClick={handleMenuItems}
            >
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            </div>
       </header>

    )
}

export default Header;