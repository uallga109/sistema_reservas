import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="group">
            <span className="text-2xl font-serif font-semibold text-gray-900 tracking-tight italic">La Cava</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#" className="text-xs font-medium text-gray-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Conócenos</a>
            <a href="#" className="text-xs font-medium text-gray-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Carta</a>
            <Link 
              to="/reservar" 
              className="px-8 py-3 bg-slate-900 text-white text-xs font-medium rounded-none hover:bg-slate-800 transition-all tracking-widest uppercase shadow-lg shadow-slate-100"
            >
              Reservar Mesa
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link 
              to="/reservar" 
              className="mr-4 px-5 py-2 bg-slate-900 text-white text-[10px] font-medium rounded-none uppercase tracking-widest"
            >
              Reservar
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            <a href="#" className="text-base font-medium text-gray-700">Conócenos</a>
            <a href="#" className="text-base font-medium text-gray-700">Carta</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
