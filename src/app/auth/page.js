'use client';
import AuthToggle from '@/components/Auth/AuthToggle';
import Login from '@/components/Auth/Login';
import Signup from '@/components/Auth/Signup';
import Image from 'next/image';
import React, { useState } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const setLogin = () => {
    setIsLogin(true);
  };

  const setSignup = () => {
    setIsLogin(false);
  };

  return (
    <div className="w-full min-h-screen lg:h-screen relative flex lg:flex-row flex-col items-center justify-between pb-20 overflow-hidden gap-8 lg:gap-0 pt-5 lg:pt-0 px-3 lg:px-10">
      <Image
        src="/Bg-screen.jpg"
        alt="Background image"
        width={1000}
        height={1000}
        priority
        className='fixed inset-0 top-0 h-full w-full z-[-2]'
      />
      <div className="absolute inset-0 bg-[#000000] opacity-20"></div>
      <AuthToggle
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setLogin={setLogin}
        setSignup={setSignup}
      />
      <div className="bg-[#0000008f] backdrop-blur-md border-2 border-green-500 w-full lg:h-[77%] lg:w-[53rem] lg:mt-32 rounded-md p-5 px-4 flex flex-col items-center justify-between z-10 shadow-md drop-shadow-2xl shadow-green-400">
        {isLogin ? <Login /> : <Signup setIsLogin={setIsLogin} />}
      </div>
    </div>
  );
};

export default Auth;