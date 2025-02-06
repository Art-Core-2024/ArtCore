import About from '@/components/About/About'
import FeaturedArtworks from '@/components/FeaturedArtworks/FeaturedArtworks'
import Landing from '@/components/Landing/Landing'
import TopMovingArrow from '@/components/Others/TopMovingArrow'
import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full min-h-screen relative'>
      <Image
        src="/Bg-screen.jpg"
        alt="Background image"
        width={1000}
        height={1000}
        priority
        className='fixed top-0 h-screen w-full z-[-2]'
      />
      <div className='absolute inset-0 bg-[#000000] opacity-20 z-[-1]'></div>
      <Landing />
      <About />
      <FeaturedArtworks />
      <TopMovingArrow />
    </div>
  )
}

export default Home