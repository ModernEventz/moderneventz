"use client"
import {useState,useEffect} from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";

export default function PlaceGallery({vendorImages,name}) {

  const [showAllPhotos,setShowAllPhotos] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

  
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setShowAllPhotos(true)
  };


  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 z-50 min-h-screen bg-black text-white">
        <div className="grid gap-4 bg-black p-8">
          <div className="flex justify-between" >
            <h2 className="mr-48 text-3xl">Photos of {name}</h2>
            <button onClick={() => setShowAllPhotos(false)} className=" flex gap-1 rounded-2xl bg-black px-4 py-2 text-white shadow shadow-black">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              Close photos
            </button>
          </div>
          {vendorImages.map((image, index) => (
             
              <>
             <div>
             
               <img src={image} key={index}    alt="" className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy"/>
        
             </div>
             </>
               ))}
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="relative">
      <div className="grid grid-cols-[2fr_1fr] gap-2 overflow-hidden rounded-2xl">
        <div>
          {vendorImages?.[0] && (
            <div>
              <Image onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={vendorImages[0]} alt="" width={600} height={300}/>
            </div>
          )}
        </div>
        <div className="grid">
          {vendorImages?.[1] && (
            <Image onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={vendorImages[1]} alt="" width={300} height={50}/>
          )}
          <div className="overflow-hidden">
            {vendorImages?.[2] && (
              <Image onClick={() => setShowAllPhotos(true)} className="relative top-2 aspect-square cursor-pointer object-cover" src={vendorImages[2]} alt="" width={300} height={50}/>
            )}
          </div>
        </div>
      </div>
      <button onClick={() => scrollToTop()}className="absolute bottom-2 right-2 flex gap-1 rounded-2xl bg-white px-4 py-2 shadow  shadow-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
        </svg>
        Show more photos
      </button>
    </div>
     

   
   </>
  );
}