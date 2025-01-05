'use client';
import { LockClosedIcon, PaintBrushIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const LeftSection = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase Auth State Listener
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          email: firebaseUser.email,
        });
      } else {
        // Check local storage for local login session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
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
      className='w-1/2 h-full flex flex-col justify-center items-center gap-12 pt-20 text-white'
    >
      <div className='w-full flex flex-col justify-center items-center gap-6 text-white'>
        <p className='font-carter text-7xl font-bold tracking-wide drop-shadow-text'>ART CORE</p>
        <p className='font-jim text-4xl font-medium text-center tracking-wide'>&quot;Curating Beauty, one Brushstroke at a Time&quot;</p>
      </div>
      <div className='w-full flex items-center justify-center gap-16'>
        {user ? (
          <>
            <div
              className='text-green-500 font-semibold border-2 border-green-500 px-5 py-2 flex items-center justify-center text-lg gap-3 rounded-full bg-black shadow-md shadow-green-400 transition duration-200 ease-in-out drop-shadow-2xl'
            >
              <span className='text-white'>Welcome,</span> {user.name}
            </div>
          </>
        ) : (
          <Link href='/auth' className='flex items-center justify-center gap-3 border-2 border-green-500 bg-black drop-shadow-3xl shadow-green-400 rounded-full px-7 py-3 font-bold transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-4xl'>
            <LockClosedIcon className='h-6 w-6' />
            Login/Signup
          </Link>
        )}
        <button className='flex items-center justify-center gap-3 border-2 border-green-500 bg-black drop-shadow-3xl shadow-green-400 rounded-full px-7 py-3 font-bold transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-4xl'>
          <PaintBrushIcon className='h-6 w-6' />
          Explore Artworks
        </button>
      </div>
    </motion.div>
  )
}

export default LeftSection