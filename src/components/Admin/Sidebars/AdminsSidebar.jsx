'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AdminsSidebar = ({ closeSidebar, refreshAdmins }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInviteAdmin = async () => {
        if (!email) return alert('Please enter an email address.');
        setLoading(true);
        try {
            const response = await fetch('/api/admins/invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message || 'Invitation sent successfully!');
                refreshAdmins();
                closeSidebar();
            } else {
                alert(data.error || 'Failed to send invitation.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while sending the invitation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ translateX: '100%' }}
            animate={{ translateX: '0%' }}
            exit={{ translateX: '100%' }}
            className="fixed top-0 right-0 w-1/3 h-full border-l-2 border-green-500 bg-black p-5 shadow-lg z-50 overflow-hidden"
        >
            <h2 className="text-2xl font-bold mb-4">Add Admin</h2>
            <div className="flex flex-col gap-4">
                <label className="text-white">Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-white bg-black border-2 border-green-500 rounded-md py-1 px-2"
                />
                <button
                    onClick={handleInviteAdmin}
                    disabled={loading}
                    className="bg-green-500 text-black p-2 rounded-md font-bold"
                >
                    {loading ? 'Sending...' : 'Add Admin'}
                </button>
            </div>
            <button
                onClick={closeSidebar}
                className="text-red-500 mt-4 w-full flex items-center justify-center"
            >
                Cancel
            </button>
        </motion.div>
    );
};

export default AdminsSidebar;