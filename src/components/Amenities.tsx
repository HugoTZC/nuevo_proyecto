// src/components/Amenities.tsx
import React from 'react';

const amenitiesList = [
  { name: 'Estacionamiento privado', icon: '🅿️' },
  { name: 'Cocina equipada', icon: '🍳' },
  { name: 'Minibar', icon: '🍾' },
  { name: 'Internet Starlink (~150 Mbps)', icon: '🛰️' },
  { name: 'TV por internet', icon: '📺' },
  { name: 'Minisplits frío/calor', icon: '❄️🔥' },
  { name: 'Asadores y palapa', icon: '🍖' },
  { name: 'Fogateros', icon: '🔥' },
  { name: 'Área de juegos', icon: '🎲' },
  { name: 'Área para senderismo cercana', icon: '🚶‍♀️' },
  { name: 'Chimenea menonita', icon: '🪵' },
  { name: 'Sala y comedor', icon: '🛋️' },
  { name: 'Barra con bancos', icon: '🥂' },
  { name: 'Porche con sillas', icon: '🪑' },
];

const Amenities: React.FC = () => {
  return (
    <section id="amenidades" className="py-16 md:py-24 px-6 md:px-12 bg-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-amber-400 mb-4">La cabaña cuenta con las siguientes comodidades</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Todo lo que necesitamos para despreocuparnos y relajarnos en la Sierra Tarahumara.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "🔥", title: "Chimenea", desc: "Para cachondear en las noches frías" },
            { icon: "🍳", title: "Cocina Completa", desc: "Pa los huevitos con chorizo" },
            { icon: "📡", title: "Starlink WiFi", desc: "Conexión pal Feis y el Netflix" },
            { icon: "🍖", title: "Asador & Palapa", desc: "Se va a armar, o no se va a armar, la carnia asada?" },
            { icon: "🚿", title: "Agua Caliente", desc: "Pa no hueler a fundillo" },
            { icon: "🚗", title: "Estacionamiento", desc: "Amplio, porque es la sierra" },
            { icon: "🌲", title: "Vistas al Bosque", desc: "Naturaleza a tu alrededor" },
            { icon: "❄️", title: "Calefacción", desc: "Pa no tener las patas frias" },
          ].map((item, index) => (
            <div key={index} className="glass-card p-8 rounded-xl text-center group">
              <span className="text-5xl mb-6 block transform group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
