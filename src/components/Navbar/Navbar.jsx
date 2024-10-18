'use client'
import React from 'react'
import NavLogo from './NavLogo'
import NavbarMain from './NavbarMain'
import UserLogin from './UserLogin'
import { motion } from 'framer-motion'

const Navbar = () => {
    return (
        <motion.div
            initial={{ translateY: -100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className='w-full flex items-center justify-between px-10 fixed top-5 z-50'
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