import { LockClosedIcon, PaintBrushIcon } from '@heroicons/react/24/solid'
import React from 'react'

const LeftSection = () => {
  return (
    <div className='w-1/2 h-full flex flex-col justify-center items-center gap-12 pt-10 text-white'>
      <div className='w-full flex flex-col justify-center items-center gap-6 text-white'>
        <p className='font-carter text-7xl font-bold tracking-wide drop-shadow-text'>ART CORE</p>
        <p className='font-jim text-4xl font-medium text-center tracking-wide'>&quot;Curating Beauty, one Brushstroke at a Time&quot;</p>
      </div>
      <div className='w-full flex items-center justify-center gap-16'>
        <button className='flex items-center justify-center gap-3 border-2 border-green-500 bg-black drop-shadow-3xl shadow-green-400 rounded-full px-7 py-3 font-bold transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-4xl'>
          <LockClosedIcon className='h-6 w-6' />
          Login/Signup
        </button>
        <button className='flex items-center justify-center gap-3 border-2 border-green-500 bg-black drop-shadow-3xl shadow-green-400 rounded-full px-7 py-3 font-bold transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-4xl'>
          <PaintBrushIcon className='h-6 w-6' />
          Explore Artworks
        </button>
      </div>
    </div>
  )
}

export default LeftSection