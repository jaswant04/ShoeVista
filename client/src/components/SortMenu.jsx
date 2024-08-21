import React, { forwardRef } from 'react';

const SortMenu = forwardRef(({ products, setData, isVisible, setVisibility }, ref) => {
    const sortBtns = [
        { name: "Best sellers", value: "rating", order: "-1" },
        { name: "Price: Low-High", value: "sellPrice", order: "1" },
        { name: "Price: High-Low", value: "sellPrice", order: "-1" },
    ];

    const toggleSortMenu = () => setVisibility(prev => !prev);

    const handleSort = (btn) => {
        const { value, order } = btn;
        const sortedData = [...products].sort((a, b) => {
            if (value === "sellPrice") {
                return order === "1" ? a.sellPrice - b.sellPrice : b.sellPrice - a.sellPrice;
            }
            if (value === "rating") {
                return order === "1" ? a.rating - b.rating : b.rating - a.rating;
            }
            return 0;
        });
        setData(sortedData);
        setVisibility(false);
    };

    return (
        <div className='xs:mx-2 text-sm md:text-base' ref={ref}>
            <button
                className='border-1 border-gray-600 px-4 sm:py-1  hover:bg-gray-900 hover:text-white cursor-pointer'
                onClick={toggleSortMenu}
                aria-expanded={isVisible}
                aria-haspopup="true"
            >
                Sort ↑↓
            </button>
            {isVisible && (
                <div className='flex flex-col z-20 absolute shadow-lg bg-white'>
                    {sortBtns.map((btn, id) => (
                        <button
                            className='w-full pr-6 pl-4 md:py-1 text-left border-1 border-gray-100 hover:bg-gray-900 hover:text-white'
                            onClick={() => handleSort(btn)}
                            key={id}
                        >
                            {btn.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
});

export default SortMenu;
