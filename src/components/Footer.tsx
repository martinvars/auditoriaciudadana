import React from 'react';
import { BarChart as ChartBar, Mail, Github } from 'lucide-react';
import PrivacyModal from './PrivacyModal';

interface FooterProps {
  onNavigate: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<'privacy' | 'cookies' | 'legal'>('privacy');

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <ChartBar size={24} />
                <span className="text-xl font-bold">Auditoría Ciudadana</span>
              </div>
              <p className="text-gray-400">
                Plataforma ciudadana para el análisis y propuesta de mejoras en el gasto público español.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => onNavigate('propuestas')} 
                    className="text-gray-400 hover:text-white"
                  >
                    Propuestas
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('presupuestos')} 
                    className="text-gray-400 hover:text-white"
                  >
                    Presupuestos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('recursos')} 
                    className="text-gray-400 hover:text-white"
                  >
                    Recursos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('metodologia')} 
                    className="text-gray-400 hover:text-white"
                  >
                    Metodología
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => {
                      setModalContent('privacy');
                      setIsPrivacyModalOpen(true);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    Política de Privacidad
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setModalContent('cookies');
                      setIsPrivacyModalOpen(true);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    Política de Cookies
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setModalContent('legal');
                      setIsPrivacyModalOpen(true);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    Aviso Legal
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('recursos')}
                    className="text-gray-400 hover:text-white"
                  >
                    Documentación
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:camila.martinez@jazzya.com" 
                  className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                  <Mail size={20} />
                  camila.martinez@jazzya.com
                </a>
                <a 
                  href="https://github.com/auditoria-ciudadana" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                  <Github size={20} />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Auditoría Ciudadana. CIF: B12345678. Inscrita en el Registro Mercantil de Madrid, Tomo 12345, Folio 67, Sección 8, Hoja M-123456.</p>
          </div>
        </div>
      </footer>

      <PrivacyModal 
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        content={modalContent}
      />
    </>
  );
};

export default Footer;