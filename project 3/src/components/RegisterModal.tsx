import React, { useState } from 'react';
import { X, User, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [registrationType, setRegistrationType] = useState<'anonymous' | 'email'>('anonymous');
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (registrationType === 'anonymous') {
        // Store the nickname in localStorage for anonymous users
        localStorage.setItem('userNickname', formData.nickname);
        localStorage.setItem('isAnonymous', 'true');
        onClose();
      } else {
        // Email registration
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              nickname: formData.nickname || formData.email.split('@')[0]
            }
          }
        });

        if (error) throw error;
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Error durante el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Hazte Auditor</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-3 px-4 rounded-lg border ${
              registrationType === 'anonymous'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
            }`}
            onClick={() => setRegistrationType('anonymous')}
          >
            <div className="flex items-center justify-center gap-2">
              <User size={20} />
              Anónimo
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg border ${
              registrationType === 'email'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
            }`}
            onClick={() => setRegistrationType('email')}
          >
            <div className="flex items-center justify-center gap-2">
              <Mail size={20} />
              Email
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {registrationType === 'anonymous' ? (
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                Apodo
              </label>
              <input
                type="text"
                id="nickname"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tu apodo para auditar"
                required
                minLength={2}
                maxLength={50}
              />
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Registrarse'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Al registrarte, aceptas nuestros términos y condiciones y nuestra política de privacidad.
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;