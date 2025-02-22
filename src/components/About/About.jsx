'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ArtistImage from './ArtistImage';
import ArtistDetails from './ArtistDetails';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const aboutRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = aboutRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div ref={aboutRef} className='w-full pb-44 lg:h-screen relative text-white overflow-hidden lg:pt-32'>
            {isVisible && (
                <>
                    <motion.div
                        initial={{ translateX: -100, opacity: 0 }}
                        animate={{ translateX: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.35 }}
                        className='z-[1] flex flex-col items-end justify-center italic lg:gap-3 w-full px-3 lg:px-20 font-carter tracking-wider text-2xl lg:text-5xl drop-shadow-text text-black'
                    >
                        KNOW THE ARTIST
                        <hr className='border-none h-[2px] bg-black w-full lg:w-[80%]' />
                    </motion.div>
                    <div className='w-full flex items-center justify-center px-3 lg:pl-28 lg:px-16 pt-9 lg:gap-28 relative'>
                        <ArtistImage />
                        <ArtistDetails />
                    </div>
                </>
            )}
        </div>
    );
}

export default About;