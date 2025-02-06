import React, { useState } from 'react';
import { BarChart as ChartBar, User, Menu, X } from 'lucide-react';
import RegisterModal from './RegisterModal';

const Header = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <ChartBar className="text-blue-600" size={24} />
              <span className="text-xl font-bold text-gray-800">Auditoría Ciudadana</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => scrollToSection('proposals')}
                className="text-gray-600 hover:text-gray-900"
              >
                Propuestas
              </button>
              <button 
                onClick={() => scrollToSection('presupuestos')}
                className="text-gray-600 hover:text-gray-900"
              >
                Presupuestos
              </button>
              <button 
                onClick={() => scrollToSection('metodologia')}
                className="text-gray-600 hover:text-gray-900"
              >
                Metodología
              </button>
              <button 
                onClick={() => scrollToSection('recursos')}
                className="text-gray-600 hover:text-gray-900"
              >
                Recursos
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-gray-900"
              >
                Sobre Nosotros
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsRegisterModalOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                <User size={20} />
                Hazte Auditor
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-600"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col gap-4">
                <button 
                  onClick={() => scrollToSection('proposals')}
                  className="text-gray-600 hover:text-gray-900 py-2"
                >
                  Propuestas
                </button>
                <button 
                  onClick={() => scrollToSection('presupuestos')}
                  className="text-gray-600 hover:text-gray-900 py-2"
                >
                  Presupuestos
                </button>
                <button 
                  onClick={() => scrollToSection('metodologia')}
                  className="text-gray-600 hover:text-gray-900 py-2"
                >
                  Metodología
                </button>
                <button 
                  onClick={() => scrollToSection('recursos')}
                  className="text-gray-600 hover:text-gray-900 py-2"
                >
                  Recursos
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-600 hover:text-gray-900 py-2"
                >
                  Sobre Nosotros
                </button>
                <button 
                  onClick={() => {
                    setIsRegisterModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <User size={20} />
                  Hazte Auditor
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
};

export default Header;