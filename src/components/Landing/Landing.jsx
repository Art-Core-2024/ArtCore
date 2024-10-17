import React from 'react'
import LeftSection from './LeftSection'
import RightSection from './RightSection'

const Landing = () => {
    return (
        <div className='w-full h-screen flex items-center justify-between bg-bg bg-cover bg-center bg-no-repeat relative'>
            <div className='absolute inset-0 bg-[#000000] opacity-70'></div>
            <div className='w-full h-full flex items-center justify-between relative'>
                <LeftSection />
                <RightSection />
            </div>
        </div>
    )
}

export default Landing