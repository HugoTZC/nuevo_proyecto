// src/components/Cover.tsx
import React from 'react';
import Image from 'next/image';

interface CoverProps {
  onConfirmClick: () => void;
}

const Cover: React.FC<CoverProps> = ({ onConfirmClick }) => {
  return (
    <section id="portada" className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/landing.jpg"
          alt="Cabaña Frontal"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-900" /> {/* Modern Gradient Overlay */}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto px-6">
        <div className="mb-6 uppercase tracking-[0.2em] text-amber-400 text-sm md:text-base font-bold animate-fade-in">
          Viaje de Año Nuevo en
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 animate-fade-in drop-shadow-2xl leading-tight">
          Cabaña <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Gerónimo’s</span>
        </h1>
        <p className="text-2xl md:text-3xl font-light mb-8 animate-fade-in delay-200 drop-shadow-lg text-gray-200 tracking-wide">
          Creel, Chihuahua &bull; 30 Dic - 2 Ene
        </p>

        <div className="flex flex-col md:flex-row gap-6 animate-fade-in delay-400">
          <button
            onClick={onConfirmClick}
            className="px-10 py-4 bg-amber-600 text-white font-bold rounded-full shadow-lg hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 hover:shadow-amber-500/50 uppercase tracking-wider text-sm"
          >
            Confirmar Asistencia
          </button>
          <a
            href="#descripcion"
            className="px-10 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm uppercase tracking-wider text-sm"
          >
            Ver Detalles
          </a>
        </div>
      </div>
    </section>
  );
};

export default Cover;
