'use client';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { useState } from 'react';

const UserLogin = () => {
    const user = 0;

    return (
        <>
            {user ? (
                <div className='text-white font-semibold cursor-pointer border-2 border-green-500 px-6 py-2 flex items-center justify-center gap-3 rounded-full bg-black shadow-md shadow-green-400 transition duration-200 ease-in-out hover:scale-105 drop-shadow-2xl'>
                    <UserCircleIcon className='size-7' />
                    Sambit
                </div>
            ) : (
                <Link href='/auth'>
                    <div className='text-white font-semibold cursor-pointer border-2 border-green-500 px-6 py-2 flex items-center justify-center rounded-full bg-black shadow-md shadow-green-400 transition duration-200 ease-in-out hover:scale-105 drop-shadow-2xl'>
                        Login/Signup
                    </div>
                </Link>
            )}
        </>
    )
}

export default UserLogin