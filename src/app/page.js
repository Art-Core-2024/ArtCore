import About from '@/components/About/About'
import FeaturedArtworks from '@/components/FeaturedArtworks/FeaturedArtworks'
import Landing from '@/components/Landing/Landing'
import TopMovingArrow from '@/components/Others/TopMovingArrow'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full'>
      <Landing />
      <About />
      <FeaturedArtworks />
      <TopMovingArrow />
    </div>
  )
}

export default Home