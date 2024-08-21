import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Search from './Search';
import { useWishList } from '../context/WishListContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { list } = useWishList();
    const { cartList } = useCart();

    // Toggle the menu
    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <nav className='sticky top-0 z-40 text-sm bg-white flex flex-col md:flex-row md:items-center md:justify-between p-4 py-2 gap-2 shadow-sm'>
            <div className='flex justify-between items-center'>
                {/* Logo */}
                <Link
                    to="/"
                    className="logo text-xl font-bold"
                    onClick={toggleMenu}
                >
                    ShoeVista
                </Link>

                {/* Toggle Button for Mobile */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden flex items-center"
                >
                    {
                        isOpen ? (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <path d="M3 21.32L21 3.32001" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 3.32001L21 21.32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        )
                    }
                </button>
            </div>

            {/* Navbar Links and Right Side Bar */}
            <div className={`flex flex-col md:flex-row md:items-center ${isOpen ? 'block' : 'hidden md:flex'}`}>
                {/* Links */}
                <ul className='flex flex-col md:flex-row md:gap-4 md:pr-6'>
                    {['/', '/shoes/men', '/shoes/women', '/shoes/kids'].map((path, index) => {
                        const labels = ['Home', 'Men', 'Women', 'Kids'];
                        return (
                            <li key={path} className='hover:bg-slate-100 transition-all duration-300 delay-100 p-2 rounded'>
                                <NavLink
                                    to={path}
                                    onClick={toggleMenu}
                                    className={({ isActive }) => `${isActive ? 'font-extrabold' : ''}`}
                                >
                                    {labels[index]}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>

                {/* Right Side Bar */}
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                    <Search />
                    <div className='flex items-center gap-4'>
                        <NavLink
                            to="/wishlist"
                            onClick={toggleMenu}
                        >
                            <div className='relative'>
                                <span className='w-4 text-center rounded-xl absolute bottom-4 left-4 text-xs bg-gray-900 text-white'>
                                    {list.length > 0 ? list.length : ''}
                                </span>
                                <img src="/Navbar/wishlist.png" alt="wishlist" className='w-6 h-6 hover:scale-110' />
                            </div>
                        </NavLink>
                        <NavLink
                            to="/cart"
                            onClick={toggleMenu}
                        >
                            <div className='relative'>
                                <span className='w-4 text-center rounded-xl absolute bottom-4 left-4 text-xs bg-gray-900 text-white'>
                                    {cartList.length > 0 ? cartList.length : ''}
                                </span>
                                <img src="/Navbar/cart.png" alt="cart" className='w-6 h-6 hover:scale-110' />
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;