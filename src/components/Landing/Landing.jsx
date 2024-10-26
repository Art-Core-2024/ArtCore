import React from 'react'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import Image from 'next/image'

const Landing = () => {
    return (
        <div className='w-full h-screen relative flex items-center justify-between overflow-hidden'>
            <Image
                src="/Bg-screen.jpg"
                alt="Background image"
                layout="fill"
                objectFit="cover"
                objectPosition='center'
                priority
            />
            <div className='absolute inset-0 bg-[#000000] opacity-70'></div>
            <div className='relative z-[1] w-full h-full flex items-center justify-between'>
                <LeftSection />
                <RightSection />
            </div>
        </div>
    )
}

export default Landing