import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { SignedOut,SignedIn } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="bg-[#b4245d] p-4 text-white">
    <div className="flex items-center justify-between">
      <div className='flex flex-row gap-x-5'>
    <Link href="/">
       
       <Image
         src="/assets/images/site-logo.png"
         alt="Modern Eventz Logo"
         width={50} // Adjust size as needed
         height={50}
       />
   
   </Link>
   <h1 className="text-2xl font-bold mt-3"><Link href="/">Modern Eventz</Link></h1>
    </div>
   
      <nav>

        
      <SignedIn>
        <button className="rounded-full border border-white bg-transparent px-4 py-2 text-white">
        <Link href="/home">Dashboard</Link>
          </button>
        </SignedIn>
        <SignedOut>
        <Link href="/sign-in"className="mr-4 font-semibold">Log In</Link>
        <Link href="/sign-up" className='font-semibold'> <button className=" rounded bg-white px-4 py-2 text-rose-600">Sign up</button></Link> 
        </SignedOut>
      </nav>
    </div>
  </header>
  )
}

export default Header