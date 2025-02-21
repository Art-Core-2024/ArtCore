import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <div className='w-full pb-32 lg:min-h-screen relative'>
      <Image
        src="/Bg-screen.jpg"
        alt="Background image"
        width={1000}
        height={1000}
        priority
        className='fixed top-0 h-screen w-full z-[-2]'
      />
      <div className='absolute inset-0 bg-[#000000] opacity-20 z-[-1]'></div>
      <div className='w-full px-3 lg:px-20 pt-32 lg:pt-28 z-20 pb-5 gap-2'>
        <p className='w-full lg:w-auto font-carter tracking-wider text-2xl lg:text-4xl drop-shadow-text text-black'>
          POLICIES
        </p>
        <hr className='border-none h-[2px] bg-black w-full' />
      </div>
      <div className=' px-3 lg:px-20 w-full h-full flex items-center justify-center flex-col gap-5'>
        <div className='rounded-full border-2 border-green-500 w-full py-2 text-white font-bold px-5 text-lg flex items-center justify-between bg-black'>
          Return and Refund Policy
          <Link href='https://www.freeprivacypolicy.com/live/60302485-04c9-4815-9bcd-18fde21970dd' target='_blank'>
            <ArrowRightCircleIcon className='size-10 text-green-500 transition duration-200 ease-in-out hover:scale-125' />
          </Link>
        </div>
        <div className='rounded-full border-2 border-green-500 w-full py-2 text-white font-bold px-5 text-lg flex items-center justify-between bg-black'>
          Privacy Policy
          <Link href='https://www.freeprivacypolicy.com/live/3ee16d22-dfa1-4b0b-9dd6-1f5cf63a44eb' target='_blank'>
            <ArrowRightCircleIcon className='size-10 text-green-500 transition duration-200 ease-in-out hover:scale-125' />
          </Link>
        </div>
        <div className='rounded-full border-2 border-green-500 w-full py-2 text-white font-bold px-5 text-lg flex items-center justify-between bg-black'>
          Disclaimer Policy
          <Link href='https://www.freeprivacypolicy.com/live/2e74183c-5805-492f-855b-483de1306bb1'>
            <ArrowRightCircleIcon className='size-10 text-green-500 transition duration-200 ease-in-out hover:scale-125' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About;