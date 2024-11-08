import React from 'react'
import Image from 'next/image'
import Link from "next/link";
import StylishButton from './stylish-button';
import SearchForm from './searchForm';

const HeroSection = () => {
  return (
    <div className="font-poppins">
   

    <main className="relative">
      <img src="/assets/images/africanHero_Image.webp" alt=" wedding ceremony with floral decorations" className="w-full h-[600px] object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Modern Eventz,We Make it Happen </h2>
        <p className="text-xl mb-8">Find the best wedding vendors with thousands of trusted reviews</p>
        <SearchForm/>
      </div>
    </main>

  
  </div>
  )
}

export default HeroSection