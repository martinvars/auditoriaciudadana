import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Euro, TrendingUp, AlertTriangle } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TaxOverview: React.FC = () => {
  const taxBurdenData = {
    labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Presión Fiscal (% PIB)',
        data: [31.2, 31.4, 32.1, 33.0, 33.6, 33.8, 33.4, 33.9, 34.6, 34.8, 36.6, 37.5, 38.3, 39.1],
        backgroundColor: '#2563eb',
      }
    ]
  };

  const realIncomeData = {
    labels: ['2004', '2006', '2008', '2010', '2012', '2014', '2016', '2018', '2020', '2022', '2023'],
    datasets: [
      {
        label: 'Renta Disponible Real (2004 = 100)',
        data: [100, 102, 101, 98, 94, 93, 94, 96, 93, 95, 94],
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        fill: true,
      },
      {
        label: 'Salario Medio Real (2004 = 100)',
        data: [100, 101, 99, 97, 92, 90, 89, 91, 88, 87, 85],
        borderColor: '#9333ea',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        fill: true,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            Evolución de la Presión Fiscal
          </h3>
          <div className="h-[400px]">
            <Bar data={taxBurdenData} options={chartOptions} />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Euro className="text-red-600" />
            Evolución de la Renta Real Después de Impuestos
          </h3>
          <div className="h-[400px]">
            <Line data={realIncomeData} options={chartOptions} />
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Análisis del Estancamiento</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• La renta disponible real se ha mantenido estancada durante dos décadas</li>
              <li>• El salario medio real ha caído un 15% desde 2004 ajustado por inflación</li>
              <li>• El aumento de la presión fiscal ha neutralizado las subidas salariales nominales</li>
              <li>• La inflación acumulada ha erosionado el poder adquisitivo</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Presión Fiscal Total</h4>
            <p className="text-2xl font-bold text-blue-600">39,1% PIB</p>
            <p className="text-sm text-blue-700 mt-1">+0,8% vs 2022</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Recaudación Total</h4>
            <p className="text-2xl font-bold text-green-600">523.000 M€</p>
            <p className="text-sm text-green-700 mt-1">+5,2% vs 2022</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">IRPF Máximo</h4>
            <p className="text-2xl font-bold text-purple-600">47%</p>
            <p className="text-sm text-purple-700 mt-1">+2% vs 2022</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">IVA General</h4>
            <p className="text-2xl font-bold text-orange-600">21%</p>
            <p className="text-sm text-orange-700 mt-1">Sin cambios</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Principales Impuestos</h4>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">IRPF</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Tramos: del 19% al 47%</li>
                  <li>• Mínimo exento: 12.450€</li>
                  <li>• Recaudación: 113.123 M€</li>
                  <li>• Retenciones trabajo: 15% a 47%</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">IVA</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• General: 21%</li>
                  <li>• Reducido: 10%</li>
                  <li>• Superreducido: 4%</li>
                  <li>• Recaudación: 85.456 M€</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">Sociedades</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Tipo general: 25%</li>
                  <li>• PYMES: 23%</li>
                  <li>• Recaudación: 35.234 M€</li>
                  <li>• Pagos fraccionados: 18%</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Otros Impuestos</h4>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">Impuestos Especiales</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Hidrocarburos: 0,379€/litro gasolina</li>
                  <li>• Alcohol: 958,94€/hectolitro</li>
                  <li>• Tabaco: 51% + 24,7€/1000 cigarrillos</li>
                  <li>• Recaudación total: 21.843 M€</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">Impuestos Patrimoniales</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Patrimonio: 0,2% a 3,5%</li>
                  <li>• Sucesiones: hasta 34%</li>
                  <li>• IBI: 0,4% a 1,3%</li>
                  <li>• Recaudación total: 14.567 M€</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-2">Cotizaciones Sociales</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Empresa: 29,9%</li>
                  <li>• Trabajador: 6,35%</li>
                  <li>• Autónomos: 30,6%</li>
                  <li>• Recaudación total: 173.456 M€</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-yellow-600" />
            <h4 className="text-lg font-semibold">Comparativa Internacional</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-semibold text-yellow-800 mb-2">Media UE</h5>
              <p className="text-sm text-yellow-700">
                La presión fiscal media en la UE es del 41,7% del PIB, 2,6 puntos superior a España.
                Sin embargo, los servicios públicos tienen mayor calidad y cobertura.
              </p>
            </div>
            <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-semibold text-yellow-800 mb-2">Tipos Impositivos</h5>
              <p className="text-sm text-yellow-700">
                España tiene tipos marginales superiores a la media europea en IRPF (47% vs 43,5%)
                pero menor recaudación efectiva por mayor economía sumergida.
              </p>
            </div>
            <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-semibold text-yellow-800 mb-2">Eficiencia Recaudatoria</h5>
              <p className="text-sm text-yellow-700">
                La brecha fiscal (diferencia entre recaudación potencial y real) es del 21,6% en España
                frente al 13,7% de media en la UE.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxOverview;