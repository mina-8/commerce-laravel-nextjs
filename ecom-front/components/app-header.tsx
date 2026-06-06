"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '@/context/ThemeToggle';


const AppHeader = () => {
    const { user, logout } = useAuth();
    const [scrolled, setscrolled] = React.useState(false);
    useEffect(()=>{
        const handleScroll = () => {
            setscrolled(window.scrollY > 10);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    return (
        <div
            className={`sticky top-0  z-50 px-4 py-4 w-full flex items-center justify-between border-b border-solid border-black/8 dark:border-white/[.145] ${scrolled ? 'bg-white dark:bg-background' : ''}`}
        >
            <Link
                href="/"
            >
                E-commerce
            </Link>
            <div
                className="flex items-center gap-4"
            >
                {user ? (
                    <>
                        <span
                            className="p-2 size-10 flex justify-center items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                        >
                            {user.name.slice(0, 1).toUpperCase()}
                        </span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            href="/login"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                        >
                            Signup
                        </Link>
                    </>
                )}
                <ThemeToggle />
            </div>
        </div>
    )
}

export default AppHeader