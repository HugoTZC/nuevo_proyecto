// src/components/Photos.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const allImages = [
  '/images/front.png',
  '/images/outside.png',
  '/images/cabana.png',
  '/images/fromfar.png',
  '/images/bedroom.png',
  '/images/dinning.png',
  '/images/room2.png',
  '/images/landing.jpg',
];

const Photos: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev === null ? 0 : (prev + 1) % allImages.length));
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev === null ? 0 : (prev - 1 + allImages.length) % allImages.length));
    }
  };

  return (
    <section id="fotos" className="py-16 md:py-24 px-6 md:px-12 bg-slate-900 text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-amber-400 mb-4">Fotos del Lugar</h2>
          <p className="text-xl text-gray-400">Disponibles en la pagina de la reservacion.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {allImages.map((src, index) => (
            <div
              key={index}
              className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={src}
                alt={`Foto de la cabaña ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white text-4xl font-light">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={closeLightbox}>
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-amber-400 z-50"
            onClick={closeLightbox}
          >
            &times;
          </button>

          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-6xl hover:text-amber-400 z-50 hidden md:block"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            &#8249;
          </button>

          <div className="relative w-full max-w-6xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={allImages[selectedImageIndex]}
              alt={`Foto ampliada ${selectedImageIndex + 1}`}
              layout="fill"
              objectFit="contain"
              quality={100}
              className="rounded-md"
            />
          </div>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-6xl hover:text-amber-400 z-50 hidden md:block"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            &#8250;
          </button>

          <div className="absolute bottom-4 left-0 right-0 text-center text-white text-lg">
            {selectedImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Photos;
