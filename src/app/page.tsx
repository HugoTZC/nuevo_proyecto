"use client"; // Marca este componente como un Client Component

import React, { useState } from 'react';

import Cover from "@/components/Cover";
import Description from "@/components/Description";
import Amenities from "@/components/Amenities";
import Activities from "@/components/Activities";
import CostEstimation from "@/components/CostEstimation";
import ConfirmationForm from "@/components/ConfirmationForm";
import CarAvailability from "@/components/CarAvailability"; // Importa el nuevo componente
import Photos from "@/components/Photos";
import Directions from "@/components/Directions";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [nombre, setNombre] = useState<string>('');
  const [apellidos, setApellidos] = useState<string>('');

  const scrollToConfirm = () => {
    document.getElementById('confirmacion')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-900">
      <Navbar />

      {/* Componente de Portada */}
      <Cover onConfirmClick={scrollToConfirm} />

      {/* Componente de Descripción del Lugar */}
      <Description />

      {/* Componente de Amenidades */}
      <Amenities />

      {/* Componente de Actividades Opcionales */}
      <Activities nombre={nombre} apellidos={apellidos} />

      {/* Componente de Costo Estimado */}
      <CostEstimation />

      {/* Componente de Formulario de Confirmación */}
      <ConfirmationForm
        nombre={nombre}
        setNombre={setNombre}
        apellidos={apellidos}
        setApellidos={setApellidos}
      />

      {/* Componente de Disponibilidad de Autos */}
      <CarAvailability />

      {/* Componente de Fotos */}
      <Photos />

      {/* Componente de Direcciones */}
      <Directions />

      <Footer />
    </main>
  );
}
