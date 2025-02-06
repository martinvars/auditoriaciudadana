import React from 'react';
import { BookOpen, Globe, FileText, Video, Calculator, Library, BarChart } from 'lucide-react';

const Resources = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Recursos para el Análisis del Gasto Público
        </h2>

        <div className="space-y-12">
          {/* Informes Oficiales */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-800">Informes Oficiales sobre el Gasto Público en España</h3>
            </div>
            <div className="space-y-4">
              <a href="https://www.hacienda.gob.es" target="_blank" rel="noopener noreferrer" 
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">Ministerio de Hacienda - Presupuestos Generales del Estado</h4>
                <p className="text-gray-600">Información detallada sobre los ingresos y gastos del Gobierno de España.</p>
              </a>
              
              <a href="https://www.igae.pap.hacienda.gob.es" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">Intervención General de la Administración del Estado (IGAE)</h4>
                <p className="text-gray-600">Datos sobre la ejecución del presupuesto, deuda pública y más.</p>
              </a>

              <a href="https://www.bde.es" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">Banco de España - Datos sobre Deuda Pública</h4>
                <p className="text-gray-600">Estadísticas sobre la deuda de España, comparaciones y evolución histórica.</p>
              </a>

              <a href="https://www.airef.es" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">AIReF (Autoridad Independiente de Responsabilidad Fiscal)</h4>
                <p className="text-gray-600">Análisis sobre sostenibilidad de las finanzas públicas y eficiencia del gasto.</p>
              </a>
            </div>
          </section>

          {/* Comparación Internacional */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-800">Comparación Internacional del Gasto Público</h3>
            </div>
            <div className="space-y-4">
              <a href="https://data.oecd.org" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">OCDE - Estadísticas de Finanzas Públicas</h4>
                <p className="text-gray-600">Comparación del gasto público en países de la OCDE, incluyendo España y Suiza.</p>
              </a>

              <a href="https://datos.bancomundial.org" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">Banco Mundial - Gasto Público por País</h4>
                <p className="text-gray-600">Datos sobre porcentaje de gasto público respecto al PIB.</p>
              </a>

              <a href="https://ec.europa.eu/eurostat" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">Eurostat - Finanzas Públicas en Europa</h4>
                <p className="text-gray-600">Comparaciones de ingresos, gastos y deuda entre países de la UE y Suiza.</p>
              </a>
            </div>
          </section>

          {/* El Modelo Suizo */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <BarChart className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-800">El Modelo Suizo: Menos Gasto y Más Eficiencia</h3>
            </div>
            <div className="space-y-4">
              <a href="https://www.efv.admin.ch" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">Swiss Federal Finance Administration (SFFA)</h4>
                <p className="text-gray-600">Datos oficiales sobre el presupuesto y gasto público suizo.</p>
              </a>

              <a href="https://www.swissinfo.ch" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">Comparación del Sistema Federal Suizo vs. España</h4>
                <p className="text-gray-600">Suiza tiene menos funcionarios y un sistema de gestión descentralizado pero eficiente.</p>
              </a>
            </div>
          </section>

          {/* Herramientas */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-800">Herramientas para Analizar el Gasto Público</h3>
            </div>
            <div className="space-y-4">
              <a href="https://www.presupuestoabierto.gob.es" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">Calculadora de Presupuesto Ciudadano</h4>
                <p className="text-gray-600">Simula cómo se distribuye el presupuesto del Estado.</p>
              </a>

              <a href="https://openspending.org" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">Open Spending - Datos abiertos sobre gasto público</h4>
                <p className="text-gray-600">Accede a información de gasto en miles de países.</p>
              </a>
            </div>
          </section>

          {/* Lecturas Recomendadas */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Library className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-800">Lecturas Recomendadas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Camino de Servidumbre – F. Hayek</h4>
                <p className="text-gray-600">Crítica a la expansión del Estado y su impacto en la economía.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">El Estado contra la Libertad – J.R. Rallo</h4>
                <p className="text-gray-600">Análisis sobre cómo reducir el tamaño del Estado.</p>
              </div>
            </div>
          </section>

          {/* Documentales */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Video className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold text-gray-800">Documentales y Videos</h3>
            </div>
            <div className="space-y-4">
              <a href="https://www.youtube.com/watch?v=9HqOhJ5Hapw" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">Switzerland: The Best Country in the World?</h4>
                <p className="text-gray-600">Explica por qué Suiza tiene un modelo eficiente de Estado.</p>
              </a>

              <a href="https://www.youtube.com/watch?v=Zn58DJG38uE" target="_blank" rel="noopener noreferrer"
                 className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-gray-800 mb-2">España: ¿País de Funcionarios?</h4>
                <p className="text-gray-600">Explica el crecimiento del sector público en España.</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resources;