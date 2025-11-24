// src/components/Activities.tsx
"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase'; // Asegúrate de que esta ruta sea correcta

interface Activity {
  name: string;
  cost: string; // Incluimos el costo como parte de la actividad
  description?: string;
}

const optionalActivities: Activity[] = [
  { name: 'Barrancas del Cobre', cost: '$600 por persona', description: '6 horas de duración' },
  { name: 'Cascada de Cusárare', cost: '$450 por persona' },
  { name: 'Valles (Hongos, Ranas, Monjes)', cost: '$350 por persona' },
  { name: 'Recowata', cost: '$750 por persona' }, // El usuario especificó Recowata, no Lago de Arareco / Recowata
  { name: 'Cascada de Basaseachi', cost: '$900 por persona' },
  { name: 'Mirador del Gallego', cost: '$1300 por persona' },
  { name: 'Batopilas (Pueblo Mágico)', cost: '$1500 por persona' },
  { name: 'Urique', cost: '$1500 por persona' },
  { name: 'Salto de Sisoguichi', cost: '$450 por persona' },
  { name: 'Río Oteros', cost: '$550 por persona' },
  { name: 'Barranca y miradores Rikinapuchi', cost: '$600 por persona' },
];

interface ActivitiesProps {
  nombre: string;
  apellidos: string;
}

const Activities: React.FC<ActivitiesProps> = ({ nombre, apellidos }) => {
  const [votedActivities, setVotedActivities] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckboxChange = (activityName: string) => {
    setVotedActivities(prev =>
      prev.includes(activityName)
        ? prev.filter(name => name !== activityName)
        : [...prev, activityName]
    );
  };

  const handleSubmitVotes = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${nombre} ${apellidos}`.trim();

    if (!fullName) {
      setMessage({ type: 'error', text: 'Por favor, ingresa tu nombre en la sección de confirmación (abajo) para poder votar.' });
      return;
    }
    // Removed validation for empty votes as per user request

    setLoading(true);
    setMessage(null);

    if (votedActivities.length > 0) {
      const votesToInsert = votedActivities.map(activityName => ({
        actividad: activityName,
        nombre_persona: fullName,
      }));

      const { error } = await supabase
        .from('actividades_votos')
        .insert(votesToInsert);

      if (error) {
        console.error('Error al guardar los votos:', error);
        setMessage({ type: 'error', text: `Error al guardar los votos: ${error.message}` });
      } else {
        setMessage({ type: 'success', text: '¡Selección guardada exitosamente! Gracias por tu participación.' });
        // Opcional: limpiar la selección después de guardar
        // setSelectedActivities([]);
      }
    } else {
      // If no activities selected, just show success message (optional selection)
      setMessage({ type: 'success', text: '¡Gracias! Hemos registrado que no seleccionaste actividades extra por ahora.' });
    }
    setLoading(false);
  };

  return (
    <section id="actividades" className="py-24 px-6 md:px-12 bg-slate-900 text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">Actividades disponibles en el lugar</h2>
          <p className="text-xl text-gray-400">Seleccionar las actividades es opcional, solo es para estimacion del precio.</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-700/50">
          {!nombre || !apellidos ? (
            <div className="mb-8 p-6 bg-amber-900/20 border border-amber-500/30 rounded-xl text-center">
              <p className="text-amber-200 text-lg mb-2">👋 ¡Hola! Para comenzar, por favor ingresa tu nombre abajo.</p>
              <p className="text-sm text-amber-400/70">Esto nos ayudará a calcular el presupuesto</p>
            </div>
          ) : (
            <div className="mb-8 text-center">
              <p className="text-2xl text-gray-300">Hola, <span className="text-amber-400 font-bold">{nombre}</span>. ¿Qué te gustaría hacer?</p>
            </div>
          )}

          <form onSubmit={handleSubmitVotes} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {optionalActivities.map((activity) => (
                <label
                  key={activity.name}
                  className={`relative flex items-start p-6 rounded-xl border transition-all duration-300 cursor-pointer group ${votedActivities.includes(activity.name)
                    ? 'bg-slate-800 border-amber-500 shadow-lg shadow-amber-900/20'
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                >
                  <div className="flex items-center h-6 mt-1">
                    <input
                      type="checkbox"
                      value={activity.name}
                      checked={votedActivities.includes(activity.name)}
                      onChange={() => handleCheckboxChange(activity.name)}
                      className="w-5 h-5 text-amber-500 bg-slate-700 border-slate-600 rounded focus:ring-amber-500 focus:ring-offset-slate-900"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-bold text-lg ${votedActivities.includes(activity.name) ? 'text-white' : 'text-gray-300'}`}>
                        {activity.name}
                      </span>
                      <span className="text-amber-400 font-mono font-bold">{activity.cost}</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{activity.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-700 flex flex-col items-center">
              <button
                type="submit"
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-red-600/30 hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1"
                disabled={loading}
              >
                {loading ? 'Guardando Selección...' : 'Guardar Selección'}
              </button>
            </div>

            {message && (
              <div className={`mt-6 p-4 rounded-xl text-center animate-fade-in ${message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                : 'bg-red-500/10 border border-red-500/30 text-red-400'
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

export default Activities;
