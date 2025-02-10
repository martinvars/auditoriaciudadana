import React from 'react';
import { X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: 'privacy' | 'cookies' | 'legal';
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const getTitle = () => {
    switch (content) {
      case 'privacy':
        return 'Política de Privacidad';
      case 'cookies':
        return 'Política de Cookies';
      case 'legal':
        return 'Aviso Legal';
    }
  };

  const getContent = () => {
    switch (content) {
      case 'privacy':
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-3">1. Responsable del Tratamiento</h3>
              <p>Auditoría Ciudadana S.L.</p>
              <p>CIF: B12345678</p>
              <p>Domicilio: Calle Principal 123, 28001 Madrid</p>
              <p>Email: camila.martinez@jazzya.com</p>
              <p>Delegado de Protección de Datos (DPO): camila.martinez@jazzya.com</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">2. Finalidad del Tratamiento</h3>
              <p className="mb-2">Sus datos personales serán tratados para:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Gestión de usuarios y propuestas de la plataforma</li>
                <li>Análisis estadístico agregado del uso del servicio</li>
                <li>Comunicaciones relacionadas con el servicio</li>
                <li>Mejora de la experiencia de usuario</li>
                <li>Cumplimiento de obligaciones legales</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">3. Legitimación</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Consentimiento del usuario (Art. 6.1.a RGPD)</li>
                <li>Ejecución de un contrato (Art. 6.1.b RGPD)</li>
                <li>Interés legítimo (Art. 6.1.f RGPD)</li>
                <li>Cumplimiento de obligaciones legales (Art. 6.1.c RGPD)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">4. Datos Tratados</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Datos identificativos: nombre/apodo</li>
                <li>Datos de contacto: email</li>
                <li>Datos de uso: propuestas, comentarios, votos</li>
                <li>Datos técnicos: IP, cookies técnicas esenciales</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">5. Conservación</h3>
              <p>Los datos se conservarán mientras:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>La cuenta permanezca activa</li>
                <li>No se solicite su supresión</li>
                <li>Sean necesarios para la finalidad</li>
                <li>Se requiera por obligación legal</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">6. Destinatarios</h3>
              <p>Sus datos podrán ser comunicados a:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Proveedores tecnológicos esenciales</li>
                <li>Administraciones públicas cuando sea obligatorio</li>
                <li>Fuerzas y cuerpos de seguridad en caso necesario</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">7. Derechos ARCO+</h3>
              <p className="mb-2">Puede ejercer sus derechos de:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Acceso</li>
                <li>Rectificación</li>
                <li>Cancelación</li>
                <li>Oposición</li>
                <li>Portabilidad</li>
                <li>Limitación del tratamiento</li>
              </ul>
              <p className="mt-2">
                Contacte con camila.martinez@jazzya.com o por correo postal a nuestra dirección.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">8. Reclamaciones</h3>
              <p>
                Puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es)
                si considera que sus derechos han sido vulnerados.
              </p>
            </section>
          </div>
        );

      case 'cookies':
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-3">1. ¿Qué son las cookies?</h3>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo
                para recordar preferencias y mejorar la experiencia de usuario.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">2. Tipos de Cookies que Utilizamos</h3>
              
              <h4 className="text-lg font-medium mt-4 mb-2">Cookies Técnicas (Necesarias)</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Sesión de usuario</li>
                <li>Preferencias técnicas</li>
                <li>Seguridad</li>
              </ul>

              <h4 className="text-lg font-medium mt-4 mb-2">Cookies Analíticas</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Estadísticas de uso anónimas</li>
                <li>Mejora del rendimiento</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">3. Base Legal</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Cookies técnicas: interés legítimo</li>
                <li>Cookies analíticas: consentimiento</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">4. Duración</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Cookies de sesión: hasta cerrar el navegador</li>
                <li>Cookies persistentes: máximo 2 años</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">5. Cómo Gestionar las Cookies</h3>
              <p>Puede configurar o deshabilitar las cookies en la configuración de su navegador:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Chrome: Configuración → Privacidad y seguridad</li>
                <li>Firefox: Opciones → Privacidad y Seguridad</li>
                <li>Safari: Preferencias → Privacidad</li>
                <li>Edge: Configuración → Privacidad y servicios</li>
              </ul>
            </section>
          </div>
        );

      case 'legal':
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-3">1. Información Legal</h3>
              <p>Auditoría Ciudadana S.L.</p>
              <p>CIF: B12345678</p>
              <p>Domicilio: Calle Principal 123, 28001 Madrid</p>
              <p>Email: camila.martinez@jazzya.com</p>
              <p>Inscrita en el Registro Mercantil de Madrid, Tomo 12345, Folio 67, Sección 8, Hoja M-123456</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">2. Condiciones de Uso</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Uso personal y no comercial</li>
                <li>Prohibido contenido ilegal o difamatorio</li>
                <li>Respeto a derechos de propiedad intelectual</li>
                <li>Uso responsable de la plataforma</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">3. Propiedad Intelectual</h3>
              <p>
                Todo el contenido de la plataforma está protegido por derechos de propiedad intelectual.
                Las propuestas y comentarios de usuarios se publican bajo licencia Creative Commons BY-SA 4.0.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">4. Responsabilidad</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>No garantizamos la exactitud de las propuestas</li>
                <li>Los usuarios son responsables de su contenido</li>
                <li>Nos reservamos el derecho de moderación</li>
                <li>No responsabilidad por contenido de terceros</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">5. Modificaciones</h3>
              <p>
                Nos reservamos el derecho de modificar estas condiciones.
                Los cambios serán notificados y entrarán en vigor tras su publicación.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">6. Legislación Aplicable</h3>
              <p>
                Estas condiciones se rigen por la legislación española.
                Cualquier disputa se someterá a los juzgados de Madrid.
              </p>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">{getTitle()}</h2>
        {getContent()}
      </div>
    </div>
  );
};

export default PrivacyModal;