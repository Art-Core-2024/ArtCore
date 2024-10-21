import React from 'react';

const ArtworkModal = ({ artwork, closeModal }) => {
    if (!artwork) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[99]'>
            <div className='bg-white text-black rounded-lg p-6 w-[90%] max-w-md'>
                <h2 className='text-2xl font-bold mb-4'>{artwork.title}</h2>
                <p>{artwork.type}</p>
                <p>{artwork.price}</p>
                <button 
                    className='mt-4 px-4 py-2 bg-red-500 text-white rounded'
                    onClick={closeModal}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ArtworkModal