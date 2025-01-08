import React from 'react'
import Image from 'next/image'

const NavLogo = () => {
    return (
        <Image
            src="/logo.png"
            alt="Logo"
            width={500}
            height={500}
            className='size-20 border-2 border-green-500 shadow-md shadow-green-400 drop-shadow-2xl transition duration-200 ease-in-out cursor-pointer hover:scale-105 rounded-full bg-black backdrop-blur-xl'
            priority
        />
    )
}

export default NavLogo
