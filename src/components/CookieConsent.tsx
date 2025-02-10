import React, { useEffect, useState } from 'react';

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          <p>
            Utilizamos cookies técnicas esenciales para el funcionamiento del sitio y cookies analíticas
            para mejorar nuestros servicios. Puede aceptar todas las cookies o configurar sus preferencias.
            Para más información, consulte nuestra{' '}
            <button className="text-blue-600 hover:underline">política de cookies</button>.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Solo Esenciales
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Aceptar Todas
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;