import React from 'react';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header';
import Hero from './components/Hero';
import ProposalsList from './components/ProposalsList';
import BudgetOverview from './components/BudgetOverview';
import Methodology from './components/Methodology';
import Resources from './components/Resources';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

function App() {
  const { user } = useAuth();

  // Si el usuario está autenticado y es admin, mostrar el panel de administración
  if (user?.email === 'admin@auditoria-ciudadana.org') {
    return <AdminPanel />;
  }

  // Si estamos en la ruta /admin y no estamos autenticados, mostrar el login
  if (window.location.pathname === '/admin') {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      <main className="container mx-auto px-4 py-8">
        <section id="proposals" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Propuestas de Ahorro</h2>
          <ProposalsList />
        </section>

        <section id="presupuestos" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Presupuestos 2024</h2>
          <BudgetOverview />
        </section>

        <section id="metodologia" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Metodología</h2>
          <Methodology />
        </section>

        <section id="recursos" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Recursos</h2>
          <Resources />
        </section>

        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Sobre Nosotros</h2>
          <AboutUs />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;