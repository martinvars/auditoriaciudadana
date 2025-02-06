import React from 'react';

const Cookies = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Política de Cookies</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. ¿Qué son las cookies?</h2>
          <p className="text-gray-600 mb-4">
            Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo cuando los visita. Sirven para recordar sus preferencias y mejorar su experiencia de navegación.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Tipos de cookies que utilizamos</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Cookies técnicas (necesarias)</h3>
              <p className="text-gray-600">
                Son esenciales para el funcionamiento básico del sitio y se activan automáticamente cuando utiliza esta web.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Cookies de autenticación</h3>
              <p className="text-gray-600">
                Permiten mantener su sesión iniciada y recordar sus preferencias de inicio de sesión.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Cookies analíticas</h3>
              <p className="text-gray-600">
                Nos ayudan a entender cómo interactúan los usuarios con el sitio web, utilizando datos anónimos para mejorar su funcionamiento.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Control de cookies</h2>
          <p className="text-gray-600 mb-4">
            Puede configurar su navegador para bloquear o alertar sobre estas cookies, pero algunas partes del sitio no funcionarán correctamente si lo hace.
          </p>
          <p className="text-gray-600">
            Para modificar sus preferencias de cookies en este sitio, puede utilizar el panel de configuración accesible desde el botón "Configurar cookies" en el banner de cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Más información</h2>
          <p className="text-gray-600 mb-4">
            Para cualquier duda sobre nuestra política de cookies, puede contactar con nosotros en martin@overture.life
          </p>
          <p className="text-gray-600">
            Última actualización: Marzo 2024
          </p>
        </section>
      </div>
    </div>
  );
};

export default Cookies;