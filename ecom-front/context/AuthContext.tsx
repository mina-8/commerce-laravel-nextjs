"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../lib/axios";
import axiosInstance from "../lib/axios";

type User ={
    id:number;
    name:string;
    email:string;
}

type AuthContextType = {
    user:User | null;
    loading:boolean;
    login:(data:any)=>Promise<void>;
    logout:()=>void;
}

const AuthContext = createContext<AuthContextType>(null as any);

export const AuthProvider = ({ children }: any) => {
    const [user , setUser] = useState<User | null>(null);
    const [loading , setLoading] = useState(false);

    // load user once
    useEffect(()=>{
        const  token = localStorage.getItem("token");
        if(!token) {
            setLoading(false);
            return;
        }

        axios.get("me")
        .then((res) => {
            setUser(res.data);
        })
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } , []);

    // login function
    const login = async (data : any) => {

        const res = await axios.post("/login" , data);

        localStorage.setItem("token" , res.data.access_token);

        setUser(res.data.user);
    }

    const logout = async () => {
        await axiosInstance.post("/logout");
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user , loading , login , logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
