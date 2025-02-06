import React, { useState } from 'react';
import { Building2, MapPin } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const budgetData = {
  nacional: {
    total: 459.769,
    categories: [
      { name: 'Pensiones', amount: 190.687, percentage: 41.5 },
      { name: 'Sanidad', amount: 87.356, percentage: 19.0 },
      { name: 'Educación', amount: 55.172, percentage: 12.0 },
      { name: 'Deuda Pública', amount: 31.275, percentage: 6.8 },
      { name: 'Desempleo', amount: 22.457, percentage: 4.9 },
      { name: 'Defensa', amount: 12.825, percentage: 2.8 },
      { name: 'Otros', amount: 59.997, percentage: 13.0 }
    ]
  },
  autonomico: {
    total: 236.854,
    categories: [
      { name: 'Andalucía', amount: 45.258, percentage: 19.1 },
      { name: 'Cataluña', amount: 41.025, percentage: 17.3 },
      { name: 'Madrid', amount: 25.738, percentage: 10.9 },
      { name: 'Valencia', amount: 21.321, percentage: 9.0 },
      { name: 'Galicia', amount: 14.167, percentage: 6.0 },
      { name: 'País Vasco', amount: 13.354, percentage: 5.6 },
      { name: 'Castilla y León', amount: 12.982, percentage: 5.5 },
      { name: 'Canarias', amount: 10.789, percentage: 4.6 },
      { name: 'Castilla-La Mancha', amount: 9.824, percentage: 4.1 },
      { name: 'Aragón', amount: 7.342, percentage: 3.1 },
      { name: 'Murcia', amount: 6.895, percentage: 2.9 },
      { name: 'Baleares', amount: 6.412, percentage: 2.7 },
      { name: 'Extremadura', amount: 6.125, percentage: 2.6 },
      { name: 'Asturias', amount: 5.321, percentage: 2.2 },
      { name: 'Navarra', amount: 4.987, percentage: 2.1 },
      { name: 'Cantabria', amount: 3.485, percentage: 1.5 },
      { name: 'La Rioja', amount: 1.829, percentage: 0.8 }
    ]
  },
  municipal: {
    total: 98.456,
    categories: [
      { name: 'Madrid', amount: 19.321, percentage: 19.6 },
      { name: 'Barcelona', amount: 15.234, percentage: 15.5 },
      { name: 'Valencia', amount: 8.965, percentage: 9.1 },
      { name: 'Sevilla', amount: 8.123, percentage: 8.3 },
      { name: 'Zaragoza', amount: 7.854, percentage: 8.0 },
      { name: 'Málaga', amount: 7.432, percentage: 7.5 },
      { name: 'Murcia', amount: 6.987, percentage: 7.1 },
      { name: 'Palma', amount: 6.543, percentage: 6.6 },
      { name: 'Las Palmas', amount: 6.234, percentage: 6.3 },
      { name: 'Bilbao', amount: 5.987, percentage: 6.1 }
    ]
  }
};

const BudgetOverview = () => {
  const [selectedLevel, setSelectedLevel] = useState('nacional');
  const data = budgetData[selectedLevel];

  const pieChartData = {
    labels: data.categories.map(cat => cat.name),
    datasets: [
      {
        data: data.categories.map(cat => cat.percentage),
        backgroundColor: [
          '#2563eb', // blue-600
          '#16a34a', // green-600
          '#dc2626', // red-600
          '#9333ea', // purple-600
          '#ea580c', // orange-600
          '#0891b2', // cyan-600
          '#4f46e5', // indigo-600
          '#c026d3', // fuchsia-600
          '#059669', // emerald-600
          '#d97706', // amber-600
          '#7c3aed', // violet-600
          '#db2777', // pink-600
          '#ca8a04', // yellow-600
          '#0284c7', // lightBlue-600
          '#9d174d', // rose-600
          '#0f766e', // teal-600
          '#4338ca', // indigo-600
        ],
      },
    ],
  };

  const barChartData = {
    labels: data.categories.map(cat => cat.name),
    datasets: [
      {
        label: 'Miles de millones €',
        data: data.categories.map(cat => cat.amount),
        backgroundColor: '#2563eb',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'nacional':
        return <Building2 size={20} />;
      case 'autonomico':
      case 'municipal':
        return <MapPin size={20} />;
      default:
        return null;
    }
  };

  const getLevelName = (level: string) => {
    switch (level) {
      case 'nacional':
        return 'Gobierno Nacional';
      case 'autonomico':
        return 'Comunidades Autónomas';
      case 'municipal':
        return 'Ayuntamientos';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 justify-center mb-8">
        {['nacional', 'autonomico', 'municipal'].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              selectedLevel === level
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            {getLevelIcon(level)}
            {getLevelName(level)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Presupuesto Total: {data.total.toFixed(3)} MM€
          </h3>
          <p className="text-gray-600">
            Desglose por {selectedLevel === 'nacional' ? 'principales categorías de gasto' : selectedLevel === 'autonomico' ? 'comunidades autónomas' : 'principales ayuntamientos'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[400px]">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Distribución Porcentual</h4>
            <Pie data={pieChartData} options={chartOptions} />
          </div>
          <div className="h-[400px]">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Gasto por {selectedLevel === 'nacional' ? 'Categoría' : selectedLevel === 'autonomico' ? 'Comunidad Autónoma' : 'Ayuntamiento'}</h4>
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;