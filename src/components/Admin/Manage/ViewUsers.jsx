import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users`);
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on the search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercasedQuery) ||
        user.email.toLowerCase().includes(lowercasedQuery) ||
        user.username.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  return (
    <div className='w-full h-full overflow-hidden'>
      <div className='flex items-center justify-center flex-col w-full'>
        <div className="w-full flex items-center justify-center lg:justify-between lg:flex-row flex-col pb-5 gap-2 lg:gap-0">
          <div className='flex items-center justify-between w-full'>
            <p className='text-2xl font-bold text-black w-full lg:text-left text-center'>View Users</p>
          </div>
          <div className="w-full lg:w-auto relative flex items-center px-2 lg:pr-4 py-2 rounded-full lg:gap-2 bg-black border-2 border-green-500">
            <MagnifyingGlassIcon className='size-6 text-green-500' />
            <input
              type="text"
              className='bg-black border-none text-white px-2 rounded-full focus:outline-none'
              placeholder='Search users...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <hr className='w-full h-[1px] border-none bg-white mb-5' />
      </div>
      <div className='w-full h-[25.5rem] pb-4 flex gap-6 flex-col items-center justify-start pt-7 lg:px-3 overflow-hidden overflow-y-auto'>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='text-red-500'>{error}</div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className='w-full bg-black border-2 border-green-500 rounded-md flex items-center justify-between px-2 lg:px-4 py-2'
            >
              <div className='flex items-start justify-between flex-col gap-2'>
                <div className='text-lg lg:text-2xl font-bold'>{user.name}</div>
                <div className='text-sm lg:text-base font-normal italic'>{user.email}</div>
              </div>
              <div className='flex items-center justify-between flex-col gap-2'>
                <div className='text-sm lg:text-base font-semibold'>{user.username}</div>
                <div className='text-sm lg:text-base font-semibold'>{user.phoneNumber}</div>
              </div>
            </div>
          ))
        ) : (
          <div className='text-red-500 font-bold'>No users found</div>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;