'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const ArtworksFilterTabs = ({ onTabChange }) => {
    const tabs = ['ALL', 'LIPPAN ART', 'WALL HANGING', 'CANVAS', 'BOOKMARKS', 'DIGITAL'];
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('ALL');
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleOptionClick = (tab) => {
        setSelectedTab(tab);
        setDropdownOpen(false);
        onTabChange(tab);
    };

    const handleClickOutside = useCallback(
        (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        },
        [dropdownRef]
    );

    useEffect(() => {
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen, handleClickOutside]);

    return (
        <div className="relative w-full lg:w-auto" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full lg:w-auto gap-16 px-4 py-2 mb-2 border-2 rounded-md border-green-500 bg-black text-white font-medium"
            >
                <span>{selectedTab}</span>
                <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen ? '-rotate-180' : 'rotate-0'
                        }`}
                />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="absolute top-full mt-1 mx-auto w-full border border-green-500 bg-black shadow-lg z-10">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => handleOptionClick(tab)}
                            className={`px-4 py-2 text-sm font-medium cursor-pointer transition duration-150 hover:bg-green-500 hover:text-black ${selectedTab === tab
                                    ? 'bg-green-500 text-black'
                                    : 'text-white'
                                }`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArtworksFilterTabs;