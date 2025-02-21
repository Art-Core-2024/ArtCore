'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Artwork from '@/components/Artwork/Artwork';

const FeaturedArtworks = () => {

    return (
        <div className='w-full pb-16 lg:min-h-screen text-white lg:overflow-hidden lg:pt-32'>
            <motion.div
                initial={{ translateX: -100, opacity: 0 }}
                animate={{ translateX: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.35 }}
                className='z-[1] flex flex-col items-end justify-center italic gap-2 lg:gap-3 w-full px-3 lg:px-20 font-carter tracking-wider text-2xl lg:text-5xl drop-shadow-text text-black'
            >
                <div className='flex items-end lg:items-center justify-between w-full text-black'>
                    FEATURED ARTWORKS
                    <Link href='/artworks'>
                        <button className='text-lg font-sans text-white flex items-center justify-center lg:gap-3 border-2 border-green-500 bg-black drop-shadow-3xl shadow-green-400 rounded-full lg:px-7 lg:py-3 font-bold transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-4xl'>
                            <span className='lg:flex hidden items-center justify-center'>
                                See All
                            </span>
                            <ArrowRightCircleIcon className='h-8 w-8' />
                        </button>
                    </Link>
                </div>
                <hr className='border-none h-[2px] bg-black w-full lg:w-[80%]' />
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.35 }}
                className='relative w-full h-full overflow-hidden px-16 lg:px-20'
            >
                <div className='w-full h-full scrollbar-hidden gap-7 flex justify-start items-start lg:items-center'>
                    <Artwork />
                </div>
            </motion.div>
        </div>
    )
}

export default FeaturedArtworks;