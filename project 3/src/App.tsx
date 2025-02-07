import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProposalsList from './components/ProposalsList';
import BudgetOverview from './components/BudgetOverview';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { initializeComments } from './lib/initializeComments';

function App() {
  const [currentSection, setCurrentSection] = useState<string>('propuestas');

  useEffect(() => {
    // Initialize sample comments
    initializeComments();
  }, []);

  const handleNavigation = (section: string) => {
    setCurrentSection(section);
    // Scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigation} />
      <Hero onNavigate={handleNavigation} />
      
      <main className="container mx-auto px-4 py-8">
        <section id="propuestas" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Propuestas de Ahorro</h2>
          <ProposalsList />
        </section>

        <section id="presupuestos" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Presupuestos 2024</h2>
          <BudgetOverview />
        </section>

        <section id="recursos" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Recursos para Auditores</h2>
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Recursos para Analizar el Gasto Público</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-blue-800">Informes Oficiales</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://www.sepg.pap.hacienda.gob.es/sitios/sepg/es-ES/Presupuestos/PGE/Paginas/PGE2024.aspx" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-blue-600 hover:text-blue-800">
                        Presupuestos Generales del Estado
                      </a>
                    </li>
                    <li>
                      <a href="https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Paginas/inicio.aspx" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-blue-600 hover:text-blue-800">
                        Intervención General (IGAE)
                      </a>
                    </li>
                    <li>
                      <a href="https://www.bde.es/bde/es/areas/estadis/estadisticas-por/financiacion-y-/deuda-publica/" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-blue-600 hover:text-blue-800">
                        Banco de España - Deuda Pública
                      </a>
                    </li>
                    <li>
                      <a href="https://www.airef.es/es/datos-economicos/" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-blue-600 hover:text-blue-800">
                        AIReF - Autoridad Fiscal
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-green-50 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-green-800">Comparación Internacional</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://data.oecd.org/government.htm" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-green-600 hover:text-green-800">
                        OCDE - Estadísticas Comparadas
                      </a>
                    </li>
                    <li>
                      <a href="https://data.worldbank.org/topic/government" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-green-600 hover:text-green-800">
                        Banco Mundial - Gasto Público
                      </a>
                    </li>
                    <li>
                      <a href="https://ec.europa.eu/eurostat/web/government-finance-statistics" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-green-600 hover:text-green-800">
                        Eurostat - Finanzas Públicas
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-purple-50 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-purple-800">Modelo Suizo</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://www.efd.admin.ch/efd/en/home/finanzpolitik/public-finances.html" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-purple-600 hover:text-purple-800">
                        Swiss Federal Finance Administration
                      </a>
                    </li>
                    <li>
                      <a href="https://www.swissinfo.ch/eng/politics/how-switzerland-manages-its-public-finances/48213458" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-purple-600 hover:text-purple-800">
                        Sistema Federal Suizo
                      </a>
                    </li>
                    <li>
                      <a href="https://taxfoundation.org/switzerland-tax-system/" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-purple-600 hover:text-purple-800">
                        Sistema Fiscal Suizo
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Herramientas y Calculadoras</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-orange-50 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-orange-800">Simuladores</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://www.agenciatributaria.es/AEAT.internet/Renta.shtml" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-orange-600 hover:text-orange-800">
                        Calculadora de Impuestos
                      </a>
                    </li>
                    <li>
                      <a href="https://www.seg-social.es/wps/portal/wss/internet/Pensionistas/Pensiones/33467" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-orange-600 hover:text-orange-800">
                        Simulador de Pensiones
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-red-50 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-red-800">Informes Económicos</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://www.imf.org/en/Publications/FM" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-red-600 hover:text-red-800">
                        Informes FMI sobre Finanzas Públicas
                      </a>
                    </li>
                    <li>
                      <a href="https://www.worldbank.org/en/research/publication/fiscal-policy" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-red-600 hover:text-red-800">
                        Banco Mundial - Política Fiscal
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-indigo-50 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-indigo-800">Documentación</h4>
                  <ul className="space-y-3">
                    <li>
                      <a href="https://www.boe.es/biblioteca_juridica/codigos/codigo.php?id=334" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-indigo-600 hover:text-indigo-800">
                        Código de Legislación Presupuestaria
                      </a>
                    </li>
                    <li>
                      <a href="https://www.boe.es/biblioteca_juridica/codigos/codigo.php?id=058" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="text-indigo-600 hover:text-indigo-800">
                        Código de Contratos del Sector Público
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Análisis de Eficiencia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-yellow-50 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-yellow-800">Estudios Recientes</h4>
                  <div className="space-y-4">
                    <div className="border-b border-yellow-200 pb-4">
                      <h5 className="font-semibold text-yellow-900">Chandler Institute (2024)</h5>
                      <p className="text-yellow-700 mb-2">España ocupa el puesto 21 de 38 países OCDE en eficiencia gubernamental. Destaca en digitalización pero muestra debilidades en complejidad administrativa.</p>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 font-medium">Valoración:</span>
                        <div className="flex">
                          {"★★★☆☆"}
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-yellow-200 pb-4">
                      <h5 className="font-semibold text-yellow-900">Comisión Europea (2023)</h5>
                      <p className="text-yellow-700 mb-2">Ranking 16/27 en la UE. Puntos fuertes en servicios digitales, débil en gestión de personal público y contratación.</p>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-600 font-medium">Valoración:</span>
                        <div className="flex">
                          {"★★★☆☆"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-emerald-50 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4 text-emerald-800">Comparativas Internacionales</h4>
                  <div className="space-y-4">
                    <div className="border-b border-emerald-200 pb-4">
                      <h5 className="font-semibold text-emerald-900">IMF Government Efficiency (2023)</h5>
                      <p className="text-emerald-700 mb-2">Gasto público 44.3% del PIB vs. 41.7% media UE. Costes administrativos 3.2% superiores a la media europea.</p>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-medium">Valoración:</span>
                        <div className="flex">
                          {"★★☆☆☆"}
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-emerald-200 pb-4">
                      <h5 className="font-semibold text-emerald-900">World Bank Governance (2023)</h5>
                      <p className="text-emerald-700 mb-2">España destaca en servicios digitales pero necesita mejorar en eficiencia administrativa y reducción de burocracia.</p>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-medium">Valoración:</span>
                        <div className="flex">
                          {"★★★☆☆"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="metodologia" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Metodología</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6">¿Cómo funciona la Auditoría Ciudadana?</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-semibold mb-3">1. Análisis de Datos</h4>
                <p className="text-gray-600">
                  Utilizamos datos oficiales de presupuestos y ejecución presupuestaria de todas las administraciones públicas. 
                  Estos datos son procesados y analizados para identificar áreas de mejora y posible ahorro.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3">2. Propuestas Ciudadanas</h4>
                <p className="text-gray-600">
                  Cualquier ciudadano puede proponer medidas de ahorro. Cada propuesta debe incluir:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                  <li>Descripción detallada de la medida</li>
                  <li>Estimación del ahorro potencial</li>
                  <li>Ejemplos de éxito similares</li>
                  <li>Plan de implementación</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3">3. Verificación y Debate</h4>
                <p className="text-gray-600">
                  Las propuestas son sometidas a:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                  <li>Revisión por otros usuarios</li>
                  <li>Debate público</li>
                  <li>Verificación de datos</li>
                  <li>Evaluación de viabilidad</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3">4. Impacto</h4>
                <p className="text-gray-600">
                  Las mejores propuestas son:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                  <li>Presentadas a las administraciones competentes</li>
                  <li>Difundidas en medios de comunicación</li>
                  <li>Promovidas a través de iniciativas ciudadanas</li>
                  <li>Seguidas para verificar su implementación</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Sobre Nosotros</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6">Nuestra Misión</h3>
              <p className="text-gray-600 mb-8">
                Auditoría Ciudadana es una iniciativa independiente que busca mejorar la eficiencia del gasto público en España 
                a través de la participación ciudadana y el análisis de datos. Creemos en la transparencia, la participación 
                democrática y la gestión eficiente de los recursos públicos.
              </p>

              <h3 className="text-2xl font-semibold mb-6">Desarrollo</h3>
              <p className="text-gray-600 mb-8">
                Este sitio web fue desarrollado en su totalidad por Martin Varsavsky como un borrador inicial que irá mejorando con el tiempo. 
                Para su creación, se utilizó Bolt.dev, un programa de inteligencia artificial que ha permitido implementar las mejores 
                prácticas de desarrollo y diseño web. Esta combinación de experiencia humana y tecnología avanzada nos permite ofrecer 
                una plataforma robusta y eficiente para la participación ciudadana.
              </p>

              <h3 className="text-2xl font-semibold mb-6">Objetivos</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-4 mb-8">
                <li>Fomentar la transparencia en el gasto público</li>
                <li>Promover la participación ciudadana en la gestión pública</li>
                <li>Identificar y proponer medidas de ahorro y eficiencia</li>
                <li>Crear un espacio de debate constructivo sobre el uso de recursos públicos</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-6">Valores</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-4">
                <li>Independencia política</li>
                <li>Rigor en el análisis</li>
                <li>Transparencia en la metodología</li>
                <li>Participación inclusiva</li>
                <li>Constructivismo en las propuestas</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={handleNavigation} />
      <CookieConsent />
    </div>
  );
}

export default App;