import React, { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface EditProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: {
    id: string;
    title: string;
    description: string;
    savings: number;
    category: string;
    level: string;
  };
}

const categories = {
  nacional: [
    'Administración',
    'Contratación',
    'Defensa',
    'Infraestructuras',
    'Otros'
  ],
  autonomico: [
    'Sanidad',
    'Educación',
    'Transportes',
    'Servicios Sociales',
    'Otros'
  ],
  municipal: [
    'Transporte',
    'Infraestructura',
    'Servicios Municipales',
    'Cultura',
    'Otros'
  ]
};

const EditProposalModal: React.FC<EditProposalModalProps> = ({ isOpen, onClose, proposal }) => {
  const [formData, setFormData] = useState({
    title: proposal.title,
    description: proposal.description,
    savings: proposal.savings.toString(),
    category: proposal.category,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Por favor, introduce un título para la propuesta');
      return;
    }

    if (!formData.description.trim()) {
      setError('Por favor, describe tu propuesta de ahorro');
      return;
    }

    if (!formData.savings) {
      setError('Por favor, indica el ahorro estimado en millones de euros');
      return;
    }

    const savingsAmount = parseInt(formData.savings);

    if (savingsAmount > 10000) {
      setError('El ahorro máximo permitido por propuesta es de 10.000M€');
      return;
    }

    setLoading(true);

    try {
      const { error: submitError } = await supabase
        .from('proposals')
        .update({
          title: formData.title.trim(),
          description: formData.description.trim(),
          details: formData.description.trim(),
          savings: savingsAmount,
          category: formData.category,
        })
        .eq('id', proposal.id);

      if (submitError) throw submitError;
      
      onClose();
    } catch (err) {
      setError(err.message || 'Error al actualizar la propuesta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Editar Propuesta</h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título de la Propuesta
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {categories[proposal.level].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción de la Propuesta
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={6}
              required
            />
          </div>

          <div>
            <label htmlFor="savings" className="block text-sm font-medium text-gray-700 mb-1">
              Ahorro Estimado (millones €)
            </label>
            <input
              type="number"
              id="savings"
              value={formData.savings}
              onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProposalModal;