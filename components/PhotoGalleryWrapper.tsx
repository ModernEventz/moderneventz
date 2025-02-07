// File: components/PhotoGalleryWrapper.tsx
"use client";
import React, { useState } from "react";
import PhotoGalleryModal from "./PhotoGalleryModal";

interface PhotoGalleryWrapperProps {
  images: string[];
  vendorName: string;
}

const PhotoGalleryWrapper: React.FC<PhotoGalleryWrapperProps> = ({
  images,
  vendorName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="my-4 text-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-rose-600 text-white rounded hover:bg-rose-700 transition"
      >
        Show More Photos
      </button>
      {isModalOpen && (
        <PhotoGalleryModal
          images={images}
          vendorName={vendorName}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PhotoGalleryWrapper;
