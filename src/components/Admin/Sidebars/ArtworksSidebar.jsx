import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const ArtworksSidebar = ({ artwork, closeSidebar, refreshArtworks }) => {
    const types = ['Lippan Art', 'Wall Hanging', 'Canvas', 'Bookmarks', 'Digital'];
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        type: 'Lippan Art',
        price: '',
        description: '',
        featured: false,
    });

    const dropdownRef = useRef(null);

    useEffect(() => {
        if (artwork) {
            setFormData({
                image: '',
                name: artwork.name,
                type: artwork.type,
                price: artwork.price,
                description: artwork.description,
                featured: artwork.featured,
            });
        }
    }, [artwork]);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleOptionClick = (type) => {
        setFormData((prev) => ({ ...prev, type }));
        setDropdownOpen(false);
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDelete = async () => {
        if (!artwork) return;
        const confirm = window.confirm('Are you sure you want to delete this artwork?');
        if (!confirm) return;

        const response = await fetch(`/api/artworks/${artwork._id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            refreshArtworks();
            closeSidebar();
        } else {
            alert('Failed to delete artwork');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = artwork
            ? `/api/artworks/${artwork._id}`
            : '/api/artworks';
        const method = artwork ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            refreshArtworks();
            closeSidebar();
        }
    };

    return (
        <motion.div
            initial={{ translateX: '100%' }}
            animate={{ translateX: '0%' }}
            exit={{ translateX: '100%' }}
            className='fixed top-0 right-0 w-1/3 h-full border-l-2 border-green-500 bg-black p-5 shadow-lg z-50 overflow-hidden overflow-y-auto'
        >
            <div className='w-full flex items-center justify-center flex-col mb-5'>
                <h2 className='text-2xl font-bold'>
                    {artwork ? 'Edit Artwork' : 'Add Artwork'}
                </h2>
                <hr className='w-full border-none bg-white h-[1px] my-2' />
            </div>
            <form onSubmit={handleSubmit} className='text-white flex flex-col gap-5'>
                {!artwork && (
                    <div className='flex flex-col gap-2 w-full'>
                        <label>Image</label>
                        <input
                            type='file'
                            name='image'
                            accept='image/*'
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            image: reader.result,
                                        }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>
                )}
                <div className='w-full flex flex-col gap-2'>
                    <label>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className='text-white bg-black border-2 border-green-500 rounded-md py-1 px-2'
                    />
                </div>
                <div className='w-full flex flex-col gap-2 relative' ref={dropdownRef}>
                    <label>Type</label>
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="flex items-center justify-between px-4 py-2 border-2 rounded-md border-green-500 bg-black text-white font-medium"
                    >
                        <span>{formData.type}</span>
                        <ChevronDownIcon
                            className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen ? '-rotate-180' : 'rotate-0'}`}
                        />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute top-full mt-1 mx-auto w-full border border-green-500 bg-black shadow-lg z-10">
                            {types.map((type) => (
                                <div
                                    key={type}
                                    onClick={() => handleOptionClick(type)}
                                    className={`px-4 py-2 text-sm font-medium cursor-pointer transition duration-150 hover:bg-green-500 hover:text-black ${formData.type === type
                                        ? 'bg-green-500 text-black'
                                        : 'text-white'
                                        }`}
                                >
                                    {type}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label>Price (INR)</label>
                    <input
                        type='number'
                        name='price'
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className='text-white bg-black border-2 border-green-500 rounded-md py-1 px-2'
                    />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label>Description</label>
                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className='text-white bg-black border-2 border-green-500 rounded-md py-1 px-2'
                    />
                </div>
                <div className='w-full flex gap-2 items-center justify-center text-base'>
                    <input
                        type='checkbox'
                        name='featured'
                        checked={formData.featured}
                        onChange={handleInputChange}
                    />
                    Add to Featured
                </div>
                <button type='submit' className='bg-green-500 text-black p-2 rounded-md font-bold'>
                    {artwork ? 'Save Changes' : 'Add Artwork'}
                </button>
                {artwork && (
                    <button
                        onClick={handleDelete}
                        className='bg-red-500 text-white p-2 rounded'
                    >
                        Delete Artwork
                    </button>
                )}
            </form>
            <button onClick={closeSidebar} className='text-red-500 mt-4 w-full flex items-center justify-center'>
                Cancel
            </button>
        </motion.div>
    );
};

export default ArtworksSidebar;