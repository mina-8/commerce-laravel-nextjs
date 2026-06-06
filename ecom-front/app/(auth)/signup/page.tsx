"use client"
import axiosInstance from '@/lib/axios';
import { Eye, EyeOff } from 'lucide-react';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/register", data);
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error.response?.data);
      toast.warning(error.response?.data?.message);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div
      className="min-h-full flex items-center justify-center"
    >
      <form
        className="flex flex-col gap-3 p-1 rounded shadow-md w-full max-w-md relative mt-4 overflow-hidden"
        onSubmit={handleSubmit}
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-225 w-20 bg-linear-to-r from-purple-400 to-pink-400 opacity-10 rounded animate-spin [animation-duration:10s]"
        />
        <div
          className="relative z-10 flex flex-col gap-4 bg-white dark:bg-black p-6 rounded"
        >
          <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div
              className='relative'
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <span
                className="cursor-pointer absolute top-1/2 right-1 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div
            className='relative'
            >
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                value={data.password_confirmation}
                onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <span
                className="cursor-pointer absolute top-1/2 right-1 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUp