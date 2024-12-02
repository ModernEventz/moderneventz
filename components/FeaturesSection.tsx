
"use client";
import { Suspense, use } from "react";
import Link from "next/link"; 
import { MapFilterItems } from "./MapFilterItems";
import { SkeltonCard } from "./SkeletonCard";
import { getVendorsByCategoryNoPagination } from "@/lib/actions/vendor.action";
import { NoItems } from "./NoItem";
import vendorTypes from "@/constants/vendorTypes";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import UserCard from "./cards/UserCard";
import CarouselCards from "./carouselCards";


function FeaturesSection({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
   
  };
  
}) {


 
 
  return (
    <div className="font-poppins bg-[#b4245d] text-[#EFEFED] ">
      <p className="h1-bold p-5 text-white">Vendor Categories</p>

    <CarouselCards/>
    </div>
  );
}





export default FeaturesSection;
