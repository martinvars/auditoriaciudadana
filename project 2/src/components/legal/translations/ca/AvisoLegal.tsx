import React from 'react';

const AvisoLegalCA = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Avís Legal i Política de Privacitat</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Informació Legal</h2>
          <p className="text-gray-600 mb-4">
            En compliment de l'article 10 de la Llei 34/2002, d'11 de juliol, de Serveis de la Societat de la Informació i Comerç Electrònic, s'informa que Auditoria Ciutadana és una iniciativa promoguda per:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Responsable: Martín Varsavsky</li>
            <li>Domicili: [Adreça Legal]</li>
            <li>NIF: [Número Fiscal]</li>
            <li>Correu electrònic: martin@overture.life</li>
          </ul>
        </section>

        {/* Resto del contenido traducido al catalán */}
      </div>
    </div>
  );
};

export default AvisoLegalCA;