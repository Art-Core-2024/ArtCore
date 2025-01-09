'use client';
import {
  ChevronDownIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  NumberedListIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Select Your Role');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMeChange = () => {
    setRememberMe((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (role) => {
    setSelectedRole(role);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure a role is selected
    if (selectedRole === 'Select Your Role') {
      toast.error('Please select a role', { position: 'top-center' });
      return;
    }

    try {
      // Send login request
      const response = await axios.post(`/api/login`, {
        email: formData.email,
        password: formData.password,
        role: selectedRole.toLowerCase(),
      });

      const { user, token } = response.data;

      // Store token for session persistence
      localStorage.setItem('token', token);

      toast.success('Login successful!', { position: 'top-center' });

      // Redirect based on role
      if (user.role === 'user') {
        router.push('/');
      } else if (user.role === 'admin' || user.role === 'super-admin') {
        router.push('/admin');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed. Try again.',
        { position: 'top-center' }
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="w-full h-full overflow-hidden">
        <div className="w-full overflow-hidden">
          <p className="text-green-500 text-2xl font-bold uppercase text-center">Login</p>
          <hr className="h-[1px] border-0 bg-green-500 mt-2 mb-4" />
        </div>
        <div className="text-white flex flex-col items-center justify-around overflow-hidden">
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center gap-5 w-full h-[12.8rem] bg-gray-900 rounded-md px-2 py-3 scrollbar-hidden overflow-hidden overflow-y-auto">
              <div className="relative w-full" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="flex items-center border-2 rounded-md border-green-500 bg-transparent py-1 px-2 w-full text-left font-medium text-white outline-none cursor-pointer"
                >
                  <NumberedListIcon className="text-white mr-3 size-7 p-1" />
                  <span>{selectedRole}</span>
                  <ChevronDownIcon
                    className={`text-white size-7 p-1 ml-auto transition duration-100 ease-in-out ${dropdownOpen ? '-rotate-180' : ''
                      }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full mt-1 w-full text-center font-semibold border border-green-500 bg-black rounded-md shadow-lg py-1 z-20">
                    {['User', 'Admin'].map((role) => (
                      <div
                        key={role}
                        onClick={() => handleOptionClick(role)}
                        className="block px-4 py-2 text-sm hover:bg-green-500 hover:text-black cursor-pointer"
                      >
                        {role}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center border-2 rounded-md border-green-500 bg-transparent py-1 px-2 w-full">
                <EnvelopeIcon className="text-white mr-3 size-7 p-1" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email address"
                  className="bg-transparent font-medium text-white w-full outline-none"
                  required
                />
              </div>
              <div className="flex items-center border-2 rounded-md border-green-500 bg-transparent py-1 px-2 w-full">
                <KeyIcon className="text-white mr-3 size-7 p-1" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="bg-transparent font-medium text-white w-full outline-none"
                  required
                />
                {showPassword ? (
                  <EyeIcon
                    className="text-white size-7 p-1 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeSlashIcon
                    className="text-white size-7 p-1 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between w-full mb-3 mt-3 px-4">
              <div className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="mr-2 size-4 cursor-pointer"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label
                  htmlFor="rememberMe"
                  className="cursor-pointer transition duration-100 ease-in-out hover:text-gray-400"
                >
                  Remember Me
                </label>
              </div>
              <Link href="/auth/forgot-password">
                <div className="hover:underline cursor-pointer">Forgot Password?</div>
              </Link>
            </div>
            <button
              type="submit"
              className="w-full border-2 border-green-500 py-1 rounded-md text-lg font-bold transition duration-200 ease-in-out hover:bg-green-900"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;