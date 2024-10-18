'use client';
import React from 'react';
import { motion } from 'framer-motion';
import DetailsText from './DetailsText';

const ArtistDetails = () => {
    return (
        <motion.div
            initial={{ translateX: 100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.35 }}
            className='flex flex-col items-center justify-center border-2 border-green-500 shadow-sm drop-shadow-3xl rounded-md shadow-green-400 px-8 py-4 bg-[#000000b0] backdrop-blur-lg'
        >
            {DetailsText.map((detail, index) => (
                <div key={index} className='flex items-center justify-between w-full gap-24 py-[0.4rem]'>
                    <p className='font-sans text-lg font-semibold'>{detail.title}</p>
                    <p className='font-sans text-lg font-normal'>{detail.description}</p>
                </div>
            ))}
        </motion.div>
    )
}

export default ArtistDetails