// @ts-nocheck
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Theme from './Theme'
import MobileNav from './MobileNav'
// import GlobalSearch from '../search/GlobalSearch'

const 
Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.png"
          width={23}
          height={23}
          alt="modern eventz"
        />

        <p className="h2-bold font-spaceGrotesk text-gray-800 dark:text-light-900 max-sm:hidden">Modern <span className="text-[#b4245d]">Eventz</span></p>
      </Link>

     {/* <GlobalSearch /> */}

      <div className="flex-between gap-5">
        <Theme />

        <SignedIn>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10'
              },
              variables: {
                colorPrimary: '#F5385D'
              }
            }}
          />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
