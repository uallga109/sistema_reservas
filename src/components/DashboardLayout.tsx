import React, { useState } from 'react';
import { Menu, X, Calendar, Layout as LayoutIcon, LogOut, Settings, Clock, BookOpen } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'reservas', label: 'Reservas de Hoy', icon: Calendar },
    { id: 'historial', label: 'Historial', icon: Clock },
    { id: 'plano', label: 'Plano de Sala', icon: LayoutIcon },
    { id: 'carta', label: 'Modificar Carta', icon: BookOpen },
    { id: 'ajustes', label: 'Configuración', icon: Settings },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <span className="text-xl font-bold text-indigo-600">Restaurante Admin</span>
          </div>
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
          <span className="text-lg font-bold text-indigo-600">Restaurante Admin</span>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" onClick={toggleMobileMenu}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white transition duration-300 transform">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={toggleMobileMenu}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <span className="text-xl font-bold text-indigo-600">Menú</span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                        activeTab === item.id
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="mr-4 h-6 w-6" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 relative overflow-y-auto focus:outline-none py-6 px-4 sm:px-6 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
