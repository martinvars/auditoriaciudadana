import React, { useState, useEffect } from 'react';
import { TrendingDown, UserPlus, Euro, AlertTriangle, Mail } from 'lucide-react';
import RegisterModal from './RegisterModal';
import { supabase } from '../lib/supabase';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [totalSavings, setTotalSavings] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');

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

      const total = data.reduce((sum, proposal) => {
        const savings = typeof proposal.savings === 'number' ? proposal.savings : 0;
        return sum + savings;
      }, 0);

      setTotalSavings(total);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching total savings:', error);
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email, notifications_enabled: true }]);

      if (error && !error.message.includes('unique constraint')) {
        throw error;
      }

      setSubscribeMessage('¡Gracias por unirte al movimiento DOGE! Recibirás notificaciones de nuevas propuestas.');
      setEmail('');
      setShowEmailInput(false);
      setTimeout(() => setSubscribeMessage(''), 5000);
    } catch (error) {
      console.error('Error subscribing:', error);
      setSubscribeMessage('Error al suscribirse. Por favor, intente nuevamente.');
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('es-ES', {
      maximumFractionDigits: 0
    });
  };

  const Chainsaw = () => (
    <svg 
      width="300" 
      height="120" 
      viewBox="0 0 300 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="chainsaw-shadow"
    >
      {/* Engine Housing */}
      <path
        d="M20 40 L120 40 C130 40 140 30 140 20 L140 80 C140 90 130 100 120 100 L20 100 C10 100 0 90 0 80 L0 60 C0 50 10 40 20 40Z"
        fill="#e5e5e5"
        stroke="#374151"
        strokeWidth="2"
      />
      
      {/* Engine Details */}
      <circle cx="70" cy="70" r="25" fill="#4b5563" stroke="#374151" strokeWidth="2"/>
      <circle cx="70" cy="70" r="20" fill="#6b7280"/>
      <circle cx="70" cy="70" r="15" fill="#4b5563"/>
      
      {/* Pull Starter */}
      <rect x="30" y="20" width="40" height="10" rx="5" fill="#dc2626"/>
      <path d="M40 20 L60 20" stroke="#991b1b" strokeWidth="2"/>
      
      {/* Guide Bar - Made wider */}
      <path
        d="M140 55 L280 55 L290 65 L280 75 L140 75Z"
        fill="#d1d5db"
        stroke="#374151"
        strokeWidth="2"
      />
      
      {/* Chain - Adjusted for wider bar */}
      <path
        d="M140 65 L280 65"
        stroke="#6b7280"
        strokeWidth="8"
        strokeLinecap="round"
        className="animate-chain"
      />
      
      {/* Chain Teeth - Made larger */}
      {[...Array(14)].map((_, i) => (
        <path
          key={i}
          d={`M${160 + i * 10} 55 L${165 + i * 10} 45 L${170 + i * 10} 55 M${160 + i * 10} 75 L${165 + i * 10} 85 L${170 + i * 10} 75`}
          stroke="#374151"
          strokeWidth="2"
        />
      ))}
      
      {/* Handle */}
      <path
        d="M40 100 C40 110 50 120 60 120 L100 120 C110 120 120 110 120 100"
        fill="none"
        stroke="#374151"
        strokeWidth="4"
      />
    </svg>
  );

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Red background */}
      <div className="absolute inset-0 bg-red-600" />
      
      {/* Floating chainsaws */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
              opacity: 0.2
            }}
          >
            <Chainsaw />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white py-12">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="text-yellow-400" size={28} />
            <h2 className="text-xl font-semibold text-yellow-400">España necesita su DOGE, su motosierra fiscal</h2>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            El gasto público está fuera de control
          </h1>
          
          <p className="text-lg md:text-xl mb-8 leading-relaxed">
            España tiene uno de los gobiernos más ineficientes de Europa, con un gasto público desbocado del 44.3% del PIB. 
            Únete a la iniciativa ciudadana para identificar y eliminar el despilfarro en todas las administraciones. Si quieres contribuir nuevas propuestas de ahorro y ser parte del movimiento DOGE hazte auditor, si quieres recibir y comentar propuestas pero no contribuir nuevas únete al movimiento DOGE.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => setIsRegisterModalOpen(true)}
              className="sm:w-1/3 flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transform hover:scale-105 transition-all duration-200"
            >
              <UserPlus size={20} />
              Hazte Auditor
            </button>
            {showEmailInput ? (
              <form onSubmit={handleSubscribe} className="sm:w-2/3 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <Mail size={20} />
                  <span>Unirme</span>
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowEmailInput(true)}
                className="sm:w-2/3 flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                <Mail size={20} />
                <span>Unirme al DOGE</span>
              </button>
            )}
          </div>
          {subscribeMessage && (
            <p className="mt-2 text-sm text-yellow-400">{subscribeMessage}</p>
          )}

          {/* Total Savings Counter */}
          <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-6 mb-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-400" size={20} />
                <h3 className="font-semibold">Chandler Institute (2024)</h3>
              </div>
              <p className="text-sm text-gray-200">
                España ocupa el puesto 31 de 38 países OCDE en eficiencia gubernamental. Exceso de burocracia, duplicidades administrativas y gasto improductivo.
              </p>
            </div>
            <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-400" size={20} />
                <h3 className="font-semibold">Comisión Europea (2023)</h3>
              </div>
              <p className="text-sm text-gray-200">
                Ranking 23/27 en la UE en eficiencia del gasto público. Costes administrativos un 32% superiores a la media europea.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
};

export default Hero;