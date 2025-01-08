'use client';
import { useState, useEffect, useCallback } from 'react';
import { PlusCircleIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const router = useRouter();

    const [userData, setUserData] = useState({
        id: '', // Include the user ID for updates
        name: '',
        email: '',
        phoneNumber: '',
        address: [], // Initialize as an array
        role: '',
        username: '',
    });
    const [newAddress, setNewAddress] = useState(''); // For adding a new address
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const fetchUserData = useCallback(async () => {
        setLoading(true);
        try {
            if (!userEmail) {
                toast.error('User is not logged in.');
                router.push('/auth');
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile?email=${encodeURIComponent(userEmail)}`);
            const data = await response.json();

            if (response.ok) {
                setUserData({ ...data, id: data._id }); // Include the user ID
            } else {
                toast.error(`Error fetching user data: ${data.message}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Failed to fetch user data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [userEmail, router]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserEmail(user.email);
        } else {
            console.error('No user in localStorage');
            toast.error('User is not logged in.');
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        if (userEmail) {
            fetchUserData();
        }
    }, [userEmail, fetchUserData]);

    const addAddress = () => {
        if (newAddress.trim()) {
            setUserData((prevData) => ({
                ...prevData,
                address: [...prevData.address, newAddress],
            }));
            setNewAddress('');
        }
    };

    const removeAddress = (index) => {
        setUserData((prevData) => ({
            ...prevData,
            address: prevData.address.filter((_, i) => i !== index),
        }));
    };

    const updateProfile = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Profile updated successfully!');
            } else {
                toast.error(`Error updating profile: ${result.message}`);
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Failed to update profile. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen relative overflow-hidden">
            <ToastContainer />
            <Image
                src="/Bg-screen.jpg"
                alt="Background image"
                width={1000}
                height={1000}
                priority
                className="fixed top-0 h-screen w-full z-[-2]"
            />
            <div className="absolute inset-0 bg-[#000000] opacity-70 z-[-1]"></div>
            {loading ? (
                <div className="text-white text-center mt-10">Loading...</div>
            ) : (
                <div className="w-full h-[95%] px-12 pt-28 gap-12 flex items-center justify-between">
                    {/* Profile Section */}
                    <div className="w-1/3 h-[95%] py-5 bg-modal-theme flex items-center flex-col justify-between p-10 gap-8 rounded-md drop-shadow-md shadow-blue-theme shadow-lg bg-black border-2 border-green-500">
                        <div className="flex items-center justify-center flex-col gap-3 w-full">
                            <div className="relative">
                                <div className="bg-black rounded-full flex items-center justify-center border-2 border-blue-theme">
                                    <UserCircleIcon className="size-28 text-white" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="text-white font-extrabold text-lg tracking-wider">{userData.username || 'Name'}</div>
                                <p className="text-white">|</p>
                                <div className="text-neutral-400 font-normal text-sm tracking-wider capitalize">{userData.role || 'Role'}</div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center flex-col gap-3">
                            <div className="w-full flex flex-col justify-center gap-2">
                                <label className="text-white font-bold">Email</label>
                                <input
                                    type="email"
                                    value={userData.email || ''}
                                    className="w-full bg-modal-theme text-white border-[1px] tracking-wider px-3 border-blue-theme rounded-md py-2 text-sm"
                                    disabled
                                />
                            </div>
                            <div className="w-full flex flex-col justify-center gap-2">
                                <label className="text-white font-bold">Name</label>
                                <input
                                    type="text"
                                    value={userData.name || ''}
                                    className="w-full bg-modal-theme text-white border-[1px] tracking-wider px-3 border-blue-theme rounded-md py-2 text-sm"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    {/* Editable Section */}
                    <div className='w-2/3 h-[95%] bg-modal-theme flex flex-col justify-between bg-black border-2 border-green-500 rounded-md drop-shadow-md shadow-blue-theme shadow-lg px-6 py-4'>
                        <div className="gap-8 overflow-hidden overflow-y-auto py-5 mb-5">
                            <div className="w-full flex flex-col items-center gap-7 px-5">
                                <div className="w-full flex flex-col justify-center gap-2">
                                    <label className="text-white font-bold">Name</label>
                                    <input
                                        type="text"
                                        value={userData.name || ''}
                                        onChange={(e) =>
                                            setUserData((prevData) => ({
                                                ...prevData,
                                                name: e.target.value,
                                            }))
                                        }
                                        className="w-full bg-black text-white font-semibold border-[1px] tracking-wider px-3 border-blue-theme rounded-md py-2 text-sm"
                                    />
                                </div>
                                <div className="w-full flex flex-col justify-center gap-2">
                                    <label className="text-white font-bold">Phone Number</label>
                                    <input
                                        type="text"
                                        value={userData.phoneNumber || ''}
                                        onChange={(e) =>
                                            setUserData((prevData) => ({
                                                ...prevData,
                                                phoneNumber: e.target.value,
                                            }))
                                        }
                                        className="w-full bg-black text-white font-semibold border-[1px] tracking-wider px-3 border-blue-theme rounded-md py-2 text-sm"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="text-white font-bold">Addresses</label>
                                    {userData.address.length > 0 && (
                                        <ul className="w-full flex flex-col gap-2">
                                            {userData.address.map((addr, index) => (
                                                <li key={index} className="flex justify-between items-center bg-black text-white px-3 py-2 rounded-md">
                                                    <span>{addr}</span>
                                                    <button onClick={() => removeAddress(index)} className="text-red-500">Remove</button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="flex gap-2 mt-2">
                                        <textarea
                                            value={newAddress}
                                            onChange={(e) => setNewAddress(e.target.value)}
                                            className="w-full bg-black text-white border px-3 py-2 rounded-md"
                                        />
                                        <button
                                            onClick={addAddress}
                                            className="bg-green-600 px-4 py-2 text-white rounded-md"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={updateProfile}
                            className="w-full bg-green-500 border-blue-theme border-[1px] text-black font-semibold py-2 rounded-md transition duration-200 ease-in-out hover:bg-gray-700"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;