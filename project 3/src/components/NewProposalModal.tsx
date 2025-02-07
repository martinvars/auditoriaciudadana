import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { profanityFilter } from '../utils/profanityFilter';
import { validateProposal } from '../utils/proposalValidation';

interface NewProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: string;
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

const NewProposalModal: React.FC<NewProposalModalProps> = ({ isOpen, onClose, level }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    savings: '',
    category: categories[level][0],
    details: '',
    nickname: user?.nickname || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warnings, setWarnings] = useState<string[]>([]);

  if (!isOpen) return null;

  const validateContent = (content: string, field: string): string[] => {
    const warnings: string[] = [];
    
    if (profanityFilter.hasProfanity(content)) {
      warnings.push(`El ${field} contiene lenguaje inapropiado`);
    }

    const upperCaseRatio = content.replace(/[^A-Z]/g, '').length / content.replace(/[^A-Za-z]/g, '').length;
    if (upperCaseRatio > 0.5 && content.length > 20) {
      warnings.push(`El ${field} tiene demasiadas mayúsculas`);
    }

    if (/(.)\1{4,}/.test(content)) {
      warnings.push(`El ${field} contiene caracteres repetitivos`);
    }

    if (field === 'description' && content.split(' ').length < 50) {
      warnings.push('La descripción es demasiado corta. Por favor, proporciona más detalles.');
    }

    const urlCount = (content.match(/https?:\/\/[^\s]+/g) || []).length;
    if (urlCount > 2) {
      warnings.push(`El ${field} contiene demasiados enlaces`);
    }

    return warnings;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nickname.trim()) {
      setError('Por favor, introduce un nombre o apodo');
      return;
    }

    setWarnings([]);
    setError('');

    const titleWarnings = validateContent(formData.title, 'título');
    const descriptionWarnings = validateContent(formData.description, 'descripción');
    const detailsWarnings = validateContent(formData.details, 'detalles');
    const nicknameWarnings = validateContent(formData.nickname, 'nombre/apodo');

    const allWarnings = [...titleWarnings, ...descriptionWarnings, ...detailsWarnings, ...nicknameWarnings];

    if (allWarnings.length > 0) {
      setWarnings(allWarnings);
      return;
    }

    const { isValid, error: validationError } = validateProposal({
      title: formData.title,
      description: formData.description,
      savings: parseInt(formData.savings),
      category: formData.category,
      level
    });

    if (!isValid) {
      setError(validationError || 'La propuesta no cumple con los criterios de calidad');
      return;
    }

    setLoading(true);

    try {
      // Get or generate user fingerprint for anonymous users
      let fingerprint = localStorage.getItem('userFingerprint');
      if (!fingerprint) {
        fingerprint = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('userFingerprint', fingerprint);
      }

      const nickname = user?.nickname || `${formData.nickname}_${fingerprint.substring(0, 6)}`;

      const { error: submitError } = await supabase
        .from('proposals')
        .insert({
          title: formData.title.trim(),
          description: formData.description.trim(),
          details: formData.details.trim(),
          savings: parseInt(formData.savings),
          category: formData.category,
          level: level,
          nickname: nickname,
          user_id: user?.id || null
        });

      if (submitError) throw submitError;
      
      onClose();
    } catch (err) {
      setError(err.message || 'Error al crear la propuesta');
    } finally {
      setLoading(false);
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

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Nueva Propuesta de Ahorro</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {warnings.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800 mb-2">
              <AlertTriangle size={20} />
              <span className="font-semibold">Advertencias:</span>
            </div>
            <ul className="list-disc list-inside text-yellow-700 space-y-1">
              {warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
              Tu Nombre o Apodo
            </label>
            <input
              type="text"
              id="nickname"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="¿Cómo quieres firmar esta propuesta?"
              required
              minLength={2}
              maxLength={50}
              pattern="[A-Za-zÀ-ÿ0-9\s\-_]{2,50}"
              title="Solo letras, números, espacios, guiones y guiones bajos"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título de la Propuesta
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Escribe un título descriptivo"
              required
              minLength={10}
              maxLength={200}
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción Detallada
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={6}
              placeholder="Explica tu propuesta en detalle, incluyendo:
1. Situación actual y problema
2. Solución propuesta
3. Ejemplos similares exitosos
4. Plan de implementación"
              required
              minLength={200}
              maxLength={4000}
            />
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
              Detalles Técnicos y Justificación
            </label>
            <textarea
              id="details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Proporciona detalles técnicos adicionales y justifica los ahorros estimados"
              required
              minLength={100}
              maxLength={2000}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
              step="1"
              min="1"
              max="100000"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || warnings.length > 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Publicando...' : 'Publicar Propuesta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProposalModal;