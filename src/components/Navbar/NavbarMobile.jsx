'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { BookOpenIcon, HomeIcon, PaintBrushIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';

const NavbarMobile = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('');

    const handleNavigation = useCallback((path, tab) => {
        setActiveTab(tab);
        router.push(path);
    }, [router]);

    const tabMapping = useMemo(() => ({
        '/': 'home',
        '/artworks': 'artworks',
        '/policies': 'policies',
        '/contact': 'contact',
    }), []);

    useEffect(() => {
        const activeTab = Object.keys(tabMapping)
            .sort((a, b) => b.length - a.length)
            .find(path => pathname.startsWith(path)) || '';
        setActiveTab(tabMapping[activeTab]);
    }, [pathname, tabMapping]);

    const NavItem = ({ icon: Icon, tabName, path }) => (
        <Icon
            className={`size-7 cursor-pointer transition duration-300 ease-in-out ${
                activeTab === tabName
                    ? 'bg-white rounded-full text-black p-[0.3rem] border-2 border-green-500 transition duration-300 ease-in-out scale-[180%] -translate-y-6 cursor-auto'
                    : 'text-white hover:-translate-y-1'
            }`}
            onClick={() => handleNavigation(path, tabName)}
        />
    );

    return (
        <div className="border-t-2 border-green-500 z-50 w-full py-4 bg-black fixed bottom-0 lg:hidden flex items-center justify-around">
            <NavItem icon={HomeIcon} tabName="home" path="/" />
            <NavItem icon={BookOpenIcon} tabName="policies" path="/policies" />
            <NavItem icon={PaintBrushIcon} tabName="artworks" path="/artworks" />
            <NavItem icon={PhoneIcon} tabName="contact" path="/contact" />
        </div>
    );
};

export default NavbarMobile;