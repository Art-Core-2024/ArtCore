'use client';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { useState } from 'react';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className='w-full h-full'>
      <div className='w-full'>
        <p className='text-green-500 text-2xl font-bold uppercase text-center'>Login</p>
        <hr className='h-[1px] border-0 bg-green-500 mt-2 mb-8' />
      </div>
      <form action="" className='text-white flex flex-col items-center gap-7'>
        <div className='w-full gap-3 flex flex-col items-center'>
          <div className='flex flex-col items-center gap-6 w-full'>
            <div className='flex items-center border-2 rounded-md border-green-500 bg-transparent py-1 px-2 w-full'>
              <EnvelopeIcon className='text-white mr-3 size-7 p-1' />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email address"
                className='bg-transparent font-medium text-white w-full outline-none'
              />
            </div>
            <div className='flex items-center border-2 rounded-md border-green-500 bg-transparent py-1 px-2 w-full'>
              <KeyIcon className='text-white mr-3 size-7 p-1' />
              <input
                type={`${!showPassword ? 'password' : 'text'}`}
                name="password"
                id="password"
                placeholder="Enter your Password"
                className='bg-transparent font-medium text-white w-full outline-none'
              />
              {showPassword ? (
                <EyeIcon className='text-white size-7 p-1 cursor-pointer' onClick={() => setShowPassword(false)} />
              ) : (
                <EyeSlashIcon className='text-white size-7 p-1 cursor-pointer' onClick={() => setShowPassword(true)} />
              )}
            </div>
            <div className='flex items-center border-2 rounded-md border-green-500 bg-transparent py-1 px-2 w-full'>
              <KeyIcon className='text-white mr-3 size-7 p-1' />
              <input
                type={`${!showConfirmPassword ? 'password' : 'text'}`}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-enter your Password"
                className='bg-transparent font-medium text-white w-full outline-none'
              />
              {showConfirmPassword ? (
                <EyeIcon className='text-white size-7 p-1 cursor-pointer' onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <EyeSlashIcon className='text-white size-7 p-1 cursor-pointer' onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>
          </div>
          <div className='flex items-center justify-between w-full px-4'>
            <div className='flex items-center cursor-pointer'>
              <input type="checkbox" id="rememberMe" className='mr-2 size-4 cursor-pointer' />
              <label htmlFor="rememberMe" className='cursor-pointer transition duration-100 ease-in-out hover:text-gray-400'>Remember Me</label>
            </div>
            <Link href='/auth/forgot-password'>
              <div className='hover:underline cursor-pointer'>Forgot Password?</div>
            </Link>
          </div>
        </div>
        <button className='w-full border-2 border-green-500 py-1 rounded-md text-lg font-bold transition duration-200 ease-in-out hover:bg-green-900'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login