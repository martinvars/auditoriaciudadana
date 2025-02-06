import React, { useEffect, useState } from 'react';
import { BarChart, LineChart, Users, Clock, MousePointer, Globe } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { getAnalytics } from '../lib/analytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [stats, setStats] = useState({
    totalVisits: 0,
    activeUsers: 0,
    avgTimeOnSite: 0,
    bounceRate: 0,
  });

  const [dailyVisits, setDailyVisits] = useState([]);
  const [topPages, setTopPages] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const analytics = await getAnalytics();
      if (analytics) {
        setStats(prevStats => ({
          ...prevStats,
          totalVisits: analytics.totalVisits
        }));
        setDailyVisits(analytics.dailyVisits);
        setTopPages(analytics.topPages);
      }
    };

    fetchStats();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const visitsChartData = {
    labels: dailyVisits.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Visitas Diarias',
        data: dailyVisits.map(d => d.visits),
        fill: true,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const pagesChartData = {
    labels: topPages.map(p => p.path),
    datasets: [
      {
        label: 'Vistas por Página',
        data: topPages.map(p => p.views),
        backgroundColor: '#2563eb',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Estadísticas de Visitas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Visitas Totales</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalVisits.toLocaleString()}</h3>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Desde el lanzamiento
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Usuarios Activos</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.activeUsers}</h3>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            En este momento
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tiempo Promedio</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.avgTimeOnSite} min</h3>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Por sesión
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <MousePointer className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tasa de Rebote</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.bounceRate}%</h3>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Últimos 30 días
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Visitas Diarias</h3>
          <div className="h-[300px]">
            <Line data={visitsChartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Páginas Más Visitadas</h3>
          <div className="h-[300px]">
            <Bar data={pagesChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Desglose por Ubicación</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">País</th>
                <th className="text-left py-3 px-4">Visitas</th>
                <th className="text-left py-3 px-4">% del Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    España
                  </div>
                </td>
                <td className="py-3 px-4">12,456</td>
                <td className="py-3 px-4">81.8%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    Argentina
                  </div>
                </td>
                <td className="py-3 px-4">1,234</td>
                <td className="py-3 px-4">8.1%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    México
                  </div>
                </td>
                <td className="py-3 px-4">876</td>
                <td className="py-3 px-4">5.7%</td>
              </tr>
              <tr>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    Otros
                  </div>
                </td>
                <td className="py-3 px-4">668</td>
                <td className="py-3 px-4">4.4%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;