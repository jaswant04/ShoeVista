import React from "react";
import { Link } from "react-router-dom";
import { useWishList } from "../context/WishListContext";

const HorSlider = ({ product, home }) => {
    // Destructure the product properties
    const { img, title, sellPrice, mrp, discount, brand, category, rating } =
        product;

    // Destructure wishlist context methods and state
    const { toggleItemWishList, list } = useWishList();

    return (
        // Link to the product details page
        <div>
            <div className="xs:m-2 xs:text-xs md:text-sm xs:w-[180px] xs:h-[250px] md:w-[250px] md:h-[300px] flex justify-between flex-col border-1 hover:border-black p-2 relative">
                {/* Wishlist button and Best Seller badge */}
                <div>
                    {/* Button to toggle wishlist status */}
                    <button
                        onClick={() => {
                            toggleItemWishList(product._id);
                        }}
                        className="z-10 w-4 h-4 absolute left-1 top-0"
                    >
                        {
                            list.includes(product._id) ? "❤️" : "🤍" // Display heart icon based on wishlist status
                        }
                    </button>
                    {/* Best Seller Badge */}
                    {rating > 3.9 && !home && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs md:text-sm px-1 rounded-sm">
                            Best Seller
                        </span>
                    )}
                </div>

                {/* Product image */}
                <div className="xs:h-2/3 sm:h-1/2 md:h-2/3 md:w-5/6 xs:text-sm md:text-base flex items-center ">
                    <Link to={`/product-details/${product._id}`}>
                        <img src={img} alt={title} />
                    </Link>
                </div>

                {/* Product title */}
                <p>{title}</p>

                {/* Product category and brand */}
                <div className="flex items-center justify-between text-gray-400 xs:text-sm">
                    <p>
                        {category === "child"
                            ? `Kids`
                            : category === "men"
                                ? `Men's`
                                : category === "women"
                                    ? `Women's`
                                    : "Unisex"}{" "}
                        Shoes
                    </p>
                    <p>{brand}</p>
                </div>

                {/* Product price, MRP, and discount */}
                <div className=" h-1/6 flex justify-start items-center xs:gap-1 md:gap-2 pb-2 xs:text-xs ">
                    <p className="font-extrabold xs:text-base md:text-lg">
                        {`\u20B9 ${new Intl.NumberFormat("en-IN").format(sellPrice)}`}
                    </p>
                    <p className="line-through text-gray-400 md:text-xs">{mrp}</p>
                    <p className="text-red-500 md:text-sm">{discount}% off</p>
                </div>
            </div>
        </div>
    );
};

export default HorSlider;
