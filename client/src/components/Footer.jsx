import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const contactItems = [
        { src: "/Footer/telephone.png", alt: "Mobile", data: "+91 9876543210" },
        { src: "/Footer/email.png", alt: "Email", data: "shoevista@gmail.com" },
        { src: "/Footer/pin.png", alt: "Address", data: "ShoeVista, 45 Sapphire Road, Sector 22, <br />Gurgaon, Haryana, 122018, India" },

    ]
    return (
        <footer className='bg-gray-50 flex flex-col items-start w-full mx-auto p-4 pb-2 mt-8 text-sm'>
            <div className='flex justify-between flex-col items-start mt-6 md:flex-row md:justify-around md:w-full'>
                <ul className='flex justify-center items-start gap-4 flex-col'>
                    <li className='font-semibold text-base'>Links </li>
                    <li><Link to="/about-us" className='hover:border-b-2 border-black'>About us</Link></li>
                    <li><Link to="/cart" className='hover:border-b-2 border-black'>Cart </Link></li>
                    <li><Link to="/wishlist" className='hover:border-b-2 border-black'>Wishlist</Link></li>
                </ul>
                <ul className='flex justify-center items-start gap-4 flex-col'>
                    <li  className='font-semibold text-base'>Sections</li>
                    <li><Link to="/shoes/men" className='hover:border-b-2 border-black'>Men</Link></li>
                    <li><Link to="/shoes/women" className='hover:border-b-2 border-black'>Women </Link></li>
                    <li><Link to="/shoes/kids" className='hover:border-b-2 border-black'>Kids</Link></li>
                    
                </ul>
                <div className='py-4 md:p-0'>
                    <p  className='font-semibold md:text-base'>Contact Us:</p>
                    <div className='flex'>
                        <div className='flex flex-col items-baseline justify-center '>
                            {
                                contactItems.map((elem, id) => (
                                    <div className='flex mt-1' key={id}>
                                        <img src={elem.src} alt={elem.alt} className='w-4 h-4 md:w-6 md:h-6 inline mr-2 mb-1' />
                                        <p dangerouslySetInnerHTML={{ __html: elem.data }} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
            <p className='mt-4 self-center'>© {new Date().getFullYear()} <span>ShoeVista </span> | Jaswant Yadav</p>
        </footer>

    )
}

export default Footer