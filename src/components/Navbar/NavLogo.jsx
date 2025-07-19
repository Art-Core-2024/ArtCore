import React from 'react'
import Image from 'next/image'

const NavLogo = () => {
    return (
        <Image
            src="/logo.jpg"
            alt="Logo"
            width={500}
            height={500}
            className='size-20 border-2 border-green-500 transition duration-200 ease-in-out cursor-pointer hover:scale-105 rounded-full bg-black backdrop-blur-xl'
            priority
        />
    )
}

export default NavLogo
