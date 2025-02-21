'use client';
import Image from 'next/image';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Footer = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('');

    // Define tab mapping similar to NavbarMain
    const tabMapping = useMemo(() => ({
        '/': 'home',
        '/artworks': 'artworks',
        '/contact': 'contact',
        '/policies': 'policies'
    }), []);

    // Update activeTab when pathname changes
    useEffect(() => {
        const active = Object.keys(tabMapping)
            .sort((a, b) => b.length - a.length)
            .find(path => pathname.startsWith(path)) || '';
        setActiveTab(tabMapping[active]);
    }, [pathname, tabMapping]);

    // Navigation handler
    const handleNavigation = useCallback((path, tab) => {
        setActiveTab(tab);
        router.push(path);
    }, [router]);

    // Helper component for Footer Navigation Items
    const FooterNavItem = ({ label, path, tabName }) => (
        <p
            className={`transition ease-in-out duration-150 cursor-pointer ${activeTab === tabName ? 'text-green-700 font-bold' : 'text-white hover:text-gray-400'
                }`}
            onClick={() => handleNavigation(path, tabName)}
        >
            {label}
        </p>
    );

    return (
        <div className='w-full bg-black/80 backdrop-blur-md px-2 lg:px-20 pt-8 pb-24 lg:py-10 flex items-center justify-center flex-col gap-4'>
            <div className='w-full flex justify-between items-center lg:items-start flex-col lg:flex-row pb-8'>
                <div className='flex items-center gap-4 text-white font-semibold text-2xl font-carter tracking-wider'>
                    <Image
                        src='/logo.png'
                        alt='Logo'
                        width={100}
                        height={100}
                        className='size-14 rounded-full'
                    />
                    ART CORE
                </div>
                <div className='w-full lg:w-auto px-6 lg:px-0 py-5 lg:py-0 text-white font-inter flex lg:flex-col items-start justify-between lg:justify-center gap-1'>
                    <FooterNavItem label="Home" path="/" tabName="home" />
                    <FooterNavItem label="Our Artworks" path="/artworks" tabName="artworks" />
                    <FooterNavItem label="Contact Us" path="/contact" tabName="contact" />
                </div>
                <div className='text-white font-inter flex flex-col items-center lg:items-start justify-center gap-1'>
                    <Link className='transition ease-in-out duration-150 cursor-pointer hover:text-gray-400' href='https://www.freeprivacypolicy.com/live/60302485-04c9-4815-9bcd-18fde21970dd'>Return and Refund Policy</Link>
                    <Link className='transition ease-in-out duration-150 cursor-pointer hover:text-gray-400' href='https://www.freeprivacypolicy.com/live/3ee16d22-dfa1-4b0b-9dd6-1f5cf63a44eb'>Privacy Policy</Link>
                    <Link className='transition ease-in-out duration-150 cursor-pointer hover:text-gray-400' href='https://www.freeprivacypolicy.com/live/2e74183c-5805-492f-855b-483de1306bb1'>Disclaimer Policy</Link>
                </div>
            </div>
            <hr className='w-[40%] h-[1px] border-none bg-white' />
            <p className='text-gray-400 font-inter font-semibold text-[0.7rem] lg:text-sm'>Copyright &copy; 2025 - Art Core | All Rights Reserved</p>
        </div>
    );
}

export default Footer;