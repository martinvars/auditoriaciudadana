import React, { useState } from 'react';
import { BarChart as ChartBar, User, Menu, X } from 'lucide-react';
import RegisterModal from './RegisterModal';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavigation = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <ChartBar className="text-blue-600" size={24} />
              <span className="text-xl font-bold text-gray-800">Auditoría Ciudadana</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => onNavigate('propuestas')}
                className="text-gray-600 hover:text-gray-900"
              >
                Propuestas
              </button>
              <button 
                onClick={() => onNavigate('presupuestos')}
                className="text-gray-600 hover:text-gray-900"
              >
                Presupuestos
              </button>
              <button 
                onClick={() => onNavigate('recursos')}
                className="text-gray-600 hover:text-gray-900"
              >
                Recursos
              </button>
              <button 
                onClick={() => onNavigate('metodologia')}
                className="text-gray-600 hover:text-gray-900"
              >
                Metodología
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="text-gray-600 hover:text-gray-900"
              >
                Sobre Nosotros
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsRegisterModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                <User size={20} />
                <span className="hidden md:inline">Hazte Auditor</span>
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden">
            <nav className="container mx-auto px-4 py-2">
              <button 
                onClick={() => handleMobileNavigation('propuestas')}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Propuestas
              </button>
              <button 
                onClick={() => handleMobileNavigation('presupuestos')}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Presupuestos
              </button>
              <button 
                onClick={() => handleMobileNavigation('recursos')}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Recursos
              </button>
              <button 
                onClick={() => handleMobileNavigation('metodologia')}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Metodología
              </button>
              <button 
                onClick={() => handleMobileNavigation('about')}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Sobre Nosotros
              </button>
            </nav>
          </div>
        )}
      </header>

      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
};

export default Header;