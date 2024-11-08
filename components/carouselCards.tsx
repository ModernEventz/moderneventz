// components/CarouselCards.js
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import vendorTypes from '@/constants/vendorTypes'

// Sample vendor data
const vendors = [
  { id: 1, title: "Vendor 1", image: "/path/to/image1.jpg", url: "/vendor1" },
  { id: 2, title: "Vendor 2", image: "/path/to/image2.jpg", url: "/vendor2" },
  { id: 3, title: "Vendor 3", image: "/path/to/image3.jpg", url: "/vendor3" },
  // Add more vendor objects as needed
];


// Custom Next Arrow component
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-arrow slick-next`}
        style={{
          ...style,
      display: "block",
          
          right: "25px",
          zIndex: 10,
          padding: "10px",
          borderRadius: "50%",
        }}
        onClick={onClick}
      >
        <span className="text-white">Next</span>
      </div>
    );
  };
  
  // Custom Prev Arrow component
  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick-arrow slick-prev`}
        style={{
          ...style,
          display: "block",
         
          left: "-5px",
          zIndex: 10,
          padding: "10px",
          borderRadius: "50%",
        }}
        onClick={onClick}
      >
        <span className="text-white">Prev</span>
      </div>
    );
  };
  
  
const CarouselCards = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {vendorTypes.map((vendor) => (
          <div key={vendor.id} className="p-4">
            <Card vendor={vendor} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const Card = ({ vendor }) => {
  return (
    <div className="">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <Link href={vendor.url} className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]">
          <article className="light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8 hover:border-2 hover:border-solid hover:border-rose-500 hover:bg-white hover:text-rose-500 ">
            <Image
              src={vendor.image}
              alt="user profile picture"
              width={100}
              height={100}
              className="rounded-full border-2 border-solid border-white "
            />
            <div className="mt-4 text-center">
              <h3 className="h3-bold line-clamp-1 text-white">
                {vendor.title}
              </h3>
              <p className="body-regular text-dark500_light500 mt-2">
                {vendor.title}
              </p>
            </div>
          </article>
        </Link>
      </div>
    </div>
  );
};

export default CarouselCards;
