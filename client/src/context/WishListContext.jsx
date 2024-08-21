import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast, Bounce } from "react-toastify";

const WishListContext = createContext();

export const useWishList = () => useContext(WishListContext);

export const WishListProvider = ({ children }) => {
    const [list, setList] = useState(() => {
        try {
            const savedList = localStorage.getItem('wishList');
            return savedList ? JSON.parse(savedList) : [];
        } catch {
            return [];
        }
    });

    // Save the list to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishList', JSON.stringify(list));
    }, [list]);

    // Function to add/remove an item to/from the list 
    const toggleItemWishList = useCallback((id) => {
        setList(prev => {
            if (prev.includes(id)) {
                const newList = prev.filter(oldIds => oldIds !== id)
                toast.success('Item removed from your wishlist.', {
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
                return newList;
            }
            toast.success('Item added to your wishlist.', {
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
    }, []);

    return (
        <WishListContext.Provider value={{ list, toggleItemWishList }}>
            {children}
        </WishListContext.Provider>
    );
};
