import React, { createContext, useContext, useEffect, useState } from "react";
import { toast, Bounce } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartList, setCartList] = useState(() => {
        try {
            const savedList = localStorage.getItem('cartList');
            return savedList ? JSON.parse(savedList) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartList', JSON.stringify(cartList));
    }, [cartList]);

    const toggleItemCart = (id) => {
        setCartList(prev => {
            if (prev.includes(id)) {
                toast.success('Item removed from the cart.', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                return prev.filter(oldId => oldId !== id);
            }
            toast.success('Item added to the cart.', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            return [...prev, id];
        });
    };

    return (
        <CartContext.Provider value={{ cartList, toggleItemCart }}>
            {children}
        </CartContext.Provider>
    );
};
