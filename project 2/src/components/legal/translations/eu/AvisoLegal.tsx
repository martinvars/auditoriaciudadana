import React from 'react';

const AvisoLegalEU = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Lege Oharra eta Pribatutasun Politika</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Lege Informazioa</h2>
          <p className="text-gray-600 mb-4">
            Informazioaren Gizartearen eta Merkataritza Elektronikoaren Zerbitzuei buruzko uztailaren 11ko 34/2002 Legearen 10. artikulua betez, Herritarren Auditoretza Martín Varsavsky-k sustatutako ekimena dela jakinarazten da:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li>Arduraduna: Martín Varsavsky</li>
            <li>Helbidea: [Lege Helbidea]</li>
            <li>IFZ: [Zerga Zenbakia]</li>
            <li>Posta elektronikoa: martin@overture.life</li>
          </ul>
        </section>

        {/* Resto del contenido traducido al euskera */}
      </div>
    </div>
  );
};

export default AvisoLegalEU;