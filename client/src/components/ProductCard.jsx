import React from 'react'
import { Link } from 'react-router-dom';
import { useWishList } from '../context/WishListContext';

const ProductCard = ({ product, home }) => {
    const { toggleItemWishList, list } = useWishList();

    const { img, title, sellPrice, brand, category, mrp, discount, rating } = product;
    return (
        <div
            className={`xs:text-xs xs:mx-1 my-2 xs:w-full  xs:h-[250px] md:h-[350px]
                md:mx-2 flex justify-between flex-col border-1 hover:border-black p-2 relative font-medium`}>
            <button onClick={() => toggleItemWishList(product._id)} className='z-10 w-4 h-4 absolute'>
                {
                    list.includes(product._id) ? "❤️" : "🤍"
                }
            </button>
            {/* Best Seller Badge */}
            {rating > 3.9 && !home && (
                <span className='absolute top-0 right-0 bg-red-500 text-white text-xs md:text-sm  px-1 rounded-sm'>
                    Best Seller
                </span>
            )}

            <Link to={`/product-details/${product._id}`} className='h-full' >

                {/* Img */}
                <div className='h-4/6 flex items-center justify-center '>
                    <img className='w-5/6 mx-auto ' src={img} alt={title} />
                </div>
                {/* Title */}
                <div className='h-1/6 flex flex-col justify-end items-start xs:mt-2 md:mt-6'>
                    <p className='md:text-base'>{title}</p>
                    <div className='flex justify-between w-full text-gray-400 xs:text-xs md:text-sm'>
                        <p>{brand}</p>
                        <p>{category == "child" ? `Kids` : category == "men" ? `Men's` :
                            category === "women" ? `Women's` : 'Unisex'} Shoes</p>
                    </div>
                </div>
                {/* Price */}
                <div className='h-1/6 flex justify-start items-center xs:gap-1 md:gap-2 pb-2'>
                    <p className='font-extrabold xs:text-base md:text-lg'>
                        {`\u20B9 ${new Intl.NumberFormat('en-IN').format(sellPrice)}`}
                    </p>

                    <p className='line-through text-gray-400 md:text-xs'>{mrp}</p>
                    <p className='text-red-500 md:text-sm'>{discount}% off</p>
                </div>
            </Link >
        </div>
    )
}

export default ProductCard
