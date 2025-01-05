import React from 'react'
import LeftSection from './LeftSection'
import RightSection from './RightSection'
import Image from 'next/image'

const Landing = () => {
    return (
        <div className='w-full h-screen relative flex items-center justify-between overflow-hidden'>
            <div className='relative z-[1] w-full h-full flex items-center justify-between'>
                <LeftSection />
                <RightSection />
            </div>
        </div>
    )
}

export default Landing