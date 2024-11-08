"use client"
import Filter from '@/components/shared/Filter'

import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { Toaster } from '@/components/ui/toaster'
import { UserFilters } from '@/constants/filters'
import { Button } from "@/components/ui/button";

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

    return (
      <main className="background-light850_dark100 relative">
      
        
        <div className="mb-5 mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">

        <Link href="" onClick={()=> router.back()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
      </Link>

          <LocalSearchbar 
            route="/community"
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
       
      {children}  
         
       
         {/* <RightSidebar /> */}
       
  
        <Toaster />

      </main>
    )
  }
  
  export default Layout