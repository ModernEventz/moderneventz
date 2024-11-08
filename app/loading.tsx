// components/Loading.js
"use client"
import React, { useEffect, useState } from 'react';

export default function Loading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="loading-backdrop">
      <div className="loading-logo">
        <img src="/assets/images/site-logo.png" alt="Modern Eventz Logo" />
      </div>
    </div>
  );
}
