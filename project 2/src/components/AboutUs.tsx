import React from 'react';
import { Users, Target, TrendingDown, BarChart } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Iniciativa de Martín Varsavsky
          </h3>
          <p className="text-gray-600">
            Auditoría Ciudadana es una iniciativa impulsada por Martín Varsavsky, empresario y ciudadano español comprometido con la eficiencia y transparencia en el sector público. Preocupado por el crecimiento desmedido del aparato estatal, el déficit crónico, y la proliferación de organismos públicos innecesarios, Varsavsky busca crear una plataforma donde los ciudadanos puedan proponer y analizar medidas concretas de ahorro y mejora en la gestión pública.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Misión</h4>
              <p className="text-gray-600">
                Promover la eficiencia y transparencia en el gasto público a través de la participación ciudadana activa y propuestas fundamentadas de ahorro.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <TrendingDown className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Objetivos</h4>
              <p className="text-gray-600">
                Identificar y eliminar gastos superfluos, reducir la duplicidad de funciones y mejorar la calidad de los servicios públicos.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Problemas que Abordamos</h4>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Crecimiento del Sector Público</h5>
              <p className="text-gray-600">
                El continuo aumento del tamaño y coste del sector público, que no siempre se traduce en mejores servicios para los ciudadanos.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Déficit Estructural</h5>
              <p className="text-gray-600">
                El persistente déficit público que compromete la sostenibilidad financiera del Estado y las futuras generaciones.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Calidad de Servicios</h5>
              <p className="text-gray-600">
                La necesidad de mejorar la eficiencia y calidad de los servicios públicos sin aumentar el gasto.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-800 mb-2">Duplicidad Administrativa</h5>
              <p className="text-gray-600">
                La multiplicación de organismos y estructuras administrativas que generan redundancias y gastos innecesarios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;