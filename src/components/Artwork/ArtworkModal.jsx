'use client'
import { CurrencyRupeeIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const ArtworkModal = ({ artwork, closeModal }) => {
    const ref = useRef();

    useEffect(() => {
        if (!artwork) {
            return null
        };

        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                closeModal();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    })

    return (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition ease-in-out duration-200'>
            <div ref={ref} className='relative transition ease-in-out duration-200 bg-black text-white border-2 border-green-500 shadow-md drop-shadow-3xl shadow-green-400 rounded-lg h-[25rem] w-[60%] mt-20 flex items-center justify-center'>
                <XMarkIcon className='absolute top-4 right-4 w-8 h-8 cursor-pointer text-green-500 font-bold transition ease-in-out duration-200 hover:scale-110' onClick={closeModal} />
                <div className='w-full h-full p-5'>
                    <Image
                        src={artwork.img}
                        alt={artwork.title}
                        width={2000}
                        height={2000}
                        className='w-full h-full object-cover rounded-md'
                    />
                </div>
                <div className='w-full h-full p-5 pt-10 flex items-center flex-col justify-between'>
                    <div className='w-full h-full'>
                        <h2 className='text-2xl font-extrabold mb-4 text-green-500'>{artwork.title}</h2>
                        <div className='flex items-center justify-between pr-10 font-bold text-gray-500'>
                            <p >{artwork.type}</p>
                            <p>{artwork.price}</p>
                        </div>
                    </div>
                    <div className='w-full h-[32rem] mb-5 overflow-hidden overflow-y-auto flex items-start justify-center pr-3'>
                        {artwork.description}
                    </div>
                    <div className='w-full h-full flex flex-col items-center justify-center gap-3'>
                        <button className='w-full flex items-center justify-center gap-3 border-2 border-green-500 bg-black rounded-md py-2 font-bold transition duration-300 ease-in-out hover:bg-green-900'>
                            <ShoppingCartIcon className='w-6 h-6' />
                            Add to Cart
                        </button>
                        <button className='w-full flex items-center justify-center gap-3 border-2 border-green-500 bg-black rounded-md py-2 font-bold transition duration-300 ease-in-out hover:bg-green-900'>
                            <CurrencyRupeeIcon className='w-6 h-6' />
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkModal