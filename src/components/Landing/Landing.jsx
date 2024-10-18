import React from 'react'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import Image from 'next/image'

const Landing = () => {
    return (
        <div className='w-full h-screen flex items-center justify-between relative'>
            <Image
                src="/Bg-screen.jpg" 
                alt="Background image"
                layout="fill"
                priority
            />
            <div className='absolute inset-0 bg-[#000000] opacity-60'></div>
            <div className='w-full h-full flex items-center justify-between relative'>
                <LeftSection />
                <RightSection />
            </div>
        </div>
    )
}

export default Landing