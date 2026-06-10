"use client";
import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
    variantId: number;
    quantity: number;
}

type CartContextType = {
    cartItems: CartItem[];
    countCart: number;
    addToCart: (variantId: number, quantity: number) => void;
    removeFromCart: (variantId: number) => void;
    updateQuantity: (variantId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType>(null as any);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [countCart, setCountCart] = useState(0);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
        const count = cartItems.reduce(
            (sum: number, item: CartItem) => sum + item.quantity,
            0
        );
        setCountCart(count);
    }, [cartItems]);

    const addToCart = (variantId: number, quantity: number) => {
        setCartItems((prev) => {
            const exists = prev.find(item => item.variantId === variantId);
            if (exists) {
                return prev.map((item) =>
                    item.variantId === variantId ? { ...item, quantity: item.quantity + quantity } : item
                );
            }

            return [...prev, { variantId, quantity }];
        });

    }

    const removeFromCart = (variantId: number) => {
        setCartItems((prev) => prev.filter(item => item.variantId !== variantId));
    }

    const updateQuantity = (variantId: number, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.variantId === variantId ? { ...item, quantity } : item
            )
        );
    }

    return (
        <CartContext.Provider value={{ cartItems, countCart, addToCart, removeFromCart, updateQuantity, clearCart: () => setCartItems([]) }}>
            {children}
        </CartContext.Provider>
    )

}


export const useCart = () => useContext(CartContext);
