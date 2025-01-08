'use client';
import Image from 'next/image'
import React, { useState } from 'react'

const AuthToggle = ({ isLogin, setIsLogin, setLogin, setSignup }) => {

  return (
    <div className='bg-[#0000008f] backdrop-blur-md border-2 border-green-500 h-[72%] w-80 mt-24 rounded-md p-5 flex flex-col items-center justify-between z-10 shadow-md drop-shadow-2xl shadow-green-400'>
      <div className='w-full flex flex-col items-center justify-center gap-2'>
        <Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
          className='size-20 border-2 border-green-500 rounded-full bg-black backdrop-blur-xl'
        />
        <p className='text-green-500 font-semibold text-lg mb-3 font-carter tracking-widest'>ART CORE</p>
        {isLogin ? <>
          <p className='text-white text-sm font-bold text-center font-sans'>Welcome back, <span className='text-green-500'>art aficionado!</span></p>
          <p className='text-white text-[1.1rem] font-normal text-center font-jim'>Let your walls tell your story again.</p>
        </> : <>
          <p className='text-white text-sm font-bold text-center font-sans'>Welcome to Art Core, <span className='text-green-500'>art aficionado!</span></p>
          <p className='text-white text-[1.1rem] font-normal text-center font-jim'>Unleash your taste for the extraordinary.</p>
        </>}
      </div>
      <div className='w-full flex flex-col items-center justify-center gap-4'>
        <hr className='w-full bg-green-500 h-[1px] border-none mb-2' />
        <button className={`w-full bg-black border-2 border-green-500 transition duration-200 ease-in-out text-white py-1 text-[1rem] rounded-md font-bold tracking-wider ${isLogin ? 'bg-green-950' : 'hover:scale-110'}`} onClick={setLogin}>Login</button>
        <button className={`w-full bg-black border-2 border-green-500 transition duration-200 ease-in-out text-white py-1 text-[1rem] rounded-md font-bold tracking-wider ${!isLogin ? 'bg-green-950' : 'hover:scale-110'}`} onClick={setSignup}>Signup</button>
      </div>
    </div>
  )
}

export default AuthToggle