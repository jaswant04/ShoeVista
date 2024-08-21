import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Error, Loading } from './Loading';
import Products from './Products';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { search } = useParams();

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/products/search?q=${encodeURIComponent(search)}`);
                if (isMounted) {
                    if (search.includes('women')) {
                        const data = res.data.filter(elem => elem.category === 'women');
                        setProducts(data);
                    } else {
                        setProducts(res.data.slice(0, 50));
                    }
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    console.error('Error while searching:', err.message);
                    setLoading(false);
                    setError(err);
                }
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [search]);

    return (
        <>
            {loading && <Loading />}
            {error && <Error error={error} />}
            <Products products={products} error={error} loading={loading} />
        </>
    );
};

export default SearchResults;
