'use client';
import { LockClosedIcon, PaintBrushIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';

const LeftSection = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const syncUserState = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          email: firebaseUser.email,
        });
      } else {
        syncUserState();
      }
    });

    window.addEventListener('storage', syncUserState);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', syncUserState);
    };
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  return (
    <motion.div
      initial={{ translateX: -100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.35 }}
      className='w-full text-center lg:w-1/2 h-full px-4 lg:px-0 flex flex-col justify-center items-center gap-12 lg:pt-20 text-white'
    >
      <div className='w-full flex flex-col justify-center items-center gap-6 text-black'>
        <div className='w-full rounded-full lg:hidden flex items-center justify-center lg:mx-auto my-auto'>
          <Image
            src='/Arundhati.jpg'
            alt='Arundhati Bera'
            width={1500}
            height={1500}
            className='size-40 object-cover border-3 border-black rounded-full'
            priority
          />
        </div>
        <p className='font-carter text-5xl lg:text-7xl font-bold tracking-wide drop-shadow-text lg:pt-0'>ART CORE</p>
        <p className='font-jim text-2xl lg:text-3xl font-medium text-center tracking-wide'>&quot;Your one stop destination for artistic decoratives&quot;</p>
      </div>
      <div className='w-full flex lg:flex-row flex-col items-center justify-center gap-3 lg:gap-16'>
        {user ? (
          <>
            <div
              className='text-green-500 w-full lg:w-auto font-semibold border-2 border-green-500 px-5 py-2 flex items-center justify-center text-lg gap-3 rounded-full bg-black transition duration-200 ease-in-out'
            >
              <span className='text-white'>Welcome,</span> {user.name}
            </div>
          </>
        ) : (
          <Link href='/auth' className='w-full lg:w-auto flex items-center justify-center gap-3 border-2 border-green-500 bg-black rounded-full px-7 py-3 font-bold transition duration-200 ease-in-out hover:scale-105'>
            <LockClosedIcon className='h-6 w-6' />
            Login/Signup
          </Link>
        )}
        <Link href='/artworks' className='w-full lg:w-auto flex items-center justify-center gap-3 border-2 border-green-500 bg-black rounded-full px-7 py-3 font-bold transition duration-200 ease-in-out hover:scale-105'>
          <PaintBrushIcon className='h-6 w-6' />
          Explore Artworks
        </Link>
      </div>
    </motion.div>
  )
}

export default LeftSection