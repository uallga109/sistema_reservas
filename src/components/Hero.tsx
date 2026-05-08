import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-serif font-medium text-gray-900 mb-6 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 italic">
          La Cava <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 not-italic">Aguadulce</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 mb-10 leading-relaxed font-sans font-light animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Descubre una experiencia gastronómica única donde la tradición se encuentra con la innovación. Reserva tu mesa y déjate llevar por nuestros sabores.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <Link 
            to="/reservar" 
            className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white font-medium text-lg rounded-none hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:-translate-y-0.5 flex items-center justify-center group tracking-widest uppercase text-sm"
          >
            Reservar Ahora
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="#" 
            className="w-full sm:w-auto px-10 py-4 bg-white text-slate-900 font-medium text-sm rounded-none border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center tracking-widest uppercase"
          >
            Ver Carta
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
