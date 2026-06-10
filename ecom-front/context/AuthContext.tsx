"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../lib/axios";
import axiosInstance from "../lib/axios";

type User = {
    id: number;
    name: string;
    email: string;
}

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (data: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;

}

const AuthContext = createContext<AuthContextType>(null as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    const refreshUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            return;
        }

        try {
            const res = await axiosInstance.get("/me");
            setUser(res.data);
        } catch (error) {
            console.error(error);
            setUser(null);
            localStorage.removeItem("token");
        }
    }


    useEffect(() => {
        refreshUser().finally(() => setLoading(false));
    }, [])

    // register function 
    const register = async (data: any) => {
        
        await axiosInstance.post("/register", data);
        await refreshUser();
    }

    // login function
    const login = async (data: any) => {
        const res = await axiosInstance.post("/login", data);
        localStorage.setItem("token", res.data.access_token);

        setUser(res.data.user);
        await refreshUser();
    }

    const logout = async () => {
        await axiosInstance.post("/logout");
        localStorage.removeItem("token");
        setUser(null);
    }



    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
