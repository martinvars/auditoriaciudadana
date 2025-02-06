import React from 'react';

const AvisoLegalGL = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Aviso Legal e Política de Privacidade</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Información Legal</h2>
          <p className="text-gray-600 mb-4">
            En cumprimento do artigo 10 da Lei 34/2002, do 11 de xullo, de Servizos da Sociedade da Información e Comercio Electrónico, infórmase que Auditoría Cidadá é unha iniciativa promovida por:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Responsable: Martín Varsavsky</li>
            <li>Domicilio: [Enderezo Legal]</li>
            <li>NIF: [Número Fiscal]</li>
            <li>Correo electrónico: martin@overture.life</li>
          </ul>
        </section>

        {/* Resto del contenido traducido al gallego */}
      </div>
    </div>
  );
};

export default AvisoLegalGL;