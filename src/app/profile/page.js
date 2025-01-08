'use client'; // Enables client-side rendering
import { useState, useEffect, useCallback } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const router = useRouter();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        role: '',
        username: ''
    });
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    // Fetch user details from the API based on email
    const fetchUserData = useCallback(async () => {
        setLoading(true);

        try {
            if (!userEmail) {
                toast.error('User is not logged in.');
                router.push('/auth');
                return;
            }

            const response = await fetch(`/api/profile?email=${encodeURIComponent(userEmail)}`);
            const data = await response.json();

            if (response.ok) {
                setUserData(data);
            } else {
                toast.error(`Error fetching user data: ${data.message}`);
            }
        } catch (error) {
            console.error('Fetch error:', error); // Debugging
            toast.error('Failed to fetch user data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [userEmail, router]);

    // Fetch user email from localStorage and load user data
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

    return (
        <div className="w-full h-screen relative overflow-hidden">
            <ToastContainer /> {/* Toast notifications container */}
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
                    <div className="w-1/3 h-[95%] py-5 bg-modal-theme flex items-center flex-col justify-between p-10 gap-8 rounded-md drop-shadow-md shadow-blue-theme shadow-lg bg-black border-2 border-green-500">
                        <div className="flex items-center justify-center flex-col gap-3 w-full">
                            <div className="relative">
                                <div className="bg-black rounded-full flex items-center justify-center border-2 border-blue-theme">
                                    <UserCircleIcon className="size-28 text-white" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="text-white font-extrabold text-lg tracking-wider">{userData.username || 'Name'}</div>
                                <p className='text-white'>|</p>
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

                    <div className="w-2/3 h-[95%] bg-modal-theme flex items-center flex-col justify-between p-10 gap-8 rounded-md drop-shadow-md shadow-blue-theme shadow-lg bg-black border-2 border-green-500">
                        <div className="w-full h-full px-5 pt-16 pb-3 flex flex-col items-start justify-center gap-6 overflow-hidden overflow-y-auto">
                            <div className="w-full">
                                <div className="w-full flex flex-col justify-center gap-2">
                                    <label className="text-white font-bold">Name</label>
                                    <input
                                        type="text"
                                        value={userData.name || ''}
                                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                        className="w-full bg-black text-white font-semibold border-[1px] tracking-wider px-3 border-blue-theme rounded-md py-2 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-col justify-center gap-2">
                                    <label className="text-white font-bold">Phone Number</label>
                                    <input
                                        type="text"
                                        value={userData.phoneNumber || ''}
                                        onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                                        className="w-full bg-black text-white font-semibold border-[1px] tracking-wider px-3 border-blue-theme rounded-md py-2 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-col justify-center gap-2">
                                    <label className="text-white font-bold">Address</label>
                                    <textarea
                                        value={userData.address || ''}
                                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                        className="w-full bg-black text-white font-semibold border-[1px] tracking-wider px-3 border-blue-theme rounded-md py-2 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center gap-10 pt-4">
                            <button
                                className="w-full border-blue-theme border-[1px] text-white py-2 rounded-md transition duration-200 ease-in-out hover:bg-gray-700"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                            <button
                                className="w-full bg-red-600 border-blue-theme border-[1px] text-white py-2 rounded-md transition duration-200 ease-in-out hover:bg-red-900"
                                disabled={loading}
                            >
                                {loading ? 'Deleting...' : 'Delete Profile'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;