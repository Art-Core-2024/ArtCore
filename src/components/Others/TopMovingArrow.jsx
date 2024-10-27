'use client';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

const TopMovingArrow = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <ArrowUpCircleIcon 
            onClick={scrollToTop}
            className='fixed bottom-5 right-5 size-14 bg-black text-white border-2 border-green-500 shadow-md shadow-green-400 drop-shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:-translate-y-3 rounded-full z-[99]' 
        />
    )
}

export default TopMovingArrow