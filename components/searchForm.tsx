// components/SearchForm.js
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { gCities } from '@/constants';

export default function SearchForm() {
  const [vendorType, setVendorType] = useState('');
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure both fields are selected
    if (vendorType && city) {
      router.push(`/search?vendorType=${vendorType}&city=${city}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row w-full max-w-3xl">
        
        {/* Vendor Type Dropdown */}
        <select
          className="mb-2 md:mb-0 md:mr-2 p-3 rounded-[6px] text-black w-full md:w-1/3"
          value={vendorType}
          onChange={(e) => setVendorType(e.target.value)}
          required
        >
          <option value="" disabled>Select vendor type</option>
          <option value="venue">Venue</option>
          <option value="caterer">Caterer</option>
          <option value="decor">Decoration</option>
          <option value="photographer">Photographer</option>
          <option value="mc">Mc</option>
          <option value="dj">Dj</option>
          <option value="foodanddrinks">Water&Drinks</option>
          <option value="makeup">Makeup</option>
          <option value="rings">Rings</option>
          <option value="transport">Car Rentals</option>
          {/* Add more vendor types as needed */}
        </select>

        {/* City Dropdown */}
        <select
          className="mb-2 md:mb-0 md:mr-2 p-3 rounded-[6px] text-black w-full md:w-1/3"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        >
        <option value="">Choose a City</option>
        {gCities.map((gcity, index) => (
          <option key={index} value={gcity}>
            {gcity}
          </option>
        ))}

          {/* Add more cities as needed */}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="font-poppins text-white border-2 border-white bg-[#b4245d] h3-bold px-4 py-2 rounded-[6px]"
        >
          Get Started
        </button>
      </div>
    </form>
  );
}
