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
    addToCart:(variantId:number, quantity:number)=>void;
    removeFromCart:(variantId:number)=>void;
    updateQuantity: (variantId: number, quantity: number) => void;
    countCart:number;
    getCart:()=>any[];
}

const AuthContext = createContext<AuthContextType>(null as any);

export const AuthProvider = ({ children }: any) => {
    const [user , setUser] = useState<User | null>(null);
    const [countCart , setCountCart] = useState(0);
    const [loading , setLoading] = useState(false);


    const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const count = cart.reduce(
        (total: number, item: any) => total + item.quantity,
        0
    );

    setCountCart(count);
};
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

        updateCartCount();
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

    const addToCart = (variantId:number , quantity:number) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const existingItem = cart.find((item:any) => item.variantId === variantId);

        if(existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ variantId, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

     const removeFromCart = (variantId:number) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const updatedCart = cart.filter((item:any) => item.variantId !== variantId);

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        updateCartCount();
     }

    const updateQuantity = (variantId: number, quantity: number) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const item = cart.find((item: any) => item.variantId === variantId);

        if (item) {
            item.quantity = quantity;
            if (quantity <= 0) {
                const updatedCart = cart.filter((item: any) => item.variantId !== variantId);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
            } else {
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }
        updateCartCount();
        // We need to trigger a state update in components using the cart
        // This can be done by returning the new cart or having components refetch it
    }

     const getCart = () =>{
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        return cart;
     }

    return (
        <AuthContext.Provider value={{ user , loading , login , logout , addToCart , removeFromCart, updateQuantity , countCart , getCart }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
