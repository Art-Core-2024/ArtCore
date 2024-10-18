import About from '@/components/About/About'
import FeaturedArtworks from '@/components/FeaturedArtworks/FeaturedArtworks'
import Landing from '@/components/Landing/Landing'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full'>
      <Landing />
      <About />
      <FeaturedArtworks />
    </div>
  )
}

export default Home