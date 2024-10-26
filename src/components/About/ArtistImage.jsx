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
        className='flex items-center justify-center'
    >
        <Image
            src="/Arundhati.jpg"
            alt="Arundhati Bera"
            width={1500}
            height={1500}
            className='w-72 border-2 shadow-sm border-green-500 drop-shadow-3xl rounded-md shadow-green-400 p-4 bg-black backdrop-blur-lg'
        />
    </motion.div>
  )
}

export default ArtistImage