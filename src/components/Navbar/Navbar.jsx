import React from 'react'
import NavLogo from './NavLogo'
import NavbarMain from './NavbarMain'
import UserLogin from './UserLogin'

const Navbar = () => {
    return (
        <div className='w-full flex items-center justify-between px-10 fixed top-5'>
            <NavLogo />
            <div className='flex items-center justify-between w-3/5'>
                <NavbarMain />
                <UserLogin />
            </div>
        </div>
    )
}

export default Navbar