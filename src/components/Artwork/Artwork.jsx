import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import ArtworkModal from './ArtworkModal';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';

const Artwork = () => {
    const [artworks, setArtworks] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await fetch(`/api/artworks`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    const featuredArtworks = data.filter((artwork) => artwork.featured);
                    setArtworks(featuredArtworks);
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchArtworks();
    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
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
                {artworks.map((artwork) => (
                    <div key={artwork._id} onClick={() => handleCardClick(artwork)}>
                        <Card
                            img={artwork.image}
                            alt={artwork.name}
                            title={artwork.name}
                            type={artwork.type}
                            price={`₹${artwork.price}`}
                        />
                    </div>
                ))}
                {isModalOpen && <ArtworkModal artwork={selectedArtwork} closeModal={closeModal} />}
            </div>
        </>
    );
};

export default Artwork;