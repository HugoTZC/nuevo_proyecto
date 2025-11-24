import React from 'react';
import Image from 'next/image';

const Dedication: React.FC = () => {
    return (
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-900 text-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="mb-10 relative inline-block group">
                    <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-slate-700 shadow-2xl group-hover:border-amber-500/50 transition-colors duration-500">
                        <Image
                            src="/images/hugo.jpeg"
                            alt="Hugo"
                            layout="fill"
                            objectFit="cover"
                            className="transform group-hover:scale-110 transition-transform duration-700"
                        />
                    </div>
                </div>

                <div className="space-y-6 animate-fade-in">
                    <p className="text-xl md:text-4xl font-serif italic text-amber-100/90 leading-relaxed">
                        "Amigos mios, los queremos mucho y queremos celebrar este nuevo año que viene con ustedes, cantando, bailando y pisteando"
                    </p>
                    <p className="text-lg text-amber-400 font-bold tracking-widest uppercase mt-4">- Valery y Hugo Meza</p>
                    <div className="w-24 h-1 bg-amber-500/30 mx-auto rounded-full mt-6"></div>
                </div>
            </div>
        </section>
    );
};

export default Dedication;
