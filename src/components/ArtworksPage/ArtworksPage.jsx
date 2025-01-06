'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Card from '../Artwork/Card';
import ArtworkModal from '../Artwork/ArtworkModal';
import ArtworksFilterTabs from './ArtworksFilterTabs';

const ArtworksPage = () => {
    const [artworks, setArtworks] = useState([]);
    const [filteredArtworks, setFilteredArtworks] = useState([]);
    const [selectedTab, setSelectedTab] = useState('ALL');
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    // Fetch artworks from API
    useEffect(() => {
        const fetchArtworks = async () => {
            const response = await fetch('/api/artworks');
            const data = await response.json();
            setArtworks(data);
            setFilteredArtworks(data);
        };
        fetchArtworks();
    }, []);

    // Filter artworks based on the selected tab
    useEffect(() => {
        if (selectedTab === 'ALL') {
            setFilteredArtworks(artworks);
        } else {
            const filtered = artworks.filter(
                (artwork) => artwork.type.toUpperCase() === selectedTab
            );
            setFilteredArtworks(filtered);
        }
    }, [selectedTab, artworks]);

    // Open/close modal
    const openModal = (artwork) => {
        setSelectedArtwork(artwork);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedArtwork(null);
        setModalOpen(false);
    };

    // Callback to update selected tab from ArtworksFilterTabs
    const handleTabChange = useCallback((tab) => {
        setSelectedTab(tab);
    }, []);

    return (
        <motion.div
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.35 }}
            className='z-[1] flex flex-col items-start justify-center italic gap-3 w-full px-12'
        >
            <div className='w-full pt-[6.4rem] z-20 pb-5'>
                <div className='flex items-center justify-between w-full'>
                    <p className='font-carter tracking-wider text-4xl drop-shadow-text'>
                        MY ARTWORKS
                    </p>
                    <ArtworksFilterTabs onTabChange={handleTabChange} />
                </div>
                <hr className='border-none h-[1px] bg-white w-full' />
            </div>
            <div className='w-full h-[22rem] overflow-hidden overflow-y-auto flex gap-6 flex-wrap items-center justify-between px-5 pb-5'>
                {filteredArtworks.map((artwork) => (
                    <Card
                        key={artwork._id}
                        img={artwork.image}
                        alt={artwork.name}
                        title={artwork.name}
                        type={artwork.type}
                        price={`₹${artwork.price}`}
                        onClick={() => openModal(artwork)}
                    />
                ))}
            </div>

            {isModalOpen && selectedArtwork && (
                <ArtworkModal artwork={selectedArtwork} closeModal={closeModal} />
            )}
        </motion.div>
    );
};

export default ArtworksPage;