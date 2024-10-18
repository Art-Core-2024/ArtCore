'use client';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

const UserLogin = () => {
    const user = 1;

    return (
        <>
            {user ? (
                <div className='text-white font-semibold cursor-pointer border-2 border-green-500 px-6 py-2 flex items-center justify-center gap-3 rounded-full bg-black backdrop-blur-xl shadow-sm shadow-green-400 transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-4xl drop-shadow-3xl'>
                    <UserCircleIcon className='size-7' />
                    Sambit
                </div>
            ) : (
                <div className='text-white font-semibold cursor-pointer border-2 border-green-500 px-6 py-2 flex items-center justify-center rounded-full bg-black backdrop-blur-xl shadow-sm shadow-green-400 transition duration-200 ease-in-out hover:drop-shadow-4xl drop-shadow-3xl'>
                    Login/Signup
                </div>
            )}
        </>
    )
}

export default UserLogin