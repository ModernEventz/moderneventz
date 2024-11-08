import Footer from '@/components/Footer'
import Header from '@/components/Header'

import React from 'react'

const page = () => {
  return (
    <div>
          <Header />
          <main className="relative">
      <img src="/assets/images/aboutUs_image.webp" alt=" wedding ceremony with floral decorations" className="w-full h-[300px] object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">About Us</h2>
      </div>
    </main>

    <div className="md:ml-8">
        <h2 className="m-5 text-center text-3xl font-bold">Who we are</h2>
        <p className="mb-6 text-lg text-slate-500">
        Modern Eventz helps you find the best vendors for your wedding and funerals. From photographers to florists, we have a curated selection of professionals to make your special day perfect.
        </p>

        <p className="mb-6 text-lg text-slate-500">
        With our comprehensive suite of planning tools and services, we make it easy for couples to plan their wedding and help them enjoy every part of the journey.
        </p>
       
      </div>

      <div className="md:ml-8">
        <h2 className="m-5 text-center text-3xl font-bold">What we offer</h2>
        <p className="mb-6 text-lg text-slate-500">
       Here at Modern Eventz, we connect wedding couples to as many vendors as we can, so that they can compare prices and find the ones that best suite their budget.   
        </p>

        <p className="mb-6 text-lg text-slate-500">
       We also provide a one stop shop for all your wedding and funerals accessories. Whether you are looking for the most elegant
       Gown, suit or bracelets, you name it... we got you covered. </p>
       
      </div>
          <Footer />
    </div>
  )
}

export default page