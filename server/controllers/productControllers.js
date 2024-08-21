import Products from "../models/productModel.js";

//Get all products 
export const getProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(`Error while fetching products: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

//Get single product by id
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        if (!product) {
            return res.status(400).json({ message: "Product doesn't exist." })
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(`Error while fetching product: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

//Add a product
export const addProduct = async (req, res) => {
    try {
        const { img, brand, title, rating, reviews, sellPrice, orders, mrp, discount } = req.body;

        const newProduct = await Products.create({ img, brand, title, rating, reviews, sellPrice, orders, mrp, discount });
        return res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error(`Error while adding product: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

//Get products by Category
export const getByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Products.find({ category: category });
        res.status(200).json(products);

    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

//Get top rated 
export const getTopRated = async (req, res) => {
    try {
        const topRatedShoes = await Products.find()
            .sort({ rating: -1 })
            .limit(12);
        return res.status(200).json(topRatedShoes);
    } catch (err) {
        console.error('Error fetching top-rated shoes:', err);
        res.status(500).send('Internal Server Error');
    }
}

//Get best Sellers
export const getBestSellers = async (req, res) => {
    try {
        const products = await Products.find()
            .sort({ reviews: -1 })
            .limit(12);

        return res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching top-rated shoes:', err.message);
        res.status(500).send('Internal Server Error');
    }
}

//Get search results
export const searchProducts = async (req, res) => {
    try {
        let query = req.query.q ? req.query.q.trim() : '';
        if (query.length === 0) {
            return res.status(400).json({ message: "Empty search field" });
        }
        if (query.includes('sneakers')) {
            query = query.replace('sneakers', 'sneaker');
        }

        // Normalize specific keywords
        query = query.replace(/kids|boys|girls/gi, "child");
        query = query.replace(/mens/gi, "men");
        query = query.replace(/womens/gi, "women");
        query = query.replace(/\b(shoe|shoes)\b/gi, ' ').trim();

        // Remove special characters (e.g., apostrophes)
        query = query.replace(/'/g, '');
        // Normalize query terms
        const terms = query.split(/\s+/);
        // Build the search query
        const searchQuery = {
            $or: [
                ...terms.map(term => ({
                    $or: [
                        { title: { $regex: term, $options: "i" } },
                        { brand: { $regex: term, $options: "i" } },
                        { category: { $in: term } }
                    ]
                }))
            ]
        };

        const results = await Products.find(searchQuery);

        // Send response
        res.json(results);
    } catch (error) {
        console.error('Error performing search:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Sort products
// export const sortProducts = async (req, res) => {
//     try {
//         const { category, criteria, order } = req.params;
//         const orderby = parseInt(order);

//         const result = await Products.find({ category: category })
//             .sort({ [criteria]: orderby })

//         if (!result) {
//             return res.status(400).json(`Product not found.`)
//         }
//         res.status(200).json(result);


//     } catch (error) {
//         console.error('Error while sorting:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
// }

export const filterProducts = async (req, res) => {
    try {
        // Destructure filter parameters from the query string
        const { brand, rating, category, price, discount } = req.query;

        // Log the query parameters for debugging
        // console.log('Query Parameters:', req.query);

        // Build a filter object based on provided parameters
        const filter = {};

        // Process brand
        if (brand) filter.brand = new RegExp(brand, 'i');

        // Process rating
        if (rating) {
            const ratingValue = parseFloat(rating);
            if (!isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5) {
                filter.rating = { $gte: ratingValue };
            }
        }

        // Process category
        if (category) {
            if (category === "Unisex") {
                filter.category = "adult";
            } if (category === "Kids") {
                filter.category = "child"
            } else {
                filter.category = category.toLowerCase();
            }
        }

        // Process price range
        let priceRange = {};
        if (price) {
            const priceRangeMatch = price.match(/₹(\d+)-₹(\d+)/);
            if (priceRangeMatch) {
                const minPrice = parseFloat(priceRangeMatch[1].replace(',', ''));
                const maxPrice = parseFloat(priceRangeMatch[2].replace(',', ''));
                priceRange = { $gte: minPrice, $lte: maxPrice };
            } else if (price === "₹3000+") {
                priceRange = { $gte: 3000 };
            }
            filter.sellPrice = priceRange;
        }

        // Process discount
        if (discount) {
            const discountMatch = discount.match(/(\d+)%/);
            if (discountMatch) {
                const discountValue = parseInt(discountMatch[1], 10);
                filter.discount = { $gte: discountValue };
            }
        }

        // Query the database with the constructed filter
        const result = await Products.find(filter);

        // Check if any products were found
        if (result.length === 0) {
            return res.status(404).json({ message: 'No products found matching the criteria.' });
        }
        return res.status(200).json(result);

    } catch (error) {
        console.error('Error while filtering products:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

export const listOfProducts = async (req, res) => {
    try {
        const { list } = req.params;

        // Convert comma-separated string to array of IDs
        const idArray = list.split(',').map(id => id.trim());

        // Check if the array of IDs is empty
        if (idArray.length === 0) {
            return res.status(200).json({ message: "No product IDs provided" });
        }

        // Fetch products from the database
        const result = await Products.find({ _id: { $in: idArray } });

        // Check if any products were found
        if (result.length === 0) {
            return res.status(200).json({ message: "Products not found" });
        }

        // Send response with products
        res.status(200).json(result);
    } catch (error) {
        console.error('Error while fetching products:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
