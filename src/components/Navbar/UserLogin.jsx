'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { auth } from '@/firebase/firebase'; // Import Firebase auth instance
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase methods

const UserLogin = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    try {
      if (auth.currentUser) {
        // If logged in via Firebase (social media or email/password)
        await signOut(auth);
        console.log('Firebase user signed out');
      }

      // Clear local session if present
      localStorage.removeItem('user');
      setUser(null);
      setDropdownOpen(false);

      console.log('User successfully signed out');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      {user ? (
        <>
          <div
            className="text-white font-semibold cursor-pointer border-2 border-green-500 px-4 py-2 flex items-center justify-center gap-3 rounded-full bg-black shadow-md shadow-green-400 transition duration-200 ease-in-out hover:scale-105 drop-shadow-2xl"
            onClick={toggleDropdown}
          >
            <Image
              src={user.photoURL || '/user.png'} // Fallback avatar if none exists
              alt={user.displayName || 'User'}
              className="size-8 rounded-full"
              width={50}
              height={50}
            />
            {user.displayName || 'User'}
          </div>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-10 top-16 mt-2 w-48 text-center font-semibold border-2 text-white border-green-500 bg-black rounded-md shadow-lg py-1 z-20"
            >
              <Link href="/profile">
                <p className="block px-4 py-2 text-sm hover:bg-green-500 hover:text-black">Profile</p>
              </Link>
              <Link href="/settings">
                <p className="block px-4 py-2 text-sm hover:bg-green-500 hover:text-black">Settings</p>
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm hover:bg-red-700"
              >
                Sign out
              </button>
            </div>
          )}
        </>
      ) : (
        <Link href="/auth">
          <div className="text-white font-semibold cursor-pointer border-2 border-green-500 px-6 py-2 flex items-center justify-center rounded-full bg-black shadow-md shadow-green-400 transition duration-200 ease-in-out hover:scale-105 drop-shadow-2xl">
            Login/Signup
          </div>
        </Link>
      )}
    </>
  );
};

export default UserLogin;