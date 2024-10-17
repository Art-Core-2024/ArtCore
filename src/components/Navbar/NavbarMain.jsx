'use client';
import React, { useEffect, useState } from 'react';
import { BookOpenIcon, HomeIcon, PaintBrushIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';

const NavbarMain = ({ theme }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        if (pathname === '/') {
            setActiveTab('home');
        } else if (pathname === '/artworks') {
            setActiveTab('artworks');
        } else if (pathname === '/about') {
            setActiveTab('about');
        } else if (pathname === '/contact') {
            setActiveTab('contact');
        }
    }, [pathname]);

    const handleNavigation = (path, tab) => {
        setActiveTab(tab);
        router.push(path);
    };

    return (
        <div className={`border-2 border-green-500 shadow-sm shadow-green-400 drop-shadow-3xl w-[70%] py-2 rounded-full bg-[#4b556381] backdrop-blur-xl flex items-center justify-around`}>
            <HomeIcon
                className={`size-7 cursor-pointer transition duration-300 ease-in-out ${activeTab === 'home' ? 'bg-white rounded-full text-black p-[0.3rem] border-2 border-green-500 scale-[180%] translate-y-4 cursor-auto' : 'text-white hover:-translate-y-1'}`}
                onClick={() => handleNavigation('/', 'home')}
            />
            <BookOpenIcon
                className={`size-7 cursor-pointer transition duration-300 ease-in-out ${activeTab === 'about' ? 'bg-white rounded-full text-black p-[0.3rem] border-2 border-green-500 scale-[180%] translate-y-4 cursor-auto' : 'text-white hover:-translate-y-1'}`}
                onClick={() => handleNavigation('/about', 'about')}
            />
            <PaintBrushIcon
                className={`size-7 cursor-pointer transition duration-300 ease-in-out ${activeTab === 'artworks' ? 'bg-white rounded-full text-black p-[0.3rem] border-2 border-green-500 scale-[180%] translate-y-4 cursor-auto' : 'text-white hover:-translate-y-1'}`}
                onClick={() => handleNavigation('/artworks', 'artworks')}
            />
            <PhoneIcon
                className={`size-7 cursor-pointer transition duration-300 ease-in-out ${activeTab === 'contact' ? 'bg-white rounded-full text-black p-[0.3rem] border-2 border-green-500 scale-[180%] translate-y-4 cursor-auto' : 'text-white hover:-translate-y-1'}`}
                onClick={() => handleNavigation('/contact', 'contact')}
            />
        </div>
    );
}

export default NavbarMain;