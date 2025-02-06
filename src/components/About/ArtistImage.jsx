'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ArtistImage = () => {
  return (
    <motion.div
      initial={{ translateX: -100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.35 }}
      className='flex items-center justify-center relative w-1/3 h-full'
    >
      <Image
        src='/Arundhati.jpg'
        alt='Arundhati Bera'
        width={1500}
        height={1500}
        className='w-[15rem] h-[15rem] object-cover absolute -ml-28 z-10 border-3 border-black rounded-full'
        priority
      />
      <Image
        src='/Anusua.jpg'
        alt='Anusua Maity'
        width={1500}
        height={1500}
        className='w-[15rem] h-[15rem] object-cover absolute mt-[13rem] ml-32 z-10 border-3 border-black rounded-full'
        priority
      />
    </motion.div>
  )
}

export default ArtistImage;