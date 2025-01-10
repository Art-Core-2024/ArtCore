'use client';
import Image from 'next/image';
import React from 'react';
import ContactForm from '@/components/ContactPage/ContactForm';
import ContactSocials from '@/components/ContactPage/ContactSocials';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className='w-full h-screen relative overflow-hidden'>
      <Image
        src="/Bg-screen.jpg"
        alt="Background image"
        width={1000}
        height={1000}
        priority
        className='fixed top-0 h-screen w-full z-[-2]'
      />
      <div className='absolute inset-0 bg-[#000000] opacity-70 z-[-1]'></div>
      <motion.div
        initial={{ translateX: -100, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.35 }}
        className='z-[1] flex flex-col items-start justify-center italic gap-3 text-white w-full pt-28 px-20 font-carter tracking-wider text-4xl drop-shadow-text'
      >
        CONTACT US
        <hr className='border-none h-[1px] bg-white w-full' />
      </motion.div>
      <div className='w-full h-full px-20 pt-8 flex items-center justify-between gap-10'>
        <ContactForm />
        <ContactSocials />
      </div>
    </div>
  )
}

export default Contact