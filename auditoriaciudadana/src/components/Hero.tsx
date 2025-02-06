import React, { useState } from 'react';
import { TrendingDown, UserPlus } from 'lucide-react';
import RegisterModal from './RegisterModal';

const Hero = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const scrollToProposals = () => {
    const proposalsSection = document.getElementById('propuestas');
    if (proposalsSection) {
      proposalsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="relative h-[500px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1558370781-d6196949e317?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Hazte Auditor del Gasto Público
            </h1>
            <p className="text-xl mb-8">
              Únete a la iniciativa ciudadana para analizar y proponer mejoras en la gestión de los recursos públicos en España. Tu voz importa en la transparencia y eficiencia del gasto público.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsRegisterModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-transform duration-200"
              >
                <UserPlus size={20} />
                Hazte Auditor
              </button>
              <button 
                onClick={scrollToProposals}
                className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900"
              >
                <TrendingDown size={20} />
                Ver Propuestas
              </button>
            </div>
          </div>
        </div>
      </div>

      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
};

export default Hero;