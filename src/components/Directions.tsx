// src/components/Directions.tsx
import React from 'react';
import Image from 'next/image';

const Directions: React.FC = () => {
  return (
    <section id="ubicacion" className="py-16 md:py-24 px-6 md:px-12 bg-slate-800 text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-amber-400 mb-4">Ubicación</h2>
          <p className="text-xl text-gray-300">Fácil acceso en el corazón de Creel.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl border border-slate-600/50">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Cómo llegar</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                La cabaña está situada en una zona tranquila pero accesible.
                Sigue las indicaciones hacia el centro de Creel y toma la desviación hacia las cabañas.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start"><span className="text-amber-500 mr-3">📍</span> <strong>Dirección:</strong> Calle Principal #123, Creel, Chih.</li>
                <li className="flex items-start"><span className="text-amber-500 mr-3">🚗</span> <strong>Estacionamiento:</strong> Disponible en la propiedad.</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700">
              <p className="italic text-gray-400 text-sm">
                "La ubicación es perfecta, cerca de todo pero con la privacidad necesaria para descansar."
              </p>
            </div>
          </div>

          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-600 group">
            <Image
              src="/images/map.png"
              alt="Mapa de Ubicación"
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white font-bold">Cabaña Gerónimo's</p>
              <p className="text-gray-300 text-sm">Vista del Mapa</p>
            </div>
          </div>
        </div>

        <div className="mt-12 w-full h-96 rounded-2xl overflow-hidden shadow-2xl border border-slate-600 filter grayscale hover:grayscale-0 transition-all duration-500">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.6789!2d-107.635!3d27.752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQ1JzEwLjgiTiAxMDfCsDM4JzEwLjAiVw!5e0!3m2!1ses!2smx!4v1635000000000!5m2!1ses!2smx"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="Mapa de Google"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Directions;
