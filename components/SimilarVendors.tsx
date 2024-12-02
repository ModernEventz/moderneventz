// @ts-nocheck
"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import Link from "next/link"; 
import Image from "next/image";
import SimilarVendorCard from './SimilarVendorCard';
import ImageCarousel from './ImageCarousel';
import { Card } from './ui/card';
import ICarousel from './Icarousel';
import { StarFilledIcon } from '@radix-ui/react-icons';

import { useSearchParams } from 'next/navigation';

const SimilarVendors = ({vendors}) => {
  
  const searchParams = useSearchParams();
  const vendorCategory = searchParams.get('category');

  const [category, setCategory] = useState(vendorCategory || '');


  return (

    <>
    {
           vendors.map((vendor:any)=> (
           <div  key={vendor.vendor_id} className='flex flex-row'>      
            <Link href={`/${vendor.vendor_id}/${category}`}> 
            <div className="mb-2  rounded-2xl ">
                  {/* image carousel */}
     
                   <ICarousel images={vendor.images} />
            </div>
            <div className='flex  justify-between'>
            <h2 className="font-bold">{vendor.location}</h2>
            <div className='flex  justify-between gap-x-1'>
            <StarFilledIcon className='mt-1'/>
            <span> 4.89 <span className="font-normal text-slate-400">(128)</span></span>
            </div>
            </div>
            <h3 className="text-sm text-gray-500">{vendor.vendor_name}</h3>
            <div className="mt-1">
              <span className="font-bold">${vendor.price}</span> per night
            </div>
          </Link>
          </div>

))
   
    
}
  </>
  )
}

export default SimilarVendors
