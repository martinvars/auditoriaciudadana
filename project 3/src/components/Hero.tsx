import React, { useState, useEffect } from 'react';
import { TrendingDown, UserPlus, Euro, AlertTriangle } from 'lucide-react';
import RegisterModal from './RegisterModal';
import { supabase } from '../lib/supabase';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [totalSavings, setTotalSavings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTotalSavings();
    const channel = supabase
      .channel('proposals_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'proposals' }, () => {
        fetchTotalSavings();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTotalSavings = async () => {
    try {
      const { data, error } = await supabase
        .from('proposals')
        .select('savings');

      if (error) throw error;

      const total = data.reduce((sum, proposal) => sum + proposal.savings, 0);
      setTotalSavings(total);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching total savings:', error);
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('es-ES', {
      maximumFractionDigits: 0
    });
  };

  return (
    <>
      <div className="relative min-h-[600px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white py-12">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="text-red-500" size={28} />
              <h2 className="text-xl font-semibold text-red-500">España necesita una motosierra fiscal y un DOGE español</h2>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              El gasto público está fuera de control
            </h1>
            
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              España tiene uno de los gobiernos más ineficientes de Europa, con un gasto público desbocado del 44.3% del PIB. 
              Únete a la iniciativa ciudadana para identificar y eliminar el despilfarro en todas las administraciones.
            </p>

            {/* Total Savings Counter */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Euro size={24} className="text-green-400" />
                <h2 className="text-xl font-semibold">Ahorro Total Propuesto</h2>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-green-400">
                {isLoading ? (
                  <div className="animate-pulse">
                    Calculando...
                  </div>
                ) : (
                  `${formatNumber(totalSavings)}M€`
                )}
              </div>
              <p className="text-sm mt-2 text-gray-300">
                Suma de todas las propuestas de ahorro presentadas
              </p>
            </div>

            {/* Expert Reviews Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-yellow-400" size={20} />
                  <h3 className="font-semibold">Chandler Institute (2024)</h3>
                </div>
                <p className="text-sm text-gray-200">
                  España ocupa el puesto 31 de 38 países OCDE en eficiencia gubernamental. Exceso de burocracia, duplicidades administrativas y gasto improductivo.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-yellow-400" size={20} />
                  <h3 className="font-semibold">Comisión Europea (2023)</h3>
                </div>
                <p className="text-sm text-gray-200">
                  Ranking 23/27 en la UE en eficiencia del gasto público. Costes administrativos un 32% superiores a la media europea.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transform hover:scale-105 transition-transform duration-200"
              >
                <UserPlus size={20} />
                Hazte Auditor
              </button>
              <button 
                onClick={() => onNavigate('propuestas')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900"
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