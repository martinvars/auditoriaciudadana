import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Building2, MapPin, Plus, ChevronLeft, ChevronRight, Link, Trash2, AlertCircle } from 'lucide-react';
import NewProposalModal from './NewProposalModal';
import RegisterModal from './RegisterModal';
import { moderateContent } from '../lib/moderation';
import { supabase } from '../lib/supabase';

const ITEMS_PER_PAGE = 10;

const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true
  }).format(amount);
};

const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
  const notification = document.createElement('div');
  notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
    type === 'success' ? 'bg-green-600' : 'bg-red-600'
  } text-white`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const ProposalsList = () => {
  const [selectedLevel, setSelectedLevel] = useState('nacional');
  const [isNewProposalModalOpen, setIsNewProposalModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'comment' | 'proposal' | null>(null);
  const [showComments, setShowComments] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [proposals, setProposals] = useState<any[]>([]);
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, [selectedLevel]);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const { data: proposalsData, error } = await supabase
        .from('proposals')
        .select(`
          *,
          votes:votes(vote_type),
          comments:comments(count)
        `)
        .eq('level', selectedLevel);

      if (error) throw error;

      const processedProposals = proposalsData.map(proposal => ({
        ...proposal,
        upvotes: proposal.votes?.filter(v => v.vote_type === 'up').length || 0,
        downvotes: proposal.votes?.filter(v => v.vote_type === 'down').length || 0,
        score: (proposal.votes?.filter(v => v.vote_type === 'up').length || 0) - 
               (proposal.votes?.filter(v => v.vote_type === 'down').length || 0),
        comments: proposal.comments?.[0]?.count || 0
      }));

      // Sort proposals by score (descending) and then by savings (descending) for tiebreakers
      const sortedProposals = processedProposals.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return b.savings - a.savings;
      });

      setProposals(sortedProposals);

      // Fetch comments for all proposals initially
      for (const proposal of sortedProposals) {
        if (proposal.comments > 0) {
          await fetchComments(proposal.id);
        }
      }
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (proposalId: string) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('proposal_id', proposalId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setComments(prev => ({
        ...prev,
        [proposalId]: data
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleVote = async (proposalId: string, type: 'up' | 'down') => {
    try {
      const storageKey = `vote_${proposalId}`;
      const existingVote = sessionStorage.getItem(storageKey);

      if (existingVote) {
        if (existingVote === type) {
          sessionStorage.removeItem(storageKey);
          await supabase
            .from('votes')
            .delete()
            .eq('proposal_id', proposalId)
            .is('user_id', null);
        } else {
          sessionStorage.setItem(storageKey, type);
          await supabase
            .from('votes')
            .update({ vote_type: type })
            .eq('proposal_id', proposalId)
            .is('user_id', null);
        }
      } else {
        sessionStorage.setItem(storageKey, type);
        await supabase
          .from('votes')
          .insert([{ 
            proposal_id: proposalId, 
            vote_type: type,
            user_id: null
          }]);
      }

      await fetchProposals();
    } catch (error) {
      console.error('Error handling vote:', error);
    }
  };

  const handleShare = async (proposal: any) => {
    const shareData = {
      title: 'Auditoría Ciudadana - Propuesta de Ahorro',
      text: `${proposal.title} - Ahorro estimado: ${formatMoney(proposal.savings)}M€`,
      url: window.location.href
    };

    try {
      if (window.isSecureContext && navigator.share) {
        await navigator.share(shareData);
        showNotification('¡Propuesta compartida con éxito!');
      } else {
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        showNotification('¡Enlace copiado al portapapeles!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      showNotification('Error al compartir. Por favor, intenta copiar el enlace manualmente.', 'error');
    }
  };

  const handleSubmitComment = async (proposalId: string) => {
    if (newComment.trim()) {
      const moderationResult = moderateContent(newComment);
      if (!moderationResult.isValid) {
        showNotification(moderationResult.reason || 'Contenido no válido', 'error');
        return;
      }

      const nickname = localStorage.getItem('userNickname');
      if (!nickname) {
        setActionType('comment');
        setIsRegisterModalOpen(true);
        return;
      }
      
      try {
        const { error } = await supabase
          .from('comments')
          .insert([{ 
            proposal_id: proposalId, 
            content: newComment,
            user_id: null,
            nickname: nickname
          }]);

        if (error) throw error;

        setNewComment('');
        await fetchProposals();
        await fetchComments(proposalId);
        showNotification('Comentario añadido con éxito');
      } catch (error) {
        console.error('Error submitting comment:', error);
        showNotification('Error al añadir el comentario', 'error');
      }
    }
  };

  const handleCommentClick = async (proposalId: string) => {
    const nickname = localStorage.getItem('userNickname');
    if (!nickname && !showComments) {
      setActionType('comment');
      setIsRegisterModalOpen(true);
      return;
    }

    if (showComments === proposalId) {
      setShowComments(null);
    } else {
      setShowComments(proposalId);
      if (!comments[proposalId]) {
        await fetchComments(proposalId);
      }
    }
  };

  const handleDeleteComment = async (proposalId: string, commentId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      // Update local state
      setComments(prev => ({
        ...prev,
        [proposalId]: prev[proposalId].filter(comment => comment.id !== commentId)
      }));

      // Refresh proposal to update comment count
      await fetchProposals();
      showNotification('Comentario eliminado con éxito');
    } catch (error) {
      console.error('Error deleting comment:', error);
      showNotification('Error al eliminar el comentario', 'error');
    }
  };

  const handleDeleteProposal = async (proposalId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta propuesta?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', proposalId);

      if (error) {
        console.error('Error deleting proposal:', error);
        showNotification('Error al eliminar la propuesta. Por favor, inténtalo de nuevo.', 'error');
        return;
      }

      // Update local state
      setProposals(prev => prev.filter(p => p.id !== proposalId));
      showNotification('Propuesta eliminada con éxito');
    } catch (error) {
      console.error('Error deleting proposal:', error);
      showNotification('Error al eliminar la propuesta. Por favor, inténtalo de nuevo.', 'error');
    }
  };

  const handleNewProposal = () => {
    const nickname = localStorage.getItem('userNickname');
    if (!nickname) {
      setActionType('proposal');
      setIsRegisterModalOpen(true);
    } else {
      setIsNewProposalModalOpen(true);
    }
  };

  const handleRegisterComplete = (data: { type: 'anonymous' | 'email', nickname?: string }) => {
    if (actionType === 'proposal') {
      setIsNewProposalModalOpen(true);
    } else if (actionType === 'comment') {
      // The comment form will now be accessible since we have a nickname
    }
    setActionType(null);
  };

  const totalPages = Math.ceil(proposals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProposals = proposals.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSelectedLevel('nacional');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              selectedLevel === 'nacional'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <Building2 size={20} />
            Nacional
          </button>
          <button
            onClick={() => {
              setSelectedLevel('autonomico');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              selectedLevel === 'autonomico'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <MapPin size={20} />
            Autonómico
          </button>
          <button
            onClick={() => {
              setSelectedLevel('municipal');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
              selectedLevel === 'municipal'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <MapPin size={20} />
            Municipal
          </button>
        </div>
        <button
          onClick={handleNewProposal}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          Nueva Propuesta
        </button>
      </div>

      {currentProposals.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <p className="text-gray-600">No hay propuestas disponibles en este momento.</p>
          <button
            onClick={handleNewProposal}
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="inline-block mr-2" size={20} />
            Sé el primero en proponer
          </button>
        </div>
      ) : (
        currentProposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mb-2">
                  {proposal.category}
                </span>
                <h3 className="text-xl font-bold text-gray-800">{proposal.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Por {proposal.nickname || 'Anónimo'}</span>
                  <span>•</span>
                  <span>{new Date(proposal.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {formatMoney(proposal.savings)}M€
                  </div>
                  <div className="text-sm text-gray-500">Ahorro estimado</div>
                </div>
                <button
                  onClick={() => handleDeleteProposal(proposal.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  title="Eliminar propuesta"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4 whitespace-pre-line leading-relaxed">
                {proposal.description}
              </p>
              {proposal.details && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Detalles adicionales</h4>
                  <p className="text-gray-600 whitespace-pre-line">{proposal.details}</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 pt-4 border-t">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote(proposal.id, 'up')}
                  className="flex items-center gap-1 text-gray-600 hover:text-green-600"
                >
                  <ThumbsUp size={20} />
                  <span>{proposal.upvotes}</span>
                </button>
                <button
                  onClick={() => handleVote(proposal.id, 'down')}
                  className="flex items-center gap-1 ml-2 text-gray-600 hover:text-red-600"
                >
                  <ThumbsDown size={20} />
                  <span>{proposal.downvotes}</span>
                </button>
              </div>
              <button
                onClick={() => handleCommentClick(proposal.id)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
              >
                <MessageSquare size={20} />
                <span>{proposal.comments}</span>
              </button>
              <button
                onClick={() => handleShare(proposal)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                title={window.isSecureContext && navigator.share ? 'Compartir propuesta' : 'Copiar enlace'}
              >
                {window.isSecureContext && navigator.share ? (
                  <Share2 size={20} />
                ) : (
                  <Link size={20} />
                )}
                Compartir
              </button>
            </div>

            {(showComments === proposal.id || comments[proposal.id]?.length > 0) && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-gray-800 mb-4">Comentarios</h4>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Añade un comentario..."
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => handleSubmitComment(proposal.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Comentar
                    </button>
                  </div>
                  {comments[proposal.id]?.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium text-gray-800">
                            {comment.nickname || 'Anónimo'}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteComment(proposal.id, comment.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="Eliminar comentario"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      <RegisterModal 
        isOpen={isRegisterModalOpen}
        onClose={() => {
          setIsRegisterModalOpen(false);
          setActionType(null);
        }}
        onRegister={handleRegisterComplete}
      />

      <NewProposalModal
        isOpen={isNewProposalModalOpen}
        onClose={() => setIsNewProposalModalOpen(false)}
        level={selectedLevel}
      />
    </div>
  );
};

export default ProposalsList;