'use client';
import React, { useRef, useState } from 'react';
import Card from './Card';
import ArtworksList from './ArtworksList';
import ArtworkModal from './ArtworkModal'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';

const Artwork = () => {
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300,
                behavior: 'smooth',
            });
        }
    };

    const handleCardClick = (artwork) => {
        setSelectedArtwork(artwork);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedArtwork(null);
    };

    return (
        <>
            <div className="absolute left-5 z-10">
                <button onClick={scrollLeft} className="text-white">
                    <ArrowLeftCircleIcon className="w-12 h-12" />
                </button>
            </div>

            <div className="absolute right-5 z-10">
                <button onClick={scrollRight} className="text-white">
                    <ArrowRightCircleIcon className="w-12 h-12" />
                </button>
            </div>

            <div ref={scrollRef} className='overflow-hidden overflow-x-auto scrollbar-hidden flex items-center justify-start gap-8 py-6 px-6'>
                {ArtworksList.map((artwork, index) => (
                    <div key={index} onClick={() => handleCardClick(artwork)}>
                        <Card
                            img={artwork.img}
                            alt={artwork.alt}
                            title={artwork.title}
                            type={artwork.type}
                            price={artwork.price}
                        />
                    </div>
                ))}
                {isModalOpen && <ArtworkModal artwork={selectedArtwork} closeModal={closeModal} />}
            </div>
        </>
    );
};

export default Artwork;