import React, { useState } from 'react';
import { X, HelpCircle, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { profanityFilter } from '../utils/profanityFilter';
import { validateAndImproveProposal } from '../utils/proposalValidator';
import { sendProposalNotification } from '../utils/emailNotifications';

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
    nickname: user?.nickname || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warnings, setWarnings] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setWarnings([]);

    if (!formData.nickname.trim()) {
      setError('Por favor, introduce un nombre o apodo');
      return;
    }

    const proposalData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      savings: parseInt(formData.savings),
      category: formData.category,
      level
    };

    // Validate and improve proposal
    const validationResult = await validateAndImproveProposal(proposalData);
    
    if (!validationResult.isValid) {
      setError(validationResult.error || 'Propuesta inválida');
      return;
    }

    if (validationResult.improvedProposal) {
      if (!window.confirm(
        `${validationResult.error}\n\n¿Deseas continuar con la propuesta mejorada?`
      )) {
        return;
      }
      // Use improved proposal
      proposalData.description = validationResult.improvedProposal.description;
      proposalData.savings = validationResult.improvedProposal.savings;
    }

    setLoading(true);

    try {
      let fingerprint = localStorage.getItem('userFingerprint');
      if (!fingerprint) {
        fingerprint = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('userFingerprint', fingerprint);
      }

      const nickname = user?.nickname || `${formData.nickname}_${fingerprint.substring(0, 6)}`;

      const { data: newProposal, error: submitError } = await supabase
        .from('proposals')
        .insert({
          title: proposalData.title,
          description: proposalData.description,
          details: proposalData.description,
          savings: proposalData.savings,
          category: proposalData.category,
          level: proposalData.level,
          nickname: nickname,
          user_id: user?.id || null
        })
        .select()
        .single();

      if (submitError) throw submitError;

      // Send email notification
      await sendProposalNotification(newProposal);
      
      onClose();
    } catch (err) {
      setError(err.message || 'Error al crear la propuesta');
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
          <h2 className="text-2xl font-bold text-gray-800">Nueva Propuesta de Ahorro</h2>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="text-blue-600 hover:text-blue-700"
            title="Ver ayuda"
          >
            <HelpCircle size={24} />
          </button>
        </div>

        {/* AI Suggestion Box */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-blue-800 mb-2">
            <Sparkles className="text-blue-600" size={20} />
            <h3 className="font-semibold">Consejo para una mejor propuesta</h3>
          </div>
          <p className="text-blue-700 text-sm">
            Cuando tengas tu idea de cómo combatir el despilfarro socialista, te recomendamos usar tu IA favorita (ChatGPT, Claude, etc.) para escribir la propuesta en detalle y con cifras de ahorro razonables dentro del presupuesto español. Esto te ayudará a:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-blue-700">
            <li>• Estructurar mejor tu propuesta</li>
            <li>• Incluir datos y referencias relevantes</li>
            <li>• Calcular ahorros realistas</li>
            <li>• Mejorar la claridad y el impacto</li>
          </ul>
        </div>

        {showHelp && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm">
            <h3 className="font-semibold mb-2">Consejos para una buena propuesta:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Título breve y claro que resuma la propuesta</li>
              <li>• Descripción concisa del ahorro propuesto</li>
              <li>• Incluye ejemplos o referencias si los tienes</li>
              <li>• Estima el ahorro de forma realista</li>
              <li>• Usa un lenguaje respetuoso y constructivo</li>
            </ul>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {warnings.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="¿Cómo quieres firmar esta propuesta?"
              required
              minLength={2}
              maxLength={50}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Escribe un título breve y claro"
              required
              minLength={5}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              Descripción de la Propuesta
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={6}
              placeholder="Explica brevemente tu propuesta de ahorro. Puedes incluir:
- Qué propones cambiar o mejorar
- Cómo se lograría el ahorro
- Ejemplos similares si los conoces"
              required
              minLength={20}
              maxLength={4000}
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
              placeholder="0"
              step="1"
              min="1"
              max="100000"
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
              disabled={loading || warnings.length > 0}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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