'use client';
import AuthToggle from '@/components/Auth/AuthToggle'
import Login from '@/components/Auth/Login'
import Signup from '@/components/Auth/Signup'
import SocialLogins from '@/components/Auth/SocialLogins'
import Image from 'next/image'
import React, { useState } from 'react'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const setLogin = () => {
    setIsLogin(true);
  }

  const setSignup = () => {
    setIsLogin(false);
  }

  return (
    <div className='w-full h-screen relative flex items-center justify-between overflow-hidden px-10'>
      <Image
        src="/Bg-screen.jpg"
        alt="Background image"
        layout="fill"
        objectFit="cover"
        objectPosition='center'
        priority
      />
      <div className='absolute inset-0 bg-[#000000] opacity-70'></div>
      <AuthToggle
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setLogin={setLogin}
        setSignup={setSignup}
      />
      <div className='bg-[#0000008f] backdrop-blur-md border-2 border-green-500 h-[72%] w-[53rem] mt-24 rounded-md p-5 px-4 flex flex-col items-center justify-between z-10 shadow-md drop-shadow-2xl shadow-green-400'>
        {isLogin ? <Login /> : <Signup />}
      </div>
      {/* <SocialLogins /> */}
    </div>
  )
}

export default Auth