// src/components/CarAvailability.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Asegúrate de que esta ruta sea correcta

interface Confirmation {
  id: string;
  nombre: string;
  apellidos: string;
  va: boolean;
  coche: boolean;
  timestamp: string;
}

const CAR_CAPACITY_MIN = 4;
const CAR_CAPACITY_MAX = 5;

const CarAvailability: React.FC = () => {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConfirmations();
  }, []);

  const fetchConfirmations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('confirmaciones')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error al cargar confirmaciones:', error);
      setError('Error al cargar la disponibilidad de autos.');
    } else {
      setConfirmations(data || []);
    }
    setLoading(false);
  };

  const attendees = confirmations.filter(c => c.va);
  const nonAttendees = confirmations.filter(c => !c.va);

  const confirmedPeople = attendees.length;
  const carsOffered = attendees.filter(c => c.coche).length;

  const minCarCapacityTotal = carsOffered * CAR_CAPACITY_MIN;
  const maxCarCapacityTotal = carsOffered * CAR_CAPACITY_MAX;

  const carsNeededMin = Math.ceil(confirmedPeople / CAR_CAPACITY_MAX);
  const carsNeededMax = Math.ceil(confirmedPeople / CAR_CAPACITY_MIN);

  const missingCarsMin = Math.max(0, carsNeededMin - carsOffered);
  const missingCarsMax = Math.max(0, carsNeededMax - carsOffered);

  // New variables derived from existing logic for the updated UI
  const totalCapacity = maxCarCapacityTotal; // Using max capacity for the "Total Capacity" card
  const missingCars = Math.max(0, carsNeededMin - carsOffered); // Using the minimum cars needed for the alert

  return (
    <section id="disponibilidad" className="py-16 md:py-24 px-6 md:px-12 bg-slate-800 text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-amber-400 mb-4">Estatus del Transporte</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Monitoreo en tiempo real de la logística del viaje.
          </p>
        </div>

        <div className="glass p-6 md:p-12 rounded-2xl shadow-2xl border border-slate-700/50">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">
              <p>Error al cargar datos: {error}</p>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Personas Confirmadas */}
                <div className="bg-slate-900/50 p-8 rounded-2xl border border-blue-500/30 text-center relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
                  <h3 className="text-lg font-bold text-blue-300 mb-2 uppercase tracking-wider">Personas Confirmadas</h3>
                  <p className="text-5xl md:text-6xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform duration-300">{confirmedPeople}</p>
                  <p className="text-blue-200/60 text-sm">Asistentes registrados</p>
                </div>

                {/* Autos Disponibles */}
                <div className="bg-slate-900/50 p-8 rounded-2xl border border-green-500/30 text-center relative overflow-hidden group hover:border-green-500/50 transition-colors">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
                  <h3 className="text-lg font-bold text-green-300 mb-2 uppercase tracking-wider">Autos Disponibles</h3>
                  <p className="text-5xl md:text-6xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform duration-300">{carsOffered}</p>
                  <p className="text-green-200/60 text-sm">Vehículos voluntarios</p>
                </div>

                {/* Capacidad Estimada */}
                <div className="bg-slate-900/50 p-8 rounded-2xl border border-purple-500/30 text-center relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
                  <h3 className="text-lg font-bold text-purple-300 mb-2 uppercase tracking-wider">Capacidad Total</h3>
                  <p className="text-5xl md:text-6xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform duration-300">{totalCapacity}</p>
                  <p className="text-purple-200/60 text-sm">Asientos disponibles</p>
                </div>
              </div>

              {(confirmedPeople > maxCarCapacityTotal || missingCarsMin > 0) && (
                <div className="p-6 bg-red-900/30 border-l-4 border-red-500 text-red-200 rounded-md">
                  <p className="text-xl font-bold mb-2 text-red-400">¡Alerta: Faltan Autos!</p>
                  <p className="text-lg">
                    Con {confirmedPeople} personas confirmadas, necesitamos al menos{' '}
                    <strong className="text-red-300">{carsNeededMin}</strong> auto(s) (o idealmente{' '}
                    <strong className="text-red-300">{carsNeededMax}</strong> auto(s)) para llevar a todos cómodamente.
                    Actualmente faltan entre <strong className="text-red-300">{missingCarsMin}</strong> y{' '}
                    <strong className="text-red-300">{missingCarsMax}</strong> auto(s) para cubrir la capacidad mínima.
                    ¡Anímate a ofrecer tu coche si puedes!
                  </p>
                </div>
              )}

              {confirmedPeople > 0 && confirmedPeople <= maxCarCapacityTotal && missingCarsMin === 0 && (
                <div className="p-6 bg-green-900/30 border-l-4 border-green-500 text-green-200 rounded-md">
                  <p className="text-xl font-bold mb-2 text-green-400">¡Tenemos Suficientes Autos!</p>
                  <p className="text-lg">
                    Con {carsOffered} auto(s) y {confirmedPeople} personas confirmadas, parece que tenemos suficiente transporte. ¡Gracias a todos!
                  </p>
                </div>
              )}

              {/* Lists Section */}
              <div className="pt-8 border-t border-slate-700/50">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Attendees List - Takes up 2 columns */}
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="text-green-400">✅</span> Lista de Confirmados
                    </h3>
                    <div className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-slate-800/80 text-gray-400 text-xs uppercase tracking-wider">
                            <tr>
                              <th className="px-6 py-4 font-medium">Nombre</th>
                              <th className="px-6 py-4 font-medium text-center">Transporte</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-700/50">
                            {attendees.length > 0 ? (
                              attendees.map((person) => (
                                <tr key={person.id} className="hover:bg-slate-800/30 transition-colors">
                                  <td className="px-6 py-4 text-gray-200 font-medium">
                                    {person.nombre} {person.apellidos}
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    {person.coche ? (
                                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                                        🚗 Lleva Auto
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-700/50 text-slate-400 text-xs">
                                        👤 Pasajero
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={2} className="px-6 py-8 text-center text-gray-500 italic">
                                  Aún no hay confirmados.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Non-Attendees Summary Card - Takes up 1 column */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <span className="text-red-400">❌</span> No Asistirán
                    </h3>
                    <div className="bg-slate-900/50 p-8 rounded-xl border border-red-500/30 text-center relative overflow-hidden group hover:border-red-500/50 transition-colors">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
                      <p className="text-gray-400 mb-2">Se lo pierden</p>
                      <p className="text-6xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                        {nonAttendees.length}
                      </p>
                      <p className="text-red-300/60 text-sm">Personas no pueden ir</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={fetchConfirmations}
            className="mt-8 w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 transform hover:-translate-y-1"
            disabled={loading}
          >
            Actualizar Datos
          </button>
        </div>
      </div>
    </section >
  );
};

export default CarAvailability;
