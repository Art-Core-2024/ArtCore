'use client';
import React from 'react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) return null;

    return (
        <div
            className={`w-20 h-9 rounded-full bg-transparent fixed top-3 right-3 border-2 flex items-center pl-1 ${theme === 'light' ? 'border-black' : 'border-white'}`}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            <div className={`w-7 h-7 rounded-full transition duration-200 ease-in-out p-[0.2rem] flex justify-center items-center ${theme === 'light' ? 'bg-black translate-x-0' : 'bg-white translate-x-10'}`}>
                {theme === 'light' ? (
                    <SunIcon className={`w-7 h-7 text-yellow-300`} />
                ) : (
                    <MoonIcon className={`w-7 h-7 text-gray-600`} />
                )}
            </div>
        </div>
    )
}

export default ThemeSwitcher