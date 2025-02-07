import React, { useState, useEffect } from 'react';
import { Euro, Building2, MapPin } from 'lucide-react';
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
  madrid: {
    total: 45.125,
    categories: [
      { name: 'Sanidad', amount: 17.153, percentage: 38.0 },
      { name: 'Educación', amount: 10.238, percentage: 22.7 },
      { name: 'Transportes', amount: 4.512, percentage: 10.0 },
      { name: 'Servicios Sociales', amount: 3.835, percentage: 8.5 },
      { name: 'Otros', amount: 9.387, percentage: 20.8 }
    ]
  },
  cataluna: {
    total: 47.825,
    categories: [
      { name: 'Sanidad', amount: 13.435, percentage: 28.1 },
      { name: 'Educación', amount: 8.417, percentage: 17.6 },
      { name: 'Deuda Pública', amount: 6.074, percentage: 12.7 },
      { name: 'Protección Social', amount: 4.591, percentage: 9.6 },
      { name: 'Otros', amount: 15.308, percentage: 32.0 }
    ]
  },
  andalucia: {
    total: 46.753,
    categories: [
      { name: 'Sanidad', amount: 13.223, percentage: 28.3 },
      { name: 'Educación', amount: 9.445, percentage: 20.2 },
      { name: 'Servicios Sociales', amount: 4.982, percentage: 10.7 },
      { name: 'Deuda Pública', amount: 4.625, percentage: 9.9 },
      { name: 'Otros', amount: 14.478, percentage: 30.9 }
    ]
  },
  valencia: {
    total: 29.732,
    categories: [
      { name: 'Sanidad', amount: 8.819, percentage: 29.7 },
      { name: 'Educación', amount: 6.072, percentage: 20.4 },
      { name: 'Deuda Pública', amount: 3.987, percentage: 13.4 },
      { name: 'Protección Social', amount: 2.854, percentage: 9.6 },
      { name: 'Otros', amount: 8.000, percentage: 26.9 }
    ]
  },
  galicia: {
    total: 14.167,
    categories: [
      { name: 'Sanidad', amount: 4.868, percentage: 34.4 },
      { name: 'Educación', amount: 2.821, percentage: 19.9 },
      { name: 'Protección Social', amount: 1.458, percentage: 10.3 },
      { name: 'Deuda Pública', amount: 1.245, percentage: 8.8 },
      { name: 'Otros', amount: 3.775, percentage: 26.6 }
    ]
  },
  paisvasco: {
    total: 15.354,
    categories: [
      { name: 'Sanidad', amount: 5.067, percentage: 33.0 },
      { name: 'Educación', amount: 3.777, percentage: 24.6 },
      { name: 'Protección Social', amount: 1.827, percentage: 11.9 },
      { name: 'Infraestructuras', amount: 1.290, percentage: 8.4 },
      { name: 'Otros', amount: 3.393, percentage: 22.1 }
    ]
  },
  baleares: {
    total: 7.133,
    categories: [
      { name: 'Sanidad', amount: 2.254, percentage: 31.6 },
      { name: 'Educación', amount: 1.427, percentage: 20.0 },
      { name: 'Turismo', amount: 0.856, percentage: 12.0 },
      { name: 'Protección Social', amount: 0.713, percentage: 10.0 },
      { name: 'Otros', amount: 1.883, percentage: 26.4 }
    ]
  }
};

const BudgetOverview: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState('nacional');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const data = budgetData[selectedLevel];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        position: isMobile ? 'bottom' : 'right' as const,
        labels: {
          font: {
            size: isMobile ? 12 : 14
          }
        }
      },
      tooltip: {
        bodyFont: {
          size: isMobile ? 12 : 14
        },
        titleFont: {
          size: isMobile ? 14 : 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: isMobile ? 12 : 14
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 12 : 14
          }
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => setSelectedLevel('nacional')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg ${
            selectedLevel === 'nacional'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          <Building2 size={20} />
          <span className="hidden sm:inline">Gobierno Nacional</span>
          <span className="sm:hidden">Nacional</span>
        </button>
        <button
          onClick={() => setSelectedLevel('madrid')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg ${
            selectedLevel === 'madrid'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          <MapPin size={20} />
          <span className="hidden sm:inline">Com. Madrid</span>
          <span className="sm:hidden">Madrid</span>
        </button>
        <button
          onClick={() => setSelectedLevel('cataluna')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg ${
            selectedLevel === 'cataluna'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          <MapPin size={20} />
          <span className="hidden sm:inline">Cataluña</span>
          <span className="sm:hidden">Cataluña</span>
        </button>
        <button
          onClick={() => setSelectedLevel('andalucia')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg ${
            selectedLevel === 'andalucia'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          <MapPin size={20} />
          <span className="hidden sm:inline">Andalucía</span>
          <span className="sm:hidden">Andalucía</span>
        </button>
        <button
          onClick={() => setSelectedLevel('valencia')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg ${
            selectedLevel === 'valencia'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          <MapPin size={20} />
          <span className="hidden sm:inline">C. Valenciana</span>
          <span className="sm:hidden">Valencia</span>
        </button>
        <button
          onClick={() => setSelectedLevel('galicia')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg ${
            selectedLevel === 'galicia'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          <MapPin size={20} />
          <span className="hidden sm:inline">Galicia</span>
          <span className="sm:hidden">Galicia</span>
        </button>
        <button
          onClick={() => setSelectedLevel('paisvasco')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg ${
            selectedLevel === 'paisvasco'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          <MapPin size={20} />
          <span className="hidden sm:inline">País Vasco</span>
          <span className="sm:hidden">P.Vasco</span>
        </button>
        <button
          onClick={() => setSelectedLevel('baleares')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg ${
            selectedLevel === 'baleares'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          <MapPin size={20} />
          <span className="hidden sm:inline">Baleares</span>
          <span className="sm:hidden">Baleares</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Presupuesto Total: {data.total.toFixed(3)} MM€
          </h3>
          <p className="text-gray-600">
            Desglose por principales categorías de gasto
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[400px] min-h-[400px]">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Distribución Porcentual</h4>
            <div className="h-full">
              <Pie data={pieChartData} options={chartOptions} />
            </div>
          </div>
          <div className="h-[400px] min-h-[400px]">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Gasto por Categoría</h4>
            <div className="h-full">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {data.categories.map((category) => (
            <div key={category.name} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">{category.name}</span>
                <Euro size={20} className="text-blue-600" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                {category.amount.toFixed(3)} MM€
              </div>
              <div className="text-sm text-gray-500">
                {category.percentage}% del total
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;