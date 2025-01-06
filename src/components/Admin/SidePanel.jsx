'use client';
import React from 'react';

const SidePanel = ({ activePanel, setActivePanel }) => {
    return (
        <div className='sticky left-0 top-0 bottom-0 h-full bg-black/60 backdrop-blur-sm w-96 flex flex-col items-center justify-between p-5'>
            <div className='w-full flex flex-col items-center text-xl font-bold'>
                Admin
                <hr className='border-none h-[1px] bg-white w-full my-2' />
            </div>
            <div className='w-full flex flex-col gap-3'>
                <div
                    onClick={() => setActivePanel('artworks')}
                    className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${
                        activePanel === 'artworks' ? 'bg-neutral-500' : ''
                    }`}
                >
                    Manage Artworks
                </div>
                <div
                    onClick={() => setActivePanel('admins')}
                    className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${
                        activePanel === 'admins' ? 'bg-neutral-500' : ''
                    }`}
                >
                    Manage Admins
                </div>
                <div
                    onClick={() => setActivePanel('orders')}
                    className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${
                        activePanel === 'orders' ? 'bg-neutral-500' : ''
                    }`}
                >
                    Manage Orders
                </div>
                <div
                    onClick={() => setActivePanel('users')}
                    className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${
                        activePanel === 'users' ? 'bg-neutral-500' : ''
                    }`}
                >
                    View Users
                </div>
            </div>
            <button className='w-full py-2 border-2 border-red-500 transition duration-200 rounded-md hover:bg-red-500 font-bold'>
                Signout
            </button>
        </div>
    );
};

export default SidePanel;