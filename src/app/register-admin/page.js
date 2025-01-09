'use client';
import React, { Suspense, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

const RegisterAdminComponent = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return alert('Passwords do not match!');
        }

        const response = await fetch(`/api/admins/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, email }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Admin registered successfully!');
            router.push('/admin');
        } else {
            alert(data.error || 'Failed to register admin.');
        }
    };

    if (!email) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-white text-lg font-bold">Invalid or missing invitation link.</p>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex items-center justify-center relative">
            <Image
                src="/Bg-screen.jpg"
                alt="Background image"
                width={1000}
                height={1000}
                priority
                className="fixed top-0 h-screen w-full z-[-2]"
            />
            <div className="absolute inset-0 bg-[#000000] opacity-70 z-[-1]"></div>
            <form
                onSubmit={handleSubmit}
                className="w-[60%] flex flex-col gap-4 bg-black/40 backdrop-blur-md border-2 border-green-500 rounded-md p-5"
            >
                <div className="text-2xl font-bold mb-4 text-white flex flex-col w-full gap-3">
                    <div className="w-full">Register Admin</div>
                    <hr className="w-full border-none h-[1px] bg-white" />
                </div>
                <div className="flex flex-col items-start justify-center w-full">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-black rounded-md py-2 px-2 border-2 border-green-500 focus:outline-none text-white"
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="flex flex-col items-start justify-center w-full">
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-black rounded-md py-2 px-2 border-2 border-green-500 focus:outline-none text-white"
                        placeholder="Phone"
                        required
                    />
                </div>
                <div className="flex flex-col items-start justify-center w-full">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full bg-black rounded-md py-2 px-2 border-2 border-green-500 focus:outline-none text-white"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="flex flex-col items-start justify-center w-full">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full bg-black rounded-md py-2 px-2 border-2 border-green-500 focus:outline-none text-white"
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full mt-4 border-neutral-400 border-2 text-white py-2 rounded-md font-bold transition ease-in-out duration-150 hover:bg-neutral-500"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

const RegisterAdmin = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterAdminComponent />
        </Suspense>
    );
};

export default RegisterAdmin;