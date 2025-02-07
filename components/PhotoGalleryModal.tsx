// File: components/PhotoGalleryModal.tsx
// File: components/PhotoGalleryModal.tsx
"use client";
import React from "react";
import Image from "next/image";

interface PhotoGalleryModalProps {
  images: string[];
  vendorName: string;
  onClose: () => void;
}

const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  images,
  vendorName,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative max-w-5xl mx-auto p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-1 text-white text-3xl font-bold"
        >
          &times;
        </button>
        {/* Image Grid with vertical scrolling for smaller screens */}
        <div className="max-h-[80vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="w-full h-64 relative">
              {/* Using native <img> tag for testing, switch back to Next.js <Image> once confirmed */}
              <img
                src={url}
                alt={`${vendorName} photo ${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
              />
              {/*
              <Image
                src={url}
                alt={`${vendorName} photo ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
              */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGalleryModal;
