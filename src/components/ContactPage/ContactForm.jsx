'use client';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { name, email, subject, message } = formData;

        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            toast.error('All fields are required.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSending(true);

        try {
            const response = await fetch(`/api/sendEmail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Email sent successfully!');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error(result.error || 'Failed to send email.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className='w-2/3 h-full flex items-start justify-between'>
            <Toaster position="top-right" reverseOrder={false} />
            <form
                className='h-[65%] w-full p-4 bg-black text-white border-2 border-green-500 rounded-md flex items-center justify-between flex-col'
                onSubmit={handleSubmit}
            >
                <div className='w-full h-full flex flex-col items-start justify-between gap-4 overflow-hidden overflow-y-auto px-3 pb-4'>
                    <div className='w-full flex flex-col items-start justify-center gap-1'>
                        <label className='text-neutral-300 font-bold text-sm'>
                            Name
                        </label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full bg-black border-2 border-green-500 focus:outline-none rounded-md py-1 px-2'
                            placeholder='Enter your Name'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-1'>
                        <label className='text-neutral-300 font-bold text-sm'>
                            Email Address
                        </label>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full bg-black border-2 border-green-500 focus:outline-none rounded-md py-1 px-2'
                            placeholder='Enter your Email Address'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-1'>
                        <label className='text-neutral-300 font-bold text-sm'>
                            Subject
                        </label>
                        <input
                            type='text'
                            name='subject'
                            value={formData.subject}
                            onChange={handleChange}
                            className='w-full bg-black border-2 border-green-500 focus:outline-none rounded-md py-1 px-2'
                            placeholder='Enter the Subject'
                        />
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-1'>
                        <label className='text-neutral-300 font-bold text-sm'>
                            Message
                        </label>
                        <textarea
                            name='message'
                            value={formData.message}
                            onChange={handleChange}
                            className='w-full bg-black border-2 border-green-500 focus:outline-none rounded-md py-1 px-2'
                            placeholder='Enter your Message'
                        />
                    </div>
                </div>
                <button
                    type='submit'
                    disabled={isSending}
                    className={`w-full py-2 mt-4 flex items-center justify-center border-2 border-neutral-400 rounded-md transition ease-in-out duration-200 ${isSending ? 'bg-neutral-700 cursor-not-allowed' : 'hover:bg-neutral-700'
                        }`}
                >
                    {isSending ? 'Sending...' : (
                        <>
                            <PaperAirplaneIcon className='h-5 w-5 mr-2 -rotate-45' />
                            Send Message
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;