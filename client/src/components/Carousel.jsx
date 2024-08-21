import React from 'react'
import Slider from "react-slick";
import { arr } from "../assets/imageExport"


const Carousel = () => {
    var settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        cssEase: "ease-in"
    };
    return (
        <div className='max-w-[90%] mx-auto'>
            <Slider {...settings}>
                <div>
                    <img src={arr[0]} alt="slides" />
                </div>
                <div>
                    <img src={arr[1]} alt="slides" />
                </div>
                <div>
                    <img src={arr[2]} alt="slides" />
                </div>
                <div>
                    <img src={arr[3]} alt="slides" />
                </div>
                <div>
                    <img src={arr[4]} alt="slides" />
                </div>
            </Slider>
        </div>
    )
}

export default Carousel
