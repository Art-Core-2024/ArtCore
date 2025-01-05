'use client';
import React, { useState, useEffect } from 'react';
import NavLogo from './NavLogo';
import NavbarMain from './NavbarMain';
import UserLogin from './UserLogin';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const shouldHideNavbar = pathname === '/admin';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    if (shouldHideNavbar) {
        return null;
    }

    return (
        <motion.div
            initial={{ translateY: -100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className={`w-full flex items-center justify-between px-10 fixed z-50 transition-colors duration-300 ${scrolled ? 'bg-[#0000009b] top-0 backdrop-blur-md pt-5 pb-2' : 'bg-transparent top-5'}`}
        >
            <NavLogo />
            <div className='flex items-center justify-between w-3/5'>
                <NavbarMain />
                <UserLogin />
            </div>
        </motion.div>
    )
}

export default Navbar