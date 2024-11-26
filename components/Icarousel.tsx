"use client"
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Dots = ({ images:any, currentIndex, setCurrentIndex }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {images.map((_, index) => (
        <div
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-2 h-2 rounded-full cursor-pointer ${
            currentIndex === index ? "bg-gray-800" : "bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
};

const ICarousel = ({ images,href }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <Carousel className="relative w-full max-w-xs group">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
          <Link href={href}> <div >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                className="aspect-square rounded-2xl object-cover"
                width={350}
                height={250}
              />
            </div> </Link> 
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-75 p-2 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-75 p-2 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <Dots images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
    </Carousel>
  );
};

export default ICarousel;
