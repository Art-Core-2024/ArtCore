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

  const handleLogout = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
        window.location.reload();
      }

      localStorage.removeItem('user');
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      {user ? (
        <>
          <div
            className="text-white font-semibold cursor-pointer border-2 border-green-500 px-4 py-2 flex items-center justify-center gap-3 rounded-full bg-black transition duration-200 ease-in-out hover:scale-105 drop-shadow-2xl"
            onClick={toggleDropdown}
          >
            <Image
              src={user.photoURL || '/user.png'} // Fallback avatar if none exists
              alt={user.name || 'User'}
              className="size-8 rounded-full"
              width={50}
              height={50}
            />
            {user.name || 'User'}
          </div>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-10 top-16 mt-2 w-48 text-center font-semibold border-2 text-white border-green-500 bg-black rounded-md shadow-lg py-1 z-20"
            >
              <Link href="/profile">
                <p className="block px-4 py-2 text-sm hover:bg-green-500 hover:text-black">Profile</p>
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