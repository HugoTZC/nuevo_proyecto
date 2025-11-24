// src/components/ConfirmationForm.tsx
"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase'; // Asegúrate de que esta ruta sea correcta

interface ConfirmationFormProps {
  nombre: string;
  setNombre: (value: string) => void;
  apellidos: string;
  setApellidos: (value: string) => void;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({ nombre, setNombre, apellidos, setApellidos }) => {
  const [va, setVa] = useState<'si' | 'no' | null>(null);
  const [coche, setCoche] = useState<'si' | 'no' | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !apellidos.trim() || va === null || (va === 'si' && coche === null)) {
      setMessage({ type: 'error', text: 'Por favor, completa todos los campos.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    const confirmacionData = {
      nombre,
      apellidos,
      va: va === 'si',
      coche: va === 'si' ? (coche === 'si') : false,
    };

    const { data, error } = await supabase
      .from('confirmaciones')
      .insert([confirmacionData])
      .select();

    if (error) {
      console.error('Error al guardar la confirmación:', error);
      setMessage({ type: 'error', text: `Error al guardar: ${error.message}` });
    } else {
      setMessage({ type: 'success', text: '¡Confirmación enviada exitosamente! ¡Gracias!' });
      // No limpiamos nombre y apellidos para que sigan disponibles para actividades
      setVa(null);
      setCoche(null);
    }
    setLoading(false);
  };

  return (
    <section id="confirmacion" className="py-16 md:py-24 px-6 md:px-12 bg-slate-900 text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-amber-400 mb-4">Confirma tu Asistencia</h2>
          <p className="text-xl text-gray-400 mb-6">¡Nos encantaría que nos acompañes! Por favor llena tus datos.</p>

          <div className="inline-block bg-red-500/20 border border-red-500/50 rounded-lg px-6 py-3 animate-pulse">
            <p className="text-red-200 font-bold text-lg">
              ⚠️ Fecha límite para confirmar: <span className="text-white">6 de Diciembre</span>
            </p>
            <p className="text-red-300/80 text-sm mt-1">Para asegurar la reservación de las cabañas</p>
          </div>
        </div>

        <div className="glass p-6 md:p-10 rounded-2xl shadow-2xl border border-slate-700/50">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="group">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-amber-500 transition-colors">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-slate-600 py-2 text-white text-lg focus:border-amber-500 focus:outline-none transition-colors placeholder-gray-600"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="group">
                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-amber-500 transition-colors">Apellidos</label>
                <input
                  type="text"
                  id="apellidos"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-slate-600 py-2 text-white text-lg focus:border-amber-500 focus:outline-none transition-colors placeholder-gray-600"
                  placeholder="Tus apellidos"
                  required
                />
              </div>
            </div>

            <div>
              <span className="block text-lg font-medium text-gray-300 mb-4">¿Asistirás al viaje?</span>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <label className="flex items-center cursor-pointer group p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <div className="relative">
                    <input
                      type="radio"
                      name="va"
                      value="si"
                      checked={va === 'si'}
                      onChange={(e) => setVa(e.target.value as 'si' | 'no')}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${va === 'si' ? 'border-amber-500' : 'border-slate-500 group-hover:border-amber-400'}`}>
                      {va === 'si' && <div className="w-3 h-3 rounded-full bg-amber-500" />}
                    </div>
                  </div>
                  <span className={`ml-3 text-lg ${va === 'si' ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>¡Sí, cuenta conmigo!</span>
                </label>

                <label className="flex items-center cursor-pointer group p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <div className="relative">
                    <input
                      type="radio"
                      name="va"
                      value="no"
                      checked={va === 'no'}
                      onChange={(e) => setVa(e.target.value as 'si' | 'no')}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${va === 'no' ? 'border-red-500' : 'border-slate-500 group-hover:border-red-400'}`}>
                      {va === 'no' && <div className="w-3 h-3 rounded-full bg-red-500" />}
                    </div>
                  </div>
                  <span className={`ml-3 text-lg ${va === 'no' ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>No podré ir :(</span>
                </label>
              </div>
            </div>

            {va === 'si' && (
              <div className="animate-fade-in">
                <span className="block text-lg font-medium text-gray-300 mb-4">¿Llevarías tu coche?</span>
                <div className="flex gap-8">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        name="coche"
                        value="si"
                        checked={coche === 'si'}
                        onChange={(e) => setCoche(e.target.value as 'si' | 'no')}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${coche === 'si' ? 'border-amber-500' : 'border-slate-500 group-hover:border-amber-400'}`}>
                        {coche === 'si' && <div className="w-3 h-3 rounded-full bg-amber-500" />}
                      </div>
                    </div>
                    <span className={`ml-3 text-lg ${coche === 'si' ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>Sí, llevo auto</span>
                  </label>

                  <label className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        name="coche"
                        value="no"
                        checked={coche === 'no'}
                        onChange={(e) => setCoche(e.target.value as 'si' | 'no')}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${coche === 'no' ? 'border-slate-400' : 'border-slate-500 group-hover:border-slate-300'}`}>
                        {coche === 'no' && <div className="w-3 h-3 rounded-full bg-slate-400" />}
                      </div>
                    </div>
                    <span className={`ml-3 text-lg ${coche === 'no' ? 'text-white font-bold' : 'text-gray-400 group-hover:text-gray-200'}`}>No, necesito ride</span>
                  </label>
                </div>
              </div>
            )}

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-full shadow-lg hover:shadow-amber-600/30 hover:from-amber-500 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                {loading ? 'Enviando...' : 'Enviar Confirmación'}
              </button>
            </div>

            {message && (
              <div className={`mt-6 p-4 rounded-xl text-center animate-fade-in ${message.type === 'error'
                ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                : 'bg-green-500/10 border border-green-500/30 text-green-400'
                }`}>
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationForm;
