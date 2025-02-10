import React from 'react';
import { Line } from 'react-chartjs-2';
import { Euro, TrendingUp, AlertTriangle } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DebtOverview: React.FC = () => {
  const interestData = {
    labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Intereses Deuda (Miles de M€)',
        data: [19.6, 22.2, 26.1, 28.4, 31.0, 29.3, 27.9, 26.3, 25.8, 24.4, 25.2, 26.1, 29.3, 32.5],
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
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Euro className="text-purple-600" />
            Pago de Intereses
          </h3>
          <div className="h-[400px]">
            <Line data={interestData} options={chartOptions} />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Deuda Total</h4>
            <p className="text-2xl font-bold text-red-600">1,54 Billones €</p>
            <p className="text-sm text-red-700 mt-1">110,2% del PIB</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Intereses 2024</h4>
            <p className="text-2xl font-bold text-purple-600">32,5 MM€</p>
            <p className="text-sm text-purple-700 mt-1">+11% vs 2023</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Coste Medio</h4>
            <p className="text-2xl font-bold text-orange-600">2,11%</p>
            <p className="text-sm text-orange-700 mt-1">+0,3% vs 2023</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Vida Media</h4>
            <p className="text-2xl font-bold text-blue-600">7,9 años</p>
            <p className="text-sm text-blue-700 mt-1">-0,1 años vs 2023</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-yellow-600" />
            <h4 className="text-lg font-semibold">Riesgos Principales</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-semibold text-yellow-800 mb-2">Subida de Tipos</h5>
              <p className="text-sm text-yellow-700">
                Cada 1% de subida en tipos supone ~15.000M€ adicionales de intereses anuales cuando se refinancie toda la deuda.
              </p>
            </div>
            <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-semibold text-yellow-800 mb-2">Déficit Estructural</h5>
              <p className="text-sm text-yellow-700">
                El déficit crónico superior al 3% del PIB obliga a emitir nueva deuda continuamente, aumentando la carga de intereses.
              </p>
            </div>
            <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-semibold text-yellow-800 mb-2">Envejecimiento</h5>
              <p className="text-sm text-yellow-700">
                El aumento del gasto en pensiones y sanidad por envejecimiento poblacional presionará aún más el déficit y la deuda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtOverview;