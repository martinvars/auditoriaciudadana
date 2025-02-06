import React from 'react';

const AvisoLegal = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Aviso Legal y Política de Privacidad</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Información Legal</h2>
          <p className="text-gray-600 mb-4">
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico, se informa que Auditoría Ciudadana es una iniciativa promovida por:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Responsable: Martín Varsavsky</li>
            <li>Domicilio: [Dirección Legal]</li>
            <li>NIF: [Número Fiscal]</li>
            <li>Email: martin@overture.life</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Protección de Datos</h2>
          <p className="text-gray-600 mb-4">
            En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), le informamos que:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Los datos personales proporcionados serán tratados con la finalidad de gestionar su participación en la plataforma.</li>
            <li>La base legal para el tratamiento es su consentimiento expreso.</li>
            <li>Los datos se conservarán mientras mantenga su cuenta activa o durante los plazos legalmente establecidos.</li>
            <li>No se cederán datos a terceros salvo obligación legal.</li>
            <li>Puede ejercer sus derechos de acceso, rectificación, supresión, portabilidad, limitación y oposición contactando a través de martin@overture.life</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Propiedad Intelectual</h2>
          <p className="text-gray-600 mb-4">
            Todos los contenidos del sitio web están protegidos por derechos de propiedad intelectual. Las propuestas y comentarios publicados por los usuarios se comparten bajo una licencia Creative Commons Attribution 4.0 International.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Limitación de Responsabilidad</h2>
          <p className="text-gray-600">
            Auditoría Ciudadana no se hace responsable de la veracidad y exactitud de las propuestas y comentarios publicados por los usuarios, que son responsabilidad exclusiva de sus autores. Nos reservamos el derecho de modificar o eliminar contenido que incumpla nuestras normas de uso o la legislación vigente.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AvisoLegal;