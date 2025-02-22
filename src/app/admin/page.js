'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SidePanel from '@/components/Admin/SidePanel';
import AdminContent from '@/components/Admin/AdminContent';
import Image from 'next/image';

const Admin = () => {
    const [activePanel, setActivePanel] = useState('artworks');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        // Verify the token
        axios
            .post(`/api/verify-token`, { token })
            .then((response) => {
                const { role } = response.data;
                if (role !== 'admin' && role !== 'super-admin') {
                    router.push('/');
                }
            })
            .catch(() => {
                router.push('/');
            });
    }, [router]);

    return (
        <div className='lg:h-screen w-full text-white flex items-center justify-between'>
            <Image
                src="/Bg-screen.jpg"
                alt="Background image"
                width={1000}
                height={1000}
                priority
                className='fixed top-0 h-screen w-full z-[-2]'
            />
            <div className='absolute inset-0 bg-[#000000] opacity-20 z-[-1]'></div>
            <SidePanel activePanel={activePanel} setActivePanel={setActivePanel} />
            <AdminContent activePanel={activePanel} />
        </div>
    );
};

export default Admin;