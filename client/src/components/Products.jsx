import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { Loading, Error } from './Loading';
import SortMenu from './SortMenu';
import FilterMenu from './FilterMenu';

const Products = ({ products, loading, error }) => {
    const [data, setData] = useState(products);
    const [sortMenuVisible, setSortMenuVisible] = useState(false);
    const [filterMenuVisible, setFilterMenuVisible] = useState(false);
    const sortMenuRef = useRef(null);
    const filterMenuRef = useRef(null);

    useEffect(() => {
        setData(products);
    }, [products]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) &&
                (filterMenuRef.current && !filterMenuRef.current.contains(event.target))
            ) {
                setSortMenuVisible(false);
                setFilterMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (
        <div className='xs:w-[95vw] md:max-w-screen-xl mx-auto'>
            <div className='flex justify-between items-center pt-6'>
                <SortMenu
                    products={data}
                    setData={setData}
                    isVisible={sortMenuVisible}
                    setVisibility={setSortMenuVisible}
                    ref={sortMenuRef}
                />
                <FilterMenu
                    setData={setData}
                    isVisible={filterMenuVisible}
                    setVisibility={setFilterMenuVisible}
                    ref={filterMenuRef}
                />
            </div>
            <div
                className='grid grid-rows-fr xs:grid-cols-2 sm:grid-cols-3 xs:gap-2 sm:gap-4
                lg:grid-cols-4 md:mx-4 justify-items-center items-center my-4'>
                {loading ? <Loading /> : (
                    error ? <Error error={error} /> : (
                        data.length === 0 ? <p>No products Available</p> : (
                            data.map((elem, i) => i < 30 && <ProductCard product={elem} key={elem._id} />)
                        )
                    )
                )}
            </div>
        </div>
    );
};

export default Products;