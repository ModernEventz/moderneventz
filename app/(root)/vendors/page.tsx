import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'

import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { UserFilters } from '@/constants/filters'
import { StarFilledIcon } from '@radix-ui/react-icons';
import { SearchParamsProps } from '@/types'
import Link from 'next/link'
import type { Metadata } from 'next';
import vendorTypes from '@/constants/vendorTypes'
import { currentUser } from "@clerk/nextjs";
import { getHiredVendorById } from "@/lib/actions/hiredVendors.action";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card, CardContent, CardHeader, CardTitle,

} from "@/components/ui/card"
import NoResult from '@/components/shared/NoResult'
import ICarousel from '@/components/Icarousel'


export const metadata: Metadata = {
  title: 'Vendors | Save TheDate',
}

async function GetData() {
  // Fetch data from your API here.
  const user = await currentUser();
  const hiredVendor :any|null = await getHiredVendorById ({profile_Id:user?.id});
  return hiredVendor;
}
const Page = async ({ searchParams }: SearchParamsProps) => {
  
  const hiredVendors = await GetData()

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">VENDORS</h1> 

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar 
            route="/vendors"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for amazing minds"
            otherClasses="flex-1"
          />

          <Filter
            filters={UserFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
      </div>

      <Tabs defaultValue="vendors" >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="vendors" className='rounded-lg bg-white text-lg font-semibold shadow-md '>Vendors</TabsTrigger>
        <TabsTrigger value="hired_vendors" className='rounded-lg bg-white text-lg font-semibold shadow-md'>My Hired Vendors<span className='ml-8 text-slate-600'>{hiredVendors.length}</span></TabsTrigger>
      </TabsList>
      <TabsContent value="vendors">
        <Card>
          <CardHeader>
            <CardTitle>VENDORS</CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-2">
          <Card className='mt-5'>
      <section className="grid grid-cols-1 gap-4  md:grid-cols-3">
        {vendorTypes.length > 0 ? (
          vendorTypes.map((vendor)=> (
            <UserCard key={vendor.id} vendor={vendor} />
          ))
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
      </Card>
          </CardContent>
       
        </Card>
      </TabsContent>
      <TabsContent value="hired_vendors">
      <Card>
         
         <CardContent className="space-y-2">
         <section className="mt-12 flex flex-wrap gap-4">
       {hiredVendors.length > 0 ? (
         hiredVendors.map((vendor)=> (
          <Link href={''}  key={vendor.vendor_id}> 
          <div className="mb-2 flex rounded-2xl ">
                {/* image carousel */}
   
                 <ICarousel images={vendor.images}  href={`/${vendor.vendor_id}`} />
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
            <span className="font-bold">${vendor.price}</span> per night
          </div>
        </Link> 
         ))
       ) : (
         <NoResult 
           title="No Hired vendor"
           description="It looks like there are no hired vendors."
           link="/vendors"
           linkTitle="Look for a vendor"
         />
       )}
     </section>
         </CardContent>
       
       </Card>
      </TabsContent>
    </Tabs>
 

      
    </>
  )
}

export default Page