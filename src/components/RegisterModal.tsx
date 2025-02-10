import React, { useState } from 'react';
import { X, Mail, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [registrationType, setRegistrationType] = useState<'anonymous' | 'email'>('email');
  const [formData, setFormData] = useState({
    nickname: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

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
        // Email registration with magic link
        const { error: authError } = await supabase.auth.signInWithOtp({
          email: formData.email,
          options: {
            emailRedirectTo: window.location.origin,
          }
        });

        if (authError) throw authError;

        // Subscribe to notifications
        const { error: subError } = await supabase
          .from('subscribers')
          .insert([{ 
            email: formData.email, 
            notifications_enabled: true 
          }]);

        if (subError && !subError.message.includes('unique constraint')) {
          throw subError;
        }

        setSent(true);
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

        {registrationType === 'anonymous' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
            >
              {loading ? 'Procesando...' : 'Continuar como Anónimo'}
            </button>
          </form>
        ) : sent ? (
          <div className="text-center">
            <div className="mb-4 text-green-600">
              <Mail size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">¡Revisa tu email!</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Te hemos enviado un enlace mágico a {formData.email}. 
              Haz clic en el enlace para acceder a tu cuenta.
            </p>
            <p className="text-sm text-gray-500">
              Si no lo encuentras, revisa tu carpeta de spam.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar enlace mágico'}
            </button>
          </form>
        )}

        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>Al registrarte, aceptas nuestros términos y condiciones y nuestra política de privacidad.</p>
          {!sent && registrationType === 'email' && (
            <p className="mt-2 text-blue-600">
              Recibirás notificaciones de nuevas propuestas de ahorro.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;