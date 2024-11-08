"use server"
import Link from "next/link"; 
import Image from "next/image";

import {Divider} from "@nextui-org/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {  getVendorById, getVendorsByCategoryNoPagination } from "@/lib/actions/vendor.action";
import { ParamsProps } from "@/types";
import PlaceGallery from "@/components/PlaceGallery";
import BookingWidget from "@/components/BookingWidget";
import MessageVendor from "@/components/messageVendor";
import RatingDetails from "@/components/RatingDetails";
import { Button } from "@/components/ui/button";
import ShowAllReviews from "@/components/ShowAllReviews";
import WriteReview from "@/components/WriteReview";
import { UserProfile, currentUser } from '@clerk/nextjs';
// import VendorStats from "@/components/VendorStats";
import { getTimestamp } from '@/lib/utils'
import SimilarVendors from "@/components/SimilarVendors";
import MarkAsHired from "@/components/MarkAsHired";


const generateAvatar = (name) => {
  const initials = name ? name[0].toUpperCase() : '?'; // Use '?' if name is not provided
  const avatarUrl = `https://ui-avatars.com/api/?name=${initials}`;

  return <Image src={avatarUrl} alt={`${initials} Avatar`} />;
};


const Page = async ({ params }: ParamsProps) => {

   const vendors:any|null = await getVendorsByCategoryNoPagination({category: params.id[1]});
    const {vendor_name,location,price,images,rating,rating_count,description,reviews,profile} = await getVendorById({ vendorId: params.id[0]})
    const user = await currentUser();
    const profileImage = profile[0].avatar;
    const userName =  profile[0].username;
    
   
   
    
    return (
  <>
      
      
    <div className="-mx-8 mt-4 bg-gray-100 px-8 pt-8">
      <h1 className="text-3xl">{vendor_name }</h1>
      <div className="flex flex-row justify-between">
      <a className="my-2 block font-semibold underline" target="_blank" href={`https://maps.google.com/?q=${location}`}>{location}</a>
      <MarkAsHired vendor_id={params.id[0]} vendor_name={vendor_name} location={location} price={price} rating={rating} rating_count={rating_count} description={description} images={images} profile_id={user?.id} category={ params.id[1]}/> 
      </div>
 
   <PlaceGallery vendorImages={images} name={vendor_name}/>

   <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
           {description}
            <p className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">

            </p>  
          </div>
          { rating ?
     <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
    
       <dt className="sr-only">Reviews</dt>
      
       <dd className="text-rose-600 flex items-center dark:text-rose-400">
         <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-1 stroke-current dark:stroke-rose-500">
           <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
         
         <span>{rating} <span className="text-slate-400 font-normal">({rating_count})</span></span>
         
       </dd>
       
       
     
         
 
         
           
           
       <dt className="sr-only">Location</dt>
       <dd className="flex items-center">
         <svg width="2" height="2" aria-hidden="true" fill="currentColor" className="mx-3 text-slate-300">
           <circle cx="1" cy="1" r="1" />
         </svg>
         <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="mr-1 text-slate-400 dark:text-slate-500" aria-hidden="true">
           <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
           <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
         </svg>
      {location}
       </dd>
       
 
     </dl>
     :
     <dl className="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
       <dt className="sr-only">Reviews</dt>
      
       <dd className="text-rose-600 flex items-center dark:text-rose-400">
         
         
         <span >
        
      {location} 
           <span className="text-slate-400 font-normal"></span></span>
         
       </dd>
            
       <dt className="sr-only">Location</dt>
       <dd className="flex items-start">
       
       </dd>
       
 
     </dl>
 
 }
        </div>
        <div>
        {  <BookingWidget vendorId={params.id[0]}profile_id={profile[0].profile_id} price={price} vendorName={vendor_name} username={`${user?.firstName} ${user?.lastName}`}  email={user?.emailAddresses[0].emailAddress} path={`/vendors/${params.id}`} />  }
        </div>
      </div>

     
   
      <div className="-mx-8 border-t bg-white p-8">
        
     
        <div className="flex flex-row justify-between">

          <h2 className="text-2xl font-semibold">  {reviews.length} Reviews</h2>
          <WriteReview vendorId={params.id[0]} userimage={user?.imageUrl}  username={`${user?.firstName} ${user?.lastName}`}/>
        </div>
        <div className="grid grid-cols-2 gap-4">
        {reviews.map((review:any, index:any) => {
          
          if (index > 3) {
            return true; // Break out of the loop
          }
             
             return (
              <>
              
              <div  
               className="mb-4 mt-2 text-sm leading-5 text-gray-700 " key={review.review_id}>{<RatingDetails reviews={review} />}</div> 
            
             
                 { index === 3 && (
                   
               <div>



              <ShowAllReviews Reviews={reviews}/>

                </div> )
                
        
                }
                </>
                 )
              })}
              </div>
                     
      </div>
    
      </div>

     {/* divider */}
      <div className="my-4 border-t border-gray-300"></div>

      <p className=" my-10 text-2xl font-bold">Meet your vendor</p>
      
      <div className= "flex  w-full flex-col pt-5   ">
        {/* Parent div */}
        <div className="flex w-full flex-col bg-gray-100 ">
       <div className="my-10 ml-10 flex h-72 w-4/5 flex-row justify-evenly rounded-2xl bg-white p-4 shadow sm:w-4/5 md:w-4/5">
        {/* left div */}
        <div className='flex flex-col'>
           {/*  avatar */}
  <Link href={`profile/${profile[0].profile_id}`}>

          {profileImage ? (
             <Avatar className="my-5 h-32 w-32">
             <AvatarImage src={profileImage} alt={`${userName} Avatar`} />   
           </Avatar>
       
      ) : (
        generateAvatar(userName)
      )}

      {/* Name of host */}

      <p className=" my-10 text-2xl font-bold ">{userName}</p>
   </Link>

        </div>
        

        {/* Right div */}
        <div className='flex flex-col'>
        <span className='mx-5 my-1 text-2xl font-bold'>{reviews.length}  </span>
        <p>Reviews</p>
        
       {/* divider */}
       <div className="my-4 border-t border-gray-300"></div>

       <span className='mx-5 my-1 text-2xl font-bold'>{reviews.length}  </span>
        <p>Ratings</p>

          
       {/* divider */}
       <div className="my-4 border-t border-gray-300"></div>

       <p className='text-2xl font-bold'> Joined</p>
       <p className='text-sm '>  {getTimestamp(new Date(profile[0].created_at))}</p>
        </div>

        
        </div> 

        {/* vendor details */}

        <div>
        <div className="flex flex-row"><p className=" ml-10 text-lg font-bold">Location:</p><p className="ml-2">{profile[0].location}</p></div>
         <div className="flex flex-row"> <p className=" ml-10 text-lg font-bold"> Number: </p><p className="ml-2">{profile[0].mobile_number} </p></div>
          </div>
        </div>
       {/* message Vendor */}
        <div>
      {/*  < MessageVendor vendorId={params.id} price={price} vendorName={vendor_name} username={`${user?.firstName} ${user?.lastName}`}  email={user?.emailAddresses[0].emailAddress} path={`/vendors/${params.id}`}/> */ }
        </div>
        </div>   
       
        <div className="my-4 border-t border-gray-300"></div>

       
         
        { /*   <p className=" my-10 text-2xl font-bold">Similar Vendors</p>
      <div className='flex flex-row overflow-x-auto'   >
             <SimilarVendors vendors={vendors}/>
             </div> */ }
           
          
    
       

      </>
        
    )
}
export default Page