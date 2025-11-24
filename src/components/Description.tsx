// src/components/Description.tsx
import React from 'react';

const Description: React.FC = () => {
  return (
    <section id="descripcion" className="py-16 md:py-24 px-6 md:px-12 bg-slate-900 text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="max-w-7xl mx-auto text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Un Refugio <br /> <span className="text-amber-500">Rústico & Moderno</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Mi gente, la idea es que nos hospedemos en las cabañas Geronimo's, diseñadas para desconectar.
              Nuestra elección son dos cabañas espaciosas con capacidad para <strong>10 a 12 personas</strong>,
              perfectamente equipada para garantizar confort y convivencia.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed italic border-l-4 border-amber-500 pl-4">
              "El diseño rústico y el ambiente tranquilo garantizan una experiencia inolvidable lejos del bullicio."
            </p>
          </div>

          <div className="md:w-1/2 glass p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-6 text-white border-b border-white/10 pb-2">Lo que incluye:</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start"><span className="text-amber-500 mr-2">✓</span> 2 habitaciones amplias (3 camas matrimoniales c/u)</li>
              <li className="flex items-start"><span className="text-amber-500 mr-2">✓</span> Sala de estar y comedor espacioso</li>
              <li className="flex items-start"><span className="text-amber-500 mr-2">✓</span> Cocina totalmente equipada</li>
              <li className="flex items-start"><span className="text-amber-500 mr-2">✓</span> Chimenea menonita & Calefacción</li>
              <li className="flex items-start"><span className="text-amber-500 mr-2">✓</span> Palapa, asador y fogateros</li>
              <li className="flex items-start"><span className="text-amber-500 mr-2">✓</span> Internet Starlink de alta velocidad</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
