import React from 'react';

const Terminos = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Términos y Condiciones de Uso</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Aceptación de los términos</h2>
          <p className="text-gray-600 mb-4">
            Al acceder y utilizar Auditoría Ciudadana, aceptas cumplir estos términos y condiciones de uso. Si no estás de acuerdo con alguna parte de los términos, no podrás acceder al servicio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Normas de participación</h2>
          <p className="text-gray-600 mb-4">
            Como usuario de la plataforma, te comprometes a:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Proporcionar información veraz y fundamentada en tus propuestas</li>
            <li>No publicar contenido difamatorio, abusivo, o que incite al odio</li>
            <li>Respetar los derechos de propiedad intelectual</li>
            <li>No utilizar la plataforma para fines políticos partidistas</li>
            <li>No publicar información confidencial o datos personales de terceros</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Propuestas y contenidos</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Al publicar una propuesta o comentario en la plataforma:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Mantienes tus derechos de propiedad intelectual sobre el contenido</li>
              <li>Otorgas a Auditoría Ciudadana una licencia mundial, no exclusiva y transferible para usar, reproducir y distribuir dicho contenido</li>
              <li>Aceptas que otros usuarios puedan ver, comentar y votar tu propuesta</li>
              <li>Te responsabilizas de la veracidad y exactitud de la información proporcionada</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Moderación y eliminación de contenido</h2>
          <p className="text-gray-600 mb-4">
            Nos reservamos el derecho a:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Moderar y eliminar contenido que incumpla estas normas</li>
            <li>Suspender o cancelar cuentas de usuarios que violen los términos</li>
            <li>Modificar o eliminar propuestas que contengan información incorrecta o engañosa</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Modificaciones</h2>
          <p className="text-gray-600">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación. El uso continuado de la plataforma después de cualquier modificación constituirá tu aceptación de los nuevos términos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Contacto</h2>
          <p className="text-gray-600 mb-4">
            Para cualquier duda sobre estos términos, puedes contactar con nosotros en martin@overture.life
          </p>
          <p className="text-gray-600">
            Última actualización: Marzo 2024
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terminos;