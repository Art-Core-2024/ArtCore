import Image from 'next/image';
import React from 'react';
import ArtworksPage from '@/components/ArtworksPage/ArtworksPage';

const Artworks = () => {
  return (
    <div className='w-full min-h-screen relative text-white'>
      <Image
        src="/Bg-screen.jpg"
        alt="Background image"
        width={1000}
        height={1000}
        priority
        className='fixed top-0 h-screen w-full z-[-2]'
      />
      <div className='absolute inset-0 bg-[#000000] opacity-70 z-[-1]'></div>
      <ArtworksPage />
    </div>
  )
}

export default Artworks