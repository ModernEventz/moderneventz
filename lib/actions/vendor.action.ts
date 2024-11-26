// @ts-nocheck
"use server"

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers';
import { GetFilterVendorsByLocationParams, GetSearchVendorsPaginationParams, GetVendorByIdParams, GetVendorsByCategoryandcityPaginationParams, GetVendorsByCategoryNoPaginationParams, GetVendorsByCategoryPaginationParams} from './shared.types';







export async function getVendorsByCategory(params:  GetVendorsByCategoryPaginationParams) {
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
      
        const { Page,category } = params;
        const { data: vendors } = await supabase
  .from('vendors')
  .select()
  .ilike('category', `%${category}%`)
  .range((Page - 1) * 10, Page * 10 - 1)
 
  const { data: reviews } = await supabase
  .from('reviews')
  .select();

// Combine the data from both tables based on the vendor_id
const combinedData = vendors.map((vendor) => {
  const Vreviews = reviews.filter((review) => review.vendor_id === vendor.vendor_id);

  const totalRatings = Vreviews.length;

  const avgRating = totalRatings
  ? Vreviews.reduce((acc, r) => acc + r.rating, 0) / totalRatings
  : 0;
  return  {  ...vendor,
  avgRating: avgRating.toFixed(2),
  totalRatings,
  }
});
    
 console.log(combinedData);

          return (combinedData);
 

       //   return (vendors);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }



  
export async function getVendorsByCategoryandcity(params: GetVendorsByCategoryandcityPaginationParams) {
  // eslint-disable-next-line no-useless-catch
  try {
     
      const supabase = createServerComponentClient ({cookies});
    
      const { Page,city,vendorType } = params;
      const { data: vendors } = await supabase
.from('vendors')
.select()
.ilike('category', `%${vendorType}%`)
.ilike('location', `%${city}%`)
.range((Page - 1) * 10, Page * 10 - 1)

const { data: reviews } = await supabase
.from('reviews')
.select();

// Combine the data from both tables based on the vendor_id
const combinedData = vendors.map((vendor) => {
const Vreviews = reviews.filter((review) => review.vendor_id === vendor.vendor_id);

const totalRatings = Vreviews.length;

const avgRating = totalRatings
? Vreviews.reduce((acc, r) => acc + r.rating, 0) / totalRatings
: 0;
return  {  ...vendor,
avgRating: avgRating.toFixed(2),
totalRatings,
}
});
  
console.log(combinedData);

        return (combinedData);


     //   return (vendors);

  } catch (error) {
    console.log(error);
    throw error;
  }
}


  export async function getSearchVendors(params: GetSearchVendorsPaginationParams) {
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
      
        const { Page,searchTerm } = params;
        const { data: vendors } = await supabase
  .from('vendors')
  .select()
  .ilike('vendor_name', `%${searchTerm}%`)
  .range((Page - 1) * 10, Page * 10 - 1)
 
const { data: vendorImages } = await supabase
  .from('vendor_images')
  .select();

// Combine the data from both tables based on the vendor_id
const combinedData = vendors.map((vendor) => {
  const images = vendorImages.filter((image) => image.vendor_id === vendor.vendor_id);
  return { ...vendor, images };
});

 console.log(combinedData);

          return (combinedData);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export async function getVendorsByCategoryNoPagination(params: GetVendorsByCategoryNoPaginationParams ) {
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
        const { category } = params;
       
        const { data: vendors } = await supabase
  .from('vendors')
  .select()
  .ilike('category', `%${category}%`)
  .range(0,5)

  console.log(vendors);
   return{vendors}
 
// const { data: vendorImages } = await supabase
 // .from('vendor_images')
 // .select();

// Combine the data from both tables based on the vendor_id
// const combinedData = vendors.map((vendor) => {
// const images = vendorImages.filter((image) => image.vendor_id === vendor.vendor_id);
 // return { ...vendor, images };
// });

// console.log(combinedData);

  //        return (combinedData);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  
  export async function getFilterByVendorsLocation(params: GetFilterVendorsByLocationParams ) {
    // eslint-disable-next-line no-useless-catch
    try {
       
        const supabase = createServerComponentClient ({cookies});
      
        const { Page,location,category } = params;
        const { data: vendors } = await supabase
  .from('vendors')
  .select()
  .ilike('category', `%${category}%`)
  .ilike('location', `%${location}%`)
  .range((Page - 1) * 10, Page * 10 - 1)
 
const { data: vendorImages } = await supabase
  .from('vendor_images')
  .select();

// Combine the data from both tables based on the vendor_id
const combinedData = vendors.map((vendor) => {
  const images = vendorImages.filter((image) => image.vendor_id === vendor.vendor_id);
  return { ...vendor, images };
});

 console.log(combinedData);

          return (combinedData);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export async function getVendorById(params: GetVendorByIdParams) {
    try {
     
      const supabase = createServerComponentClient ({cookies});
      const { vendorId } = params;
      
// Fetch data from the vendors table
const { data: vendorsData, error: vendorsError } = await supabase
.from('vendors')
.select('*')
.eq('vendor_id', vendorId);

if (vendorsError) {
console.error('Error fetching vendor data:', vendorsError.message);
} else {
const vendor = vendorsData[0]; // Assuming there is only one vendor with the given vendor_id






if (vendorsError) {
  console.error('Error fetching images data:', vendorsError);
} else {

  // Fetch data from the reviews table
const { data: reviewsData, error: reviewsError } = await supabase
.from('reviews')
.select('*')
.eq('vendor_id', vendorId);

if (reviewsError) {
  console.error('Error fetching reviews data:', reviewsError.message);
}
else {
  const {profile_id} = vendor;
  console.log('profile id2:', profile_id);

  const { data: profilesData, error: profilesError } = await supabase
.from('profiles')
.select('*')
.eq('profile_id',profile_id );
   
if (profilesError) {
  console.error('Error fetching profiles data:', profilesError.message);
}
 else {

  
  
  const combinedData = {
    ...vendor,
   
    reviews:reviewsData,
    profile:profilesData
  };
   
 
  console.log('Combined data for vendor with vendor_id 1:', combinedData);

  return  (combinedData);

 }



}
}
       
    } 
  }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

 
