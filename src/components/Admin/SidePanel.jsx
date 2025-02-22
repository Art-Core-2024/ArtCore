'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/solid';

const SidePanel = ({ activePanel, setActivePanel }) => {
    const router = useRouter();
    const [openPanel, setOpenPanel] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
        window.location.reload();
    };

    return (
        <>
            <div className='hidden sticky left-0 top-0 bottom-0 h-full bg-black/60 backdrop-blur-sm w-96 lg:flex flex-col items-center justify-between p-5'>
                <div className='w-full flex flex-col items-center text-xl font-bold'>
                    Admin
                    <hr className='border-none h-[1px] bg-white w-full my-2' />
                </div>
                <div className='w-full flex flex-col gap-3'>
                    <div
                        onClick={() => setActivePanel('artworks')}
                        className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${activePanel === 'artworks' ? 'bg-neutral-500' : ''
                            }`}
                    >
                        Manage Artworks
                    </div>
                    <div
                        onClick={() => setActivePanel('admins')}
                        className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${activePanel === 'admins' ? 'bg-neutral-500' : ''
                            }`}
                    >
                        Manage Admins
                    </div>
                    <div
                        onClick={() => setActivePanel('orders')}
                        className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${activePanel === 'orders' ? 'bg-neutral-500' : ''
                            }`}
                    >
                        Manage Orders
                    </div>
                    <div
                        onClick={() => setActivePanel('users')}
                        className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${activePanel === 'users' ? 'bg-neutral-500' : ''
                            }`}
                    >
                        View Users
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className='w-full py-2 border-2 border-red-500 transition duration-200 rounded-md hover:bg-red-500 font-bold'
                >
                    Signout
                </button>
            </div>
            <div className='bg-black lg:hidden flex rounded-full border-green-500 border-2 p-2 fixed top-4 left-4 z-10'>
                <Bars3Icon className='size-6' onClick={() => setOpenPanel(!openPanel)} />
            </div>
            <div className={`inset-0 bg-black opacity-80 z-[10] ${openPanel ? 'absolute' : 'hidden'}`}></div>
            <div className={`lg:hidden fixed top-0 left-0 h-[91%] bg-black backdrop-blur-sm flex z-[30] flex-col items-center w-4/5 justify-between p-5 transition duration-150 ease-in-out ${openPanel ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='w-full flex relative flex-col items-center text-xl font-bold'>
                    <div className='flex items-center justify-between w-full'>
                        Admin
                        <div className='bg-black border-2 border-red-600 rounded-full'>
                            <XCircleIcon className='size-8 text-red-600' onClick={() => setOpenPanel(!openPanel)} />
                        </div>
                    </div>
                    <hr className='border-none h-[1px] bg-white w-full my-2' />
                </div>
                <div className='w-full flex flex-col gap-3'>
                    <div
                        onClick={() => setActivePanel('artworks')}
                        className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${activePanel === 'artworks' ? 'bg-neutral-500' : ''
                            }`}
                    >
                        Manage Artworks
                    </div>
                    <div
                        onClick={() => setActivePanel('admins')}
                        className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${activePanel === 'admins' ? 'bg-neutral-500' : ''
                            }`}
                    >
                        Manage Admins
                    </div>
                    <div
                        onClick={() => setActivePanel('orders')}
                        className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${activePanel === 'orders' ? 'bg-neutral-500' : ''
                            }`}
                    >
                        Manage Orders
                    </div>
                    <div
                        onClick={() => setActivePanel('users')}
                        className={`w-full text-base py-2 border-2 border-neutral-500 rounded-md font-semibold transition hover:bg-neutral-500 cursor-pointer flex items-center justify-center ${activePanel === 'users' ? 'bg-neutral-500' : ''
                            }`}
                    >
                        View Users
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className='w-full py-2 border-2 border-red-500 transition duration-200 rounded-md hover:bg-red-500 font-bold'
                >
                    Signout
                </button>
            </div>
        </>
    );
};

export default SidePanel;