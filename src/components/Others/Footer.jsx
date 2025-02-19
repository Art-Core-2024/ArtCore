import Image from 'next/image';
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-black/80 backdrop-blur-md px-20 py-10 flex items-center justify-center flex-col gap-4'>
        <div className='w-full flex justify-between items-start pb-8'>
            <div className='flex items-center gap-4 text-white font-semibold text-2xl font-carter tracking-wider'>
                <Image
                    src='/Logo.png'
                    alt='Logo'
                    width={100}
                    height={100}
                    className='size-14 rounded-full'
                />
                ART CORE
            </div>
            <div className='text-white font-inter flex flex-col items-start justify-center gap-1'>
                <p className='transition ease-in-out duration-150 cursor-pointer hover:text-gray-400'>Home</p>
                <p className='transition ease-in-out duration-150 cursor-pointer hover:text-gray-400'>Our Artworks</p>
                <p className='transition ease-in-out duration-150 cursor-pointer hover:text-gray-400'>Contact Us</p>
            </div>
            <div className='text-white font-inter flex flex-col items-start justify-center gap-1'>
                <a className='transition ease-in-out duration-150 cursor-pointer hover:text-gray-400' href='https://www.freeprivacypolicy.com/live/60302485-04c9-4815-9bcd-18fde21970dd'>Return and Refund Policy</a>
                <a className='transition ease-in-out duration-150 cursor-pointer hover:text-gray-400' href='https://www.freeprivacypolicy.com/live/3ee16d22-dfa1-4b0b-9dd6-1f5cf63a44eb'>Privacy Policy</a>
                <a className='transition ease-in-out duration-150 cursor-pointer hover:text-gray-400' href='https://www.freeprivacypolicy.com/live/2e74183c-5805-492f-855b-483de1306bb1'>Disclaimer Policy</a>
            </div>
        </div>
        <hr className='w-[40%] h-[1px] border-none bg-white' />
        <p className='text-gray-400 font-inter font-semibold text-sm'>Copyright &copy; 2025 - Art Core | All Rights Reserved</p>
    </div>
  )
}

export default Footer;