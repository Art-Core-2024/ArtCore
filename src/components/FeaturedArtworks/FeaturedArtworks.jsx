'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Artwork from '@/components/Artwork/Artwork';

const FeaturedArtworks = () => {

    return (
        <div className='w-full min-h-screen text-white overflow-hidden pt-32'>
            <motion.div
                initial={{ translateX: -100, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.35 }}
                className='z-[1] flex flex-col items-start justify-center italic gap-3 w-full px-20 font-carter tracking-wider text-5xl drop-shadow-text'
            >
                <div className='flex items-center justify-between w-full'>
                    FEATURED ARTWORKS
                    <Link href='/artworks'>
                        <button className='text-lg font-sans flex items-center justify-center gap-3 border-2 border-green-500 bg-black drop-shadow-3xl shadow-green-400 rounded-full px-7 py-3 font-bold transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-4xl'>
                            See All
                            <ArrowRightCircleIcon className='h-8 w-8' />
                        </button>
                    </Link>
                </div>
                <hr className='border-none h-[1px] bg-white w-[80%]' />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.35 }}
                className='relative w-full h-full overflow-hidden px-20'
            >
                <div className='w-full h-full scrollbar-hidden gap-7 flex justify-start items-center'>
                    <Artwork />
                </div>
            </motion.div>
        </div>
    )
}

export default FeaturedArtworks;