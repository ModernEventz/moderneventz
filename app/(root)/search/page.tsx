// pages/search.js
"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {  getVendorsByCategoryandcity } from "@/lib/actions/vendor.action";
import Link from 'next/link';
import ICarousel from '@/components/Icarousel';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { SkeltonCard } from '@/components/SkeletonCard';

export default function SearchResults() {
    const searchParams = useSearchParams();
    const vendorType = searchParams.get('vendorType');  
    const city = searchParams.get('city');

    const vendorCategory = searchParams.get('category');

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  
  const [category, setCategory] = useState(vendorCategory || '');

  useEffect(() => {
    if (vendorType && city) {
      const fetchData = async () => {
        setLoading(true);
        const vendors:any|null = await getVendorsByCategoryandcity({Page:page,vendorType,city});

     
        if (vendors) {
            setResults(vendors);
         
        } else {
            console.error('Error fetching data');
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [vendorType, city,page]);

  if (loading) {
    return (
    <>
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
     <SkeltonCard />
    <SkeltonCard />
    <SkeltonCard />
    <SkeltonCard />;
    </div>
    </> )
  }

  return (
    <div >
      <h2 className='text-2xl font-bold'>Search Results for {vendorType} in {city}</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <>
           <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-3">  
          {results.map((result:any) => (
      
          <Link href={''} key={result.vendor_id}  > 
          <div className="mb-2 flex rounded-2xl ">
                {/* image carousel */}
   
                 <ICarousel images={result.images}  href={`/${result.vendor_id}/${category}`} />
          </div>
          <div className='flex  justify-between'>
          <h2 className="font-bold">{result.location}</h2>
          <div className='flex  justify-between gap-x-1'>
          <StarFilledIcon className='mt-1'/>
          <span> {result.avgRating} <span className="font-normal text-slate-400">({result.totalRatings})</span></span>
          </div>
          </div>
          <h3 className="text-sm text-gray-500">{result.vendor_name}</h3>
          <div className="mt-1">
            <span className="font-bold">GH&#8373;{result.price}</span>
          </div>
        </Link>

          ))}
     </div> 
        </>
      )}

      
       
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
    

    </div>



  );
}
