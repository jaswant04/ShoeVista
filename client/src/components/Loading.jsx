import React from 'react'
import { NavLink } from 'react-router-dom'

export const Loading = () => {
    return <p>Loading products...</p>
}

export const Error = ({ error }) => {
    return (
        <p>Error: {error.message || 'Something went wrong.'}</p>
    )
}

export const Empty = ({ page, img }) => {
    return (
        <div className='w-5/6 h-[500px] mx-auto border-1 border-gray-300 flex flex-col justify-center items-center '>
            <img src={img} alt="Empty icon" className='h-1/2' />
            <p className='text-xl'>Your {page} is empty!</p>
            <p className='text-center'>You haven’t added any items to your {page} yet.</p>
            <NavLink to="/" className='text-blue-500 underline hover:text-blue-700'>
                Start shopping
            </NavLink>

        </div>

    )
}
