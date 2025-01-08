'use client';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = ({ setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignup, setIsSignup] = useState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`, {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: 'user',
      });

      toast.success('Signup successful');
      setIsLogin(false);
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(`Error in ${err.path}: ${err.message}`);
        });
      } else {
        toast.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="w-full h-full overflow-hidden" onSubmit={handleSubmit}>
        <div className="w-full overflow-hidden">
          <p className="text-green-500 text-2xl font-bold uppercase text-center">Signup</p>
          <hr className="h-[1px] border-0 bg-green-500 mt-2 mb-4" />
        </div>
        <div className="text-white flex flex-col items-center justify-around overflow-hidden">
          <div className="w-full flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-5 w-full h-[14.3rem] bg-gray-900 rounded-md px-2 py-3 scrollbar-hidden overflow-hidden overflow-y-auto">
              <div className="flex items-center border-2 rounded-md border-green-500 bg-transparent py-1 px-2 w-full">
                <UserCircleIcon className="text-white mr-3 size-7 p-1" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  className="bg-transparent font-medium text-white w-full outline-none"
                  required
                />
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
                <UserCircleIcon className="text-white mr-3 size-7 p-1" />
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your Username"
                  className="bg-transparent font-medium text-white w-full outline-none"
                  required
                />
              </div>
              <div className="flex items-center border-2 rounded-md border-green-500 bg-transparent py-1 px-2 w-full">
                <PhoneIcon className="text-white mr-3 size-7 p-1" />
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your Phone Number"
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
                  <EyeIcon className="text-white size-7 p-1 cursor-pointer" onClick={() => setShowPassword(false)} />
                ) : (
                  <EyeSlashIcon className="text-white size-7 p-1 cursor-pointer" onClick={() => setShowPassword(true)} />
                )}
              </div>
              <div className="flex items-center border-2 rounded-md border-green-500 bg-transparent py-1 px-2 w-full">
                <KeyIcon className="text-white mr-3 size-7 p-1" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your Password"
                  className="bg-transparent font-medium text-white w-full outline-none"
                  required
                />
                {showConfirmPassword ? (
                  <EyeIcon
                    className="text-white size-7 p-1 cursor-pointer"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <EyeSlashIcon
                    className="text-white size-7 p-1 cursor-pointer"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full border-2 border-green-500 py-1 rounded-md text-lg font-bold transition duration-200 ease-in-out hover:bg-green-900"
            >
              Signup
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;