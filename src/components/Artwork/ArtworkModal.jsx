'use client';
import { CurrencyRupeeIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArtworkModal = ({ artwork, closeModal }) => {
    const ref = useRef();
    const [addresses, setAddresses] = useState([]);
    const [userData, setUserData] = useState({});
    const [selectedAddress, setSelectedAddress] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [quantity, setQuantity] = useState(1);

    // Fetch user data and addresses
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (!storedUser?.email) {
                    toast.error('User is not logged in');
                    return;
                }

                const response = await axios.get(`/api/profile?email=${encodeURIComponent(storedUser.email)}`);
                if (response.status === 200) {
                    setUserData(response.data);
                    setAddresses(response.data.address || []);
                } else {
                    toast.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, []);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                closeModal();
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [closeModal]);

    // Load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleBuyNow = async () => {
        if (!selectedAddress && !newAddress.trim()) {
            toast.error('Please select or add an address');
            return;
        }

        const isRazorpayLoaded = await loadRazorpayScript();
        if (!isRazorpayLoaded) {
            toast.error('Failed to load Razorpay. Please try again.');
            return;
        }

        try {
            const amountInPaise = quantity * artwork.price * 100; // Calculate amount in paise

            // Create Razorpay order
            const { data: paymentOrder } = await axios.post('/api/orders/create', {
                artworkId: artwork._id,
                quantity,
                email: userData.email,
                address: selectedAddress || newAddress.trim(),
                amount: amountInPaise,
            });

            const options = {
                key: paymentOrder.key,
                amount: paymentOrder.amount,
                currency: 'INR',
                name: 'Art Core',
                description: artwork.name,
                order_id: paymentOrder.orderId,
                handler: async (response) => {
                    await axios.post('/api/orders/save', {
                        paymentId: response.razorpay_payment_id,
                        address: selectedAddress || newAddress.trim(),
                        artworkId: artwork._id,
                        quantity,
                        email: userData.email,
                        status: 'paid',
                        amount: amountInPaise / 100,
                    });

                    toast.success('Payment successful!');
                    closeModal();
                },
                prefill: {
                    email: userData.email,
                    contact: userData.phoneNumber || '1234567890',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error('Payment failed:', error);
            toast.error('Payment failed. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition ease-in-out duration-200">
            <ToastContainer />
            <div
                ref={ref}
                className="relative transition ease-in-out duration-200 bg-black text-white border-2 border-green-500 shadow-md drop-shadow-3xl shadow-green-400 rounded-lg h-[25rem] w-[60%] mt-20 flex items-center justify-center"
            >
                <XMarkIcon
                    className="absolute top-4 right-4 w-8 h-8 cursor-pointer text-green-500 font-bold transition ease-in-out duration-200 hover:scale-110"
                    onClick={closeModal}
                />
                <div className="w-full h-full p-5">
                    <Image
                        src={artwork.image}
                        alt={artwork.name}
                        width={2000}
                        height={2000}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
                <div className="w-full h-full p-5 pt-10 flex items-center flex-col justify-between">
                    <div className="w-full h-full">
                        <h2 className="text-2xl font-extrabold mb-4 text-green-500">{artwork.name}</h2>
                        <div className="flex items-center justify-between pr-10 font-bold text-gray-500">
                            <p>{artwork.type}</p>
                            <p>{artwork.price}</p>
                        </div>
                    </div>
                    <div className="w-full h-[32rem] mb-5 overflow-hidden overflow-y-auto flex items-start justify-start pr-3">
                        {artwork.description}
                    </div>
                    <div className="w-full h-full flex flex-col items-center justify-end gap-3">
                        <select
                            className="w-full p-2 rounded border border-green-500 bg-black text-green-500"
                            value={selectedAddress}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                        >
                            <option value="">Select Address</option>
                            {addresses.map((address, index) => (
                                <option key={index} value={address}>
                                    {address}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Add New Address"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)}
                            className="w-full p-2 rounded border border-green-500 bg-black text-green-500"
                        />
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full p-2 rounded border border-green-500 bg-black text-green-500"
                            placeholder="Enter Quantity"
                        />
                        <input
                            type="text"
                            value={`Total: ₹${quantity * artwork.price}`}
                            readOnly
                            className="w-full p-2 rounded border border-green-500 bg-black text-green-500"
                        />
                        <button
                            onClick={handleBuyNow}
                            className="w-full flex items-center justify-center gap-3 border-2 border-green-500 bg-black rounded-md py-2 font-bold transition duration-300 ease-in-out hover:bg-green-900"
                        >
                            <CurrencyRupeeIcon className="w-6 h-6" />
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkModal;