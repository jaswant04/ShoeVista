import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        if (!search) {
            return alert("Enter something first!")
        }
        if (search.trim()) {
            navigate(`/search/${encodeURIComponent(search)}`);
            setSearch("")
        }
    };

    return (
        <form onSubmit={handleSearch} className='flex items-center border-2 rounded-sm border-gray-400 '>
            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search...'
                className='pl-2'
            />
            <button type="submit">
                <img src="/Navbar/search.png" alt="Search" className='w-6 h-6 rounded-sm hover:scale-110' />
            </button>
        </form>
    );
};

export default Search;
