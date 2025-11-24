"use client";
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#portada' },
        { name: 'Lugar', href: '#descripcion' },
        { name: 'Amenidades', href: '#amenidades' },
        { name: 'Actividades', href: '#actividades' },
        { name: 'Costo', href: '#costo' },
        { name: 'Confirmar', href: '#confirmacion' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <a href="#portada" className="text-xl font-bold text-white tracking-widest uppercase hover:text-amber-400 transition-colors">
                    Propuesta de viaje
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xs font-bold text-gray-300 hover:text-amber-400 transition-colors uppercase tracking-widest"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white text-2xl focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center animate-fade-in">
                    <button
                        className="absolute top-6 right-6 text-white text-4xl focus:outline-none"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        &times;
                    </button>
                    <div className="flex flex-col gap-8 text-center">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-2xl font-bold text-gray-300 hover:text-amber-400 transition-colors uppercase tracking-widest"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
