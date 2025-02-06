//@ts-nocheck
"use client"
import { useEffect, useState } from 'react';
import VendorCard from "@/components/cards/VendorCard";
import Pagination from "@/components/shared/Pagination";
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import ICarousel from '@/components/Icarousel';
import { StarFilledIcon } from '@radix-ui/react-icons';

import {  getSearchVendors, getVendorsByCategory } from "@/lib/actions/vendor.action";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import Spinner from '@/components/spinner';
import Loading from './Loading';

 const Page =  () => {
  const searchParams = useSearchParams();

  const query = searchParams.get('q');
  const vendorCategory = searchParams.get('category');


  const [searchTerm, setSearchTerm] = useState(query || '');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [category, setCategory] = useState(vendorCategory || '');
  const [loading, setLoading] = useState(true);


    

    useEffect(() => {
      const fetchData = async () => {

        
        const vendors:any|null = await getVendorsByCategory({Page:page,category});

        if (vendors) {
          setData(vendors);
          setLoading(false);
        }

        
        const vendorsearch:any|null = await getSearchVendors({Page:page, searchTerm});
        if (vendorsearch) {
         
          setDisplay(true);
        }
        }
  
      fetchData();
    }, [page,searchTerm,category]);
  
   // console.log(vendors);
    return (
        <>
       <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-3">
        {loading ? (
       <Loading  />
      ) : (
      
        display &&(

           data.map((vendor:any)=> (
          // <VendorCard key={vendor.vendor_id} _id={vendor.vendor_id} title={vendor.vendor_name} images={vendor.images} rating={vendor.rating} rating_count={vendor.rating_count} location={vendor.location} price={vendor.price} created_at={""} updated_at={""} />
    
    
      <Link href={''}  key={vendor.vendor_id}> 
          <div className="mb-2 flex rounded-2xl ">
                {/* image carousel */}
   
                 <ICarousel images={vendor.images}  href={`/${vendor.vendor_id}/${category}`} />
          </div>
          <div className='flex  justify-between'>
          <h2 className="font-bold">{vendor.location}</h2>
          <div className='flex  justify-between gap-x-1'>
          <StarFilledIcon className='mt-1'/>
          <span> {vendor.avgRating} <span className="font-normal text-slate-400">({vendor.totalRatings})</span></span>
          </div>
          </div>
          <h3 className="text-sm text-gray-500">{vendor.vendor_name}</h3>
          <div className="mt-1">
             {vendor.price ? (
                        <span className="font-bold">GH&#8373;{vendor.price}</span> 
      ) : (
            <span className="font-bold">Call For Price Info</span> 
       )
            }
          </div>
        </Link>
    

     ))
        )
    
      )}
    
    </div>

     {/* pagination */}
<div className=" mt-10 flex w-full items-center justify-center gap-2">
      <Button
       onClick={() => setPage(page - 1)} disabled={page === 1}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900"> {page}
        </p>
      </div>
      <Button
      onClick={() => setPage(page + 1)}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
   
    </div>
    
        </>
        
    )
}
export default Page
