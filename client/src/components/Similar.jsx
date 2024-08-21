import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Error, Loading } from './Loading';
import HorSlider from './HorSlider';

const Similar = ({ gender, id }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/category/${gender}`);
                if (isMounted) {
                    const sliced = res.data.slice(0, 15);
                    const filtered = sliced.filter(elem => elem._id != id)
                    setProducts(filtered);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    console.error(`Error while fetching products: ${err.message}`);
                    setError(err);
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [id]);



    return (
        <>
            <div className='xs:w-[95vw] md:max-w-screen-xl mx-auto overflow-x-scroll overflow-y-hidden scroll-container'>
                {loading && <Loading />}
                {error && <Error error={error} />}
                <div className='flex flex-nowrap'>
                    {products.map(elem => (
                        <HorSlider product={elem} key={elem._id} className="inline-block" />
                    ))}
                </div>
            </div>

        </>

    );
};

export default Similar;
