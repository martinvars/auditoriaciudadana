import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Trash2, LogOut, RefreshCw } from 'lucide-react';

const AdminPanel = () => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'proposals' | 'comments'>('proposals');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'proposals') {
        const { data, error } = await supabase
          .from('proposals')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProposals(data || []);
      } else {
        const { data, error } = await supabase
          .from('comments')
          .select('*, proposals(title)')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setComments(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleDeleteProposal = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta propuesta?')) return;

    try {
      const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProposals(proposals.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting proposal:', error);
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) return;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setComments(comments.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-800">
              Panel de Administración
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <RefreshCw size={20} />
                Actualizar
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700"
              >
                <LogOut size={20} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('proposals')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'proposals'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Propuestas
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'comments'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600'
            }`}
          >
            Comentarios
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : activeTab === 'proposals' ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nivel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {proposals.map((proposal) => (
                  <tr key={proposal.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {proposal.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {proposal.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {proposal.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(proposal.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteProposal(proposal.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Propuesta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comentario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comments.map((comment) => (
                  <tr key={comment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {comment.proposals?.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xl truncate">
                        {comment.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;