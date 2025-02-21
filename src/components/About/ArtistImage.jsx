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
      className='hidden lg:flex items-center justify-center w-1/3 h-full bg-black rounded-md border-2 border-black drop-shadow-artist'
    >
      <div className='h-[17.5rem] flex items-start justify-center'>
        <Image
          src='/Arundhati.jpg'
          alt='Arundhati Bera'
          width={1500}
          height={1500}
          className='object-cover z-10 h-full w-full rounded-md'
          priority
        />
      </div>
    </motion.div>
  )
}

export default ArtistImage;