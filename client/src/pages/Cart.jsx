import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Empty, Error, Loading } from '../components/Loading';
import empty from "/empty.png";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const { cartList, toggleItemCart } = useCart();
    const DELIVERY_FEE = 0;
    const DISCOUNT_PERCENT = 10;

    useEffect(() => {
        let isMounted = true;

        if (!Array.isArray(cartList) || cartList.length === 0) {
            setLoading(false);
            setProducts([]);
            setCartItems([]);
            return;
        }

        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/products/${cartList.join(',')}`);
                if (isMounted) {
                    if (res.data.message) {
                        setProducts([]);
                        setError(null);
                    } else {
                        setProducts(res.data);
                        setError(null);
                    }
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(`Error while fetching products: ${err.message}`);
                    setLoading(false);
                    setError(err);
                    setProducts([]);
                }
            }
        };
        fetchData();

        return () => {
            isMounted = false;
        };
    }, [cartList]);

    useEffect(() => {
        setCartItems(products.map(item => ({
            id: item._id,
            count: 1,
            subTotal: item.sellPrice
        })));
    }, [products]);


    const incCount = (id, price) => {
        setCartItems(prevItems => prevItems.map(e => {
            if (e.id === id) {
                if (e.count > 4) {
                    return e;
                } else {
                    return { ...e, count: e.count + 1, subTotal: (e.count + 1) * price };
                }
            }
            return e;
        }));
    };

    const decCount = (id, price) => {
        setCartItems(prevItems => prevItems.map(e => {
            if (e.id === id) {
                if (e.count <= 1) {
                    return e;
                } else {
                    return { ...e, count: e.count - 1, subTotal: (e.count - 1) * price };
                }
            }
            return e;
        }));
    };

    // Calculate subtotal, discount, and total
    const calculateTotals = () => {
        const subtotal = cartItems.reduce((total, item) => total + item.subTotal, 0);
        const discount = (DISCOUNT_PERCENT / 100) * subtotal;
        const total = subtotal - discount + DELIVERY_FEE;

        return { subtotal, discount, total };
    };

    const { subtotal, discount, total } = calculateTotals();

    return (
        <>
            {loading && <Loading />}
            {error && <Error error={error} />}
            {products.length === 0 ? (
                <Empty page="Cart" img={empty} />
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-center my-6">Your Cart</h1>
                    {/* outter div */}
                    <div className="xs:w-[95vw] sm:[90vw] md:w-5/6 mx-auto text-center sm:flex justify-between">
                        <div className="flex flex-col xs:text-xs md:text-sm p-1 sm:w-1/2 border-1">
                            {products.map((product) => {
                                const item = cartItems.find(e => e.id === product._id) || { count: 1 };
                                return (
                                    <div
                                        key={product.id}
                                        className='border-b-1 flex items-start relative xs:h-[110px] sm:h-[120px] py-4'>
                                        <p className="xs:text-xs sm:text-sm cursor-pointer hover:scale-110 absolute xs:top-0 xs:right-0" onClick={() => toggleItemCart(product._id)}>
                                            ❌
                                        </p>
                                        <Link to={`/product-details/${product._id}`} className='xs:w-1/3 xs:h-2/3 h-full m-auto flex justify-center items-center  sm:mr-2 md:mr-0'>
                                            <img src={product.img} alt={product.title} className='h-full' />
                                        </Link>
                                        <div className='xs:w-2/3 flex flex-col justify-start items-start gap-2 text-sm font-medium'>
                                            <p className="xs:text-base md:text-lg text-left font-medium text-gray-900">
                                                {product.title}
                                            </p>
                                            <p className="xs:text-xs md:text-sm gap-2 font-medium text-gray-500">
                                                Qty:
                                                <button
                                                    onClick={() => decCount(product._id, product.sellPrice)}
                                                    className={`inline-flex ml-4 px-2 border-1 ${item.count <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    disabled={item.count <= 1}

                                                >-</button>
                                                <p className='inline-flex px-2 border-1'>
                                                    {item.count}
                                                </p>
                                                <button
                                                    onClick={() => incCount(product._id, product.sellPrice)}
                                                    className={`inline-flex px-2 border-1 ${item.count >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    disabled={item.count > 5}
                                                >+</button>
                                            </p>
                                            <div className='flex justify-between items-start flex-col w-full'>
                                                <p className="xs:text-xs md:text-sm text-gray-500">
                                                    Price: {`\u20B9 ${new Intl.NumberFormat('en-IN').format(product.sellPrice)}`}
                                                </p>
                                                {
                                                    item.subTotal !== product.sellPrice ? (
                                                        <p className="xs:text-xs md:text-sm text-gray-500 justify-between">
                                                            Subtotal: {`\u20B9 ${new Intl.NumberFormat('en-IN').format(item.subTotal)}`}
                                                        </p>
                                                    ) : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="px-4 py-3 bg-gray-50 h-full w-1/2 md:mx-4 border-1 xs:w-full sm:w-1/2 xs:m-0 ">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>{`\u20B9 ${new Intl.NumberFormat('en-IN').format(subtotal)}`}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Discount ({DISCOUNT_PERCENT}%):</span>
                                <span>- {`\u20B9 ${new Intl.NumberFormat('en-IN').format(discount)}`}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Delivery Fee:</span>
                                <span>{`\u20B9 ${new Intl.NumberFormat('en-IN').format(DELIVERY_FEE)}`}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total:</span>
                                <span>{`\u20B9 ${new Intl.NumberFormat('en-IN').format(total)}`}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Cart;


