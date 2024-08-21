import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Products from '../components/Products';

const Men = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/men`);
                if (isMounted) {
                    const sorted = res.data.sort((a, b) => parseInt(b.reviews) - parseInt(a.reviews))
                    setProducts(sorted);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(`Error while fetching products: ${err.message}`);
                    setError(err);
                    setLoading(false);
                }

            }
        }
        fetchData();
        return () => {
            isMounted = false;
        }
    }, [])
    return (
        <>
            <Products loading={loading} error={error} products={products} />
        </>
    )
}

export default Men