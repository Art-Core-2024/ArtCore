import { CurrencyRupeeIcon, PencilIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';

const Card = ({ img, alt, title, type, price, isAdmin, onEdit, onClick }) => {
    return (
        <div
            className='relative text-white border-2 border-green-400 rounded-md flex items-center justify-center flex-col w-[16rem] h-[24.2rem] pb-2 transition duration-200 ease-in-out cursor-pointer hover:scale-105'
            onClick={onClick}
        >
            {isAdmin && (
                <div
                    className='absolute -top-4 -right-4 p-2 border-2 border-green-500 bg-black rounded-full'
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent modal from opening when edit is clicked
                        onEdit();
                    }}
                >
                    <PencilIcon
                        className='size-6 text-green-500 cursor-pointer'
                    />
                </div>
            )}
            <div className='w-full h-[70%] p-2 bg-black rounded-md'>
                <Image
                    src={img}
                    alt={alt || 'Artwork Image'}
                    width={2000}
                    height={2000}
                    className='w-full h-full object-cover rounded-md'
                    priority
                />
            </div>
            <div className='h-[40%] bg-black backdrop-blur-lg w-full flex flex-col justify-center gap-3 px-3'>
                <div>
                    <div className='text-[0.8rem] font-extrabold tracking-wide text-white'>{title}</div>
                    <div className='text-[0.75rem] flex items-center justify-between'>
                        <div>{type}</div>
                        <div>{price}</div>
                    </div>
                </div>
                <button className='flex items-center justify-center gap-3 border-2 border-green-500 bg-black rounded-md py-2 font-bold transition duration-300 ease-in-out hover:bg-green-900'>
                    <CurrencyRupeeIcon className='w-6 h-6' />
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default Card;