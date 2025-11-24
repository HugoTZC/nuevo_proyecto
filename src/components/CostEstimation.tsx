// src/components/CostEstimation.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const CostEstimation: React.FC = () => {
  // Valores fijos para la calculadora
  const kmPerLiter = 20;
  const pricePerLiter = 25;

  const [numCars, setNumCars] = useState<number>(1); // Default 1 car
  const [confirmedPeople, setConfirmedPeople] = useState<number>(1); // Default 1 person
  const [loading, setLoading] = useState<boolean>(true);

  // Datos fijos del viaje
  const lodgingCostPerNight = 4500; // MXN
  const numberOfNights = 3;
  const totalLodging = lodgingCostPerNight * numberOfNights; // 13500 MXN
  const highwayCostPerCar = 300; // Casetas

  // Distancia aproximada Juárez -> Creel -> Juárez (ida y vuelta)
  // Juárez a Creel son aprox. 500 km, ida y vuelta 1000 km
  const totalKm = 1000;

  // Cálculos de gasolina
  const litersNeededPerCar = totalKm / kmPerLiter;
  const costPerCar = (litersNeededPerCar * pricePerLiter) + highwayCostPerCar;
  const totalGasolineCost = costPerCar * numCars;

  // Costo total por persona (hospedaje + gasolina)
  const totalTripCost = totalLodging + totalGasolineCost;
  const costPerPerson = confirmedPeople > 0 ? totalTripCost / confirmedPeople : 0;

  // Escenario de Referencia (2 autos, 8 personas)
  const refNumCars = 2;
  const refConfirmedPeople = 8;
  const refTotalGasolineCost = costPerCar * refNumCars;
  const refTotalTripCost = totalLodging + refTotalGasolineCost;
  const refCostPerPerson = refTotalTripCost / refConfirmedPeople;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('confirmaciones')
        .select('*')
        .eq('va', true);

      if (!error && data) {
        const peopleCount = data.length;
        const carsCount = data.filter(c => c.coche).length;

        // Initialize with real data if available, otherwise keep defaults
        if (peopleCount > 0) setConfirmedPeople(peopleCount);
        if (carsCount > 0) setNumCars(carsCount);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section id="costo" className="py-24 px-6 md:px-12 bg-slate-800 text-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">Y de como va a ser el chingazo?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Desglose claro de los costos esenciales del viaje.
          </p>
        </div>

        {/* Disclaimer Notice */}
        <div className="mb-12 p-6 bg-amber-900/20 border-l-4 border-amber-500 text-amber-100 rounded-r-xl max-w-4xl mx-auto flex items-start gap-4">
          <span className="text-3xl">⚠️</span>
          <div>
            <p className="font-bold text-lg mb-1">AVISO IMPORTANTE</p>
            <p className="text-amber-200/80 leading-relaxed">
              Los precios mostrados son <strong>aproximados</strong>. Este cálculo <strong>NO incluye</strong> alimentos,
              bebidas, souvenirs ni otras amenidades fuera del hospedaje, gasolina y casetas.
            </p>
            <p className="text-sm text-amber-200/60 mt-2">
              Cálculos de gasolina y casetas basados en:
              <br />
              <a href="https://gasolinamexico.com.mx/estados/chihuahua/chihuahua/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-400 transition-colors">Gasolina México</a>
              {' y '}
              <a href="https://tarifascapufe.com.mx/ruta-de-juarez-a-creel/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-400 transition-colors">Tarifas CAPUFE</a>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calculadora Interactiva - Dashboard Style */}
          <div className="lg:col-span-7 glass-card p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">Tu Calculadora</h3>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider rounded-full">Personalizable</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <label className="block text-sm font-medium text-gray-400 mb-1">Consumo (Fijo)</label>
                <div className="text-xl font-mono text-white">{kmPerLiter} km/L</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <label className="block text-sm font-medium text-gray-400 mb-1">Precio Gasolina (Fijo)</label>
                <div className="text-xl font-mono text-white">${pricePerLiter} MXN</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 focus-within:border-amber-500/50 transition-colors">
                <label htmlFor="numCars" className="block text-sm font-medium text-amber-400 mb-1">Autos Voluntarios</label>
                <input
                  type="number"
                  id="numCars"
                  value={numCars}
                  onChange={(e) => setNumCars(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-transparent border-none p-0 text-xl font-bold text-white focus:ring-0"
                  min="0"
                />
              </div>
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 focus-within:border-amber-500/50 transition-colors">
                <label htmlFor="confirmedPeople" className="block text-sm font-medium text-amber-400 mb-1">Personas Confirmadas</label>
                <input
                  type="number"
                  id="confirmedPeople"
                  value={confirmedPeople}
                  onChange={(e) => setConfirmedPeople(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-transparent border-none p-0 text-xl font-bold text-white focus:ring-0"
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-700/50 pt-6">
              <div className="flex justify-between text-gray-300">
                <span>Gasolina + Casetas Total</span>
                <span className="font-mono">${totalGasolineCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Hospedaje Total ({numberOfNights} noches)</span>
                <span className="font-mono">${totalLodging.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
                <span className="text-lg font-bold text-white">Total por Persona</span>
                <span className="text-3xl font-extrabold text-amber-400">${costPerPerson.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>

          {/* Escenario de Referencia */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900/40 to-slate-900/40 p-8 rounded-2xl border border-blue-500/20 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-xl font-bold text-blue-200">Escenario Ideal</h3>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider rounded-full">Referencia</span>
            </div>

            <p className="text-blue-100/70 mb-8 text-sm leading-relaxed relative z-10">
              Este cálculo se basa en una ocupación óptima de <strong>{refConfirmedPeople} personas</strong> distribuidas en <strong>{refNumCars} autos</strong>.
            </p>

            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-blue-200/60 text-sm">Configuración</span>
                <span className="text-blue-100 font-medium">{refNumCars} Autos &bull; {refConfirmedPeople} Pax</span>
              </div>

              <div className="p-6 bg-blue-950/30 rounded-xl border border-blue-500/10 text-center">
                <p className="text-blue-200/60 text-sm mb-2 uppercase tracking-widest">Costo Estimado / Persona</p>
                <p className="text-4xl font-extrabold text-white tracking-tight">
                  ${refCostPerPerson.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  <span className="text-lg text-blue-400/60 font-normal ml-1">MXN</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimation;
