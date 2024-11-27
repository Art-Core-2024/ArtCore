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
        <div ref={aboutRef} className='w-full h-screen relative text-white overflow-hidden pt-32'>
            <Image
                src="/Bg-screen.jpg"
                alt="Background image"
                layout="fill"
                objectFit="cover"
                objectPosition='center'
                className='scale-y-[-1]'
                priority
            />
            <div className='absolute inset-0 bg-[#000000] opacity-70'></div>
            {isVisible && (
                <>
                    <motion.div
                        initial={{ translateX: -100, opacity: 0 }}
                        animate={{ translateX: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.35 }}
                        className='z-[1] flex flex-col items-end justify-center italic gap-3 w-full px-20 font-carter tracking-wider text-5xl drop-shadow-text'
                    >
                        KNOW THE ARTIST
                        <hr className='border-none h-[1px] bg-white w-[80%]' />
                    </motion.div>
                    <div className='w-full flex items-center justify-center pt-9 gap-28'>
                        <ArtistImage />
                        <ArtistDetails />
                    </div>
                </>
            )}
        </div>
    );
}

export default About;