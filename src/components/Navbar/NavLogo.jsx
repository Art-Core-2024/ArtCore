import React from 'react'
import Image from 'next/image'

const NavLogo = () => {
    return (
        <Image
            src="/logo.png"
            alt="Logo"
            width={500}
            height={500}
            className='size-20 border-2 border-green-500 shadow-sm shadow-green-400 drop-shadow-3xl transition duration-200 ease-in-out cursor-pointer hover:scale-105 hover:drop-shadow-4xl rounded-full bg-black backdrop-blur-xl'
        />
    )
}

export default NavLogo
