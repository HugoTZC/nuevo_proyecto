import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-gray-400 py-12 border-t border-slate-800/50">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-white font-bold tracking-widest uppercase mb-2">Cabaña Gerónimo's</p>
                    <p className="text-sm text-gray-600">Creel, Chihuahua &bull; Fin de Año 2024</p>
                </div>

                <div className="text-sm text-gray-600 text-center md:text-right">
                    <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
                    <p className="mt-1">Diseñado para una experiencia inolvidable.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
