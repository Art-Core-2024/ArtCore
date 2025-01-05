'use client';
import React, { useState } from 'react';
import SidePanel from '@/components/Admin/SidePanel';
import AdminContent from '@/components/Admin/AdminContent';
import Image from 'next/image';

const Admin = () => {
    const [activePanel, setActivePanel] = useState('artworks');

    return (
        <div className='h-screen w-full text-white flex items-center justify-between'>
            <Image
                src="/Bg-screen.jpg"
                alt="Background image"
                width={1000}
                height={1000}
                priority
                className='fixed top-0 h-screen w-full z-[-2]'
            />
            <div className='absolute inset-0 bg-[#000000] opacity-70 z-[-1]'></div>
            <SidePanel activePanel={activePanel} setActivePanel={setActivePanel} />
            <AdminContent activePanel={activePanel} />
        </div>
    );
};

export default Admin;