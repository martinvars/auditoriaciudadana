import React, { useState } from 'react';
import { X } from 'lucide-react';
import { moderateContent } from '../lib/moderation';
import { supabase } from '../lib/supabase';

interface NewProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: string;
}

const categories = {
  nacional: [
    'Administración',
    'Empresas Públicas',
    'Pensiones',
    'Subvenciones',
    'Comunicación',
    'Infraestructuras',
    'Empleo',
    'Justicia',
    'Sanidad',
    'Cooperación',
    'Contratación',
    'Deportes',
    'Otros'
  ],
  autonomico: [
    'Administración',
    'Sanidad',
    'Educación',
    'Transportes',
    'Servicios Sociales',
    'Cultura',
    'Medio Ambiente',
    'Vivienda',
    'Empleo',
    'Otros'
  ],
  municipal: [
    'Administración',
    'Urbanismo',
    'Servicios Municipales',
    'Transporte',
    'Cultura y Deportes',
    'Medio Ambiente',
    'Seguridad',
    'Servicios Sociales',
    'Otros'
  ]
};

const MAX_SAVINGS = 100000; // 100.000 millones de euros

const NewProposalModal = ({ isOpen, onClose, level }: NewProposalModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    savings: '',
    category: categories[level][0],
    nickname: localStorage.getItem('userNickname') || ''
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateContent = (text: string): boolean => {
    const result = moderateContent(text);
    if (!result.isValid) {
      setError(result.reason || 'Contenido no válido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // Validar nickname
      if (!formData.nickname.trim()) {
        setError('Por favor, introduce un apodo');
        setSubmitting(false);
        return;
      }

      if (!validateContent(formData.nickname)) {
        setSubmitting(false);
        return;
      }

      // Validar título
      if (!validateContent(formData.title)) {
        setSubmitting(false);
        return;
      }

      // Validar descripción
      if (!validateContent(formData.description)) {
        setSubmitting(false);
        return;
      }

      // Validar detalles
      if (!validateContent(formData.details)) {
        setSubmitting(false);
        return;
      }

      // Validar ahorro
      const savings = parseFloat(formData.savings);
      if (isNaN(savings) || savings <= 0) {
        setError('El ahorro debe ser un número positivo');
        setSubmitting(false);
        return;
      }

      // Validar límite máximo de ahorro
      if (savings > MAX_SAVINGS) {
        setError(`El ahorro no puede ser superior a ${MAX_SAVINGS.toLocaleString()} millones de euros`);
        setSubmitting(false);
        return;
      }

      // Guardar nickname en localStorage
      localStorage.setItem('userNickname', formData.nickname);

      const { data, error: insertError } = await supabase
        .from('proposals')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            details: formData.details,
            savings: savings,
            category: formData.category,
            level: level,
            user_id: null,
            nickname: formData.nickname
          }
        ])
        .select();

      if (insertError) {
        console.error('Error details:', insertError);
        throw new Error(insertError.message);
      }

      if (data) {
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
      setError(error instanceof Error ? error.message : 'Error al guardar la propuesta. Por favor, inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Nueva Propuesta de Ahorro
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
              Tu Apodo
            </label>
            <input
              type="text"
              id="nickname"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="¿Cómo quieres que te conozcan?"
              maxLength={50}
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Título descriptivo de la propuesta"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              placeholder="Descripción detallada de la propuesta de ahorro"
              required
            />
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
              Detalles de Implementación
            </label>
            <textarea
              id="details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
              placeholder="Detalles sobre cómo implementar la propuesta"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {categories[level].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="savings" className="block text-sm font-medium text-gray-700 mb-1">
                Ahorro Estimado (M€)
              </label>
              <input
                type="number"
                id="savings"
                value={formData.savings}
                onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.000"
                step="0.001"
                min="0"
                max={MAX_SAVINGS}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Máximo: {MAX_SAVINGS.toLocaleString()} millones de euros
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Guardando...' : 'Guardar Propuesta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProposalModal;