import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'

const Card = ({ img, alt, title, type, price }) => {
    return (
        <div className='text-white border-2 border-green-400 rounded-md flex items-center justify-center flex-col w-[16rem] h-[24.2rem] pb-2 transition duration-200 ease-in-out cursor-pointer hover:scale-105'>
            <div className='w-full h-[70%] p-2 bg-black rounded-md'>
                <Image
                    src={img}
                    alt={alt}
                    width={2000}
                    height={2000}
                    className='w-full h-full object-cover rounded-md'
                />
            </div>
            <div className='h-[30%] bg-black backdrop-blur-lg w-full flex flex-col justify-center gap-3 px-3'>
                <div>
                    <div className='text-xl font-bold tracking-wide text-white'>{title}</div>
                    <div className='flex items-center justify-between'>
                        <div>{type}</div>
                        <div>{price}</div>
                    </div>
                </div>
                <button className='flex items-center justify-center gap-3 border-2 border-green-500 bg-black rounded-md py-2 font-bold transition duration-300 ease-in-out hover:bg-green-900'>
                    <ShoppingCartIcon className='w-6 h-6' /> 
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default Card