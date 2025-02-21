'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const RightSection = () => {

  return (
    <motion.div
      initial={{ translateX: 100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.35 }}
      className='w-full lg:w-1/2 lg:pt-16 h-full hidden lg:flex items-center justify-center relative text-white overflow-hidden'
    >
      <div className='w-full h-full relative rounded-full p-3 flex items-center justify-center mx-auto my-auto overflow-hidden'>
        <Image
          src='/Arundhati.jpg'
          alt='Arundhati Bera'
          width={1500}
          height={1500}
          className='w-[19rem] h-[19rem] object-cover z-10 border-3 border-black rounded-full'
          priority
        />
      </div>
    </motion.div>
  )
}

export default RightSection