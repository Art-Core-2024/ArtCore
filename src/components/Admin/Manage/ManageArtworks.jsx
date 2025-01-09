'use client';
import React, { useState, useEffect } from 'react';
import Card from '@/components/Artwork/Card';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import ArtworksSidebar from '../Sidebars/ArtworksSidebar';
import ArtworkModal from '@/components/Artwork/ArtworkModal';

const ManageArtworks = () => {
    const [artworks, setArtworks] = useState([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [currentArtwork, setCurrentArtwork] = useState(null);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchArtworks = async () => {
            const response = await fetch(`/api/artworks`);
            const data = await response.json();
            setArtworks(data);
        };
        fetchArtworks();
    }, []);

    const openSidebar = (artwork = null) => {
        setCurrentArtwork(artwork);
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setCurrentArtwork(null);
        setSidebarOpen(false);
    };

    // Close Sidebar on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.classList.contains('absolute')) {
                closeSidebar();
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const openModal = (artwork) => {
        setSelectedArtwork(artwork);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedArtwork(null);
        setModalOpen(false);
    };

    return (
        <div className='w-full h-full overflow-hidden'>
            <div className='flex items-center justify-center flex-col w-full'>
                <div className='flex items-center justify-between w-full pb-5'>
                    <p className='text-2xl font-bold'>Manage Artworks</p>
                    <button
                        className='bg-black border-2 border-green-500 rounded-full px-3 pr-5 py-1 flex items-center justify-center gap-4'
                        onClick={() => openSidebar()}
                    >
                        <PlusCircleIcon className='size-8 text-green-500' />
                        <p className='font-bold text-lg'>Add Artwork</p>
                    </button>
                </div>
                <hr className='w-full h-[1px] border-none bg-white mb-5' />
            </div>
            <div className='w-full h-[25.5rem] pb-4 flex gap-6 flex-wrap items-center justify-center pt-7 px-3 overflow-hidden overflow-y-auto'>
                {artworks.map((artwork) => (
                    <Card
                        key={artwork._id}
                        img={artwork.image}
                        alt={artwork.name}
                        title={artwork.name}
                        type={artwork.type}
                        price={`₹${artwork.price}`}
                        isAdmin={true}
                        onEdit={() => openSidebar(artwork)}
                        onClick={() => openModal(artwork)}
                    />
                ))}
            </div>

            {isSidebarOpen && (
                <div className='absolute inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center'>
                    <ArtworksSidebar
                        artwork={currentArtwork}
                        closeSidebar={closeSidebar}
                        refreshArtworks={() => {
                            // Refresh artworks after adding or editing
                            setArtworks([...artworks]);
                        }}
                    />
                </div>
            )}

            {isModalOpen && selectedArtwork && (
                <ArtworkModal artwork={selectedArtwork} closeModal={closeModal} />
            )}
        </div>
    );
};

export default ManageArtworks;