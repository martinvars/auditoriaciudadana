import React from 'react';
import { BarChart as ChartBar, Mail, Github, Shield, Cookie, FileText, Globe2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ChartBar size={24} />
              <span className="text-xl font-bold">Auditoría Ciudadana</span>
            </div>
            <p className="text-gray-400">
              Plataforma ciudadana para el análisis y propuesta de mejoras en el gasto público español.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Globe2 size={16} className="text-gray-400" />
              <select className="bg-gray-800 text-gray-400 border border-gray-700 rounded px-2 py-1">
                <option value="es">Español</option>
                <option value="ca">Català</option>
                <option value="eu">Euskara</option>
                <option value="gl">Galego</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#proposals" className="text-gray-400 hover:text-white">Propuestas</a></li>
              <li><a href="#presupuestos" className="text-gray-400 hover:text-white">Presupuestos</a></li>
              <li><a href="#metodologia" className="text-gray-400 hover:text-white">Metodología</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white">Sobre Nosotros</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/legal/aviso-legal" className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <Shield size={16} />
                  Aviso Legal
                </a>
              </li>
              <li>
                <a href="/legal/cookies" className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <Cookie size={16} />
                  Cookies
                </a>
              </li>
              <li>
                <a href="/legal/terminos" className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <FileText size={16} />
                  Términos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-4">
              <a href="mailto:martin@overture.life" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Mail size={20} />
                martin@overture.life
              </a>
              <p className="text-sm text-gray-400">
                Para cualquier consulta sobre el sitio, contacta directamente con Martín Varsavsky.
              </p>
              <a href="https://github.com/auditoria-ciudadana" className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Github size={20} />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="mb-2">© 2024 Auditoría Ciudadana. Todos los derechos reservados.</p>
          <p className="text-sm">
            Responsable: Martín Varsavsky
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;