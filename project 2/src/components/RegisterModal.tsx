import React, { useState } from 'react';
import { X, User, Mail, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister?: (data: { type: 'anonymous' | 'email', nickname?: string, email?: string }) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onRegister }) => {
  const [registrationType, setRegistrationType] = useState<'anonymous' | 'email'>('anonymous');
  const [formData, setFormData] = useState({
    nickname: localStorage.getItem('userNickname') || '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (registrationType === 'anonymous') {
        if (!formData.nickname.trim()) {
          throw new Error('Por favor, introduce un apodo');
        }
        if (formData.nickname.length < 3) {
          throw new Error('El apodo debe tener al menos 3 caracteres');
        }
        localStorage.setItem('userNickname', formData.nickname);
        onRegister?.({ type: 'anonymous', nickname: formData.nickname });
        onClose();
      } else {
        if (!formData.email.trim()) {
          throw new Error('Por favor, introduce un email');
        }
        if (!formData.password.trim()) {
          throw new Error('Por favor, introduce una contraseña');
        }
        if (formData.password.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres');
        }

        // Primero verificar si el usuario existe
        const { data: existingUser } = await supabase
          .from('users')
          .select('email')
          .eq('email', formData.email)
          .single();

        if (existingUser) {
          throw new Error('Este email ya está registrado. Por favor, usa otro o inicia sesión.');
        }

        // Registrar usuario en Supabase
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              nickname: formData.nickname || formData.email.split('@')[0]
            }
          }
        });

        if (signUpError) {
          if (signUpError.message.includes('already registered')) {
            throw new Error('Este email ya está registrado. Por favor, usa otro o inicia sesión.');
          }
          throw signUpError;
        }

        localStorage.setItem('userNickname', formData.nickname || formData.email.split('@')[0]);
        onRegister?.({ 
          type: 'email', 
          email: formData.email,
          nickname: formData.nickname || formData.email.split('@')[0]
        });
        onClose();
        
        // Mostrar mensaje de éxito
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 bg-green-600 text-white';
        notification.textContent = 'Registro exitoso. Ya puedes participar con tu cuenta.';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setError(error instanceof Error ? error.message : 'Error en el registro');
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

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Identifícate para Participar</h2>

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
              Con Apodo
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
              Con Email
            </div>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-start gap-2">
            <AlertCircle className="flex-shrink-0 w-5 h-5 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {registrationType === 'anonymous' ? (
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
                minLength={3}
                maxLength={50}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Este apodo aparecerá en tus propuestas y comentarios
              </p>
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
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                  Apodo (opcional)
                </label>
                <input
                  type="text"
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="¿Cómo quieres que te conozcan?"
                  minLength={3}
                  maxLength={50}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Si no eliges un apodo, se usará tu email
                </p>
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
                  minLength={6}
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Mínimo 6 caracteres
                </p>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Continuar'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Al continuar, aceptas nuestros términos y condiciones y nuestra política de privacidad.
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;