import React from 'react';
import { ClipboardCheck, TrendingDown, LineChart, CheckCircle } from 'lucide-react';

const Methodology = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Guía para Propuestas de Ahorro Efectivas
        </h3>

        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <ClipboardCheck className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Criterios de Evaluación
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Viabilidad técnica y legal
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Impacto cuantificable en el presupuesto
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Mantenimiento de la calidad del servicio
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Periodo de implementación realista
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <TrendingDown className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Cálculo del Ahorro
              </h4>
              <p className="text-gray-600 mb-4">
                El ahorro debe calcularse de manera rigurosa, considerando:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Costes directos e indirectos actuales
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Costes de implementación de la propuesta
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Ahorro neto anual esperado
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Periodo de retorno de la inversión
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <LineChart className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Documentación Requerida
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Análisis detallado de la situación actual
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Plan de implementación por fases
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Estimaciones de ahorro documentadas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Referencias y casos de éxito similares
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;