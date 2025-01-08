'use client';
import React, { useEffect, useState } from 'react';
import AdminsSidebar from '../Sidebars/AdminsSidebar';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const ManageAdmins = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);

  // Fetch admins and pending invites
  const fetchAdminsAndInvites = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admins`);
      const data = await response.json();
      setAdmins(data.activeAdmins || []);
      setPendingInvites(data.pendingInvites || []);
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    }
  };

  useEffect(() => {
    fetchAdminsAndInvites();
  }, []);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex items-center justify-between w-full pb-5">
        <p className="text-2xl font-bold">Manage Admins</p>
        <button
          className="bg-black border-2 border-green-500 rounded-full px-3 pr-5 py-1 flex items-center gap-4"
          onClick={openSidebar}
        >
          <PlusCircleIcon className='size-8 text-green-500' />
          <p className='font-bold text-lg'>Add Admin</p>
        </button>
      </div>
      <hr className="w-full h-[1px] border-none bg-white mb-5" />

      <div className='w-full h-[26rem] overflow-hidden overflow-y-auto px-3'>
        {/* Pending Invites Section */}
        {pendingInvites.length > 0 && (
          <div className="w-full">
            <h3 className="text-lg font-bold mb-5">Pending Invites</h3>
            <div className="w-full h-[25.5rem] flex flex-col gap-4 overflow-y-auto">
              {pendingInvites.map((invite) => (
                <div
                  key={invite._id}
                  className="w-full bg-black border-2 border-yellow-500 rounded-md flex items-center justify-between px-4 py-2"
                >
                  <div className="flex items-start justify-center flex-col gap-2">
                    <p className="text-lg font-bold italic">{invite.email}</p>
                    <p className="text-sm font-light italic">
                      Invited on: {new Date(invite.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={async () => {
                      // Delete pending invite logic
                      try {
                        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/invite/${invite._id}`, { method: 'DELETE' });
                        fetchAdminsAndInvites();
                      } catch (error) {
                        console.error('Failed to delete invite:', error);
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Cancel Invite
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Admins Section */}
        <div className="w-full">
          <h3 className="text-lg font-bold mb-5">Active Admins</h3>
          <div className="w-full h-[25.5rem] flex flex-col gap-4 overflow-y-auto">
            {admins.map((admin) => (
              <div
                key={admin._id}
                className="w-full bg-black border-2 border-green-500 rounded-md flex items-center justify-between px-4 py-2"
              >
                <div className="flex items-start justify-center flex-col gap-2">
                  <p className="text-lg font-bold">{admin.name}</p>
                  <p className="text-sm">{admin.email}</p>
                </div>
                <button
                  onClick={async () => {
                    // Delete admin logic
                    try {
                      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/${admin._id}`, { method: 'DELETE' });
                      fetchAdminsAndInvites(); // Refresh data
                    } catch (error) {
                      console.error('Failed to delete admin:', error);
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                >
                  Delete Admin
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <AdminsSidebar closeSidebar={closeSidebar} refreshAdmins={fetchAdminsAndInvites} />
      )}
    </div>
  );
};

export default ManageAdmins;