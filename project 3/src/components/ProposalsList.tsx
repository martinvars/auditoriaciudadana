import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import NewProposalModal from './NewProposalModal';
import RegisterModal from './RegisterModal';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { checkDeletePermission } from '../utils/passwordProtection';

const ProposalsList = () => {
  const { user } = useAuth();
  const [isNewProposalModalOpen, setIsNewProposalModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [expandedProposal, setExpandedProposal] = useState<string | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState<{[key: string]: {upvotes: number, downvotes: number, userVote?: 'up' | 'down'}}>({}); 

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const { data: proposalsData, error: proposalsError } = await supabase
        .from('proposals')
        .select(`
          *,
          comments (
            id,
            content,
            nickname,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (proposalsError) throw proposalsError;

      // Fetch votes for all proposals
      const { data: votesData, error: votesError } = await supabase
        .from('votes')
        .select('*')
        .in('proposal_id', proposalsData?.map(p => p.id) || []);

      if (votesError) throw votesError;

      // Process votes
      const votesMap: {[key: string]: {upvotes: number, downvotes: number, userVote?: 'up' | 'down'}} = {};
      proposalsData?.forEach(proposal => {
        const proposalVotes = votesData?.filter(v => v.proposal_id === proposal.id) || [];
        const upvotes = proposalVotes.filter(v => v.vote_type === 'up').length;
        const downvotes = proposalVotes.filter(v => v.vote_type === 'down').length;
        
        // Check if current user has voted using browser fingerprint
        const fingerprint = localStorage.getItem('userFingerprint');
        const userVote = fingerprint ? proposalVotes.find(v => v.nickname.includes(fingerprint))?.vote_type : undefined;

        votesMap[proposal.id] = {
          upvotes,
          downvotes,
          userVote
        };
      });

      setVotes(votesMap);
      setProposals(proposalsData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (proposalId: string, type: 'up' | 'down') => {
    try {
      // Get or generate user fingerprint
      let fingerprint = localStorage.getItem('userFingerprint');
      if (!fingerprint) {
        fingerprint = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('userFingerprint', fingerprint);
      }

      const nickname = user?.nickname || `anon_${fingerprint}`;
      const currentVotes = votes[proposalId];
      const isRemovingVote = currentVotes.userVote === type;

      if (isRemovingVote) {
        // Remove vote
        await supabase
          .from('votes')
          .delete()
          .eq('proposal_id', proposalId)
          .eq('nickname', nickname);
      } else {
        // Upsert vote
        await supabase
          .from('votes')
          .upsert({
            proposal_id: proposalId,
            vote_type: type,
            nickname: nickname
          }, {
            onConflict: 'proposal_id,nickname'
          });
      }
      
      // Refresh votes
      fetchProposals();
    } catch (error) {
      console.error('Error al votar:', error);
    }
  };

  const handleShare = async (proposal: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: proposal.title,
          text: `Propuesta de ahorro por ${proposal.nickname}: ${proposal.title} - Ahorro estimado: ${proposal.savings}M€`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      alert('Enlace copiado al portapapeles');
    }
  };

  const handleCommentClick = (proposalId: string) => {
    setShowComments(showComments === proposalId ? null : proposalId);
  };

  const handleSubmitComment = async (proposalId: string) => {
    if (!user) {
      setIsRegisterModalOpen(true);
      return;
    }

    if (newComment.trim()) {
      try {
        await supabase
          .from('comments')
          .insert({
            proposal_id: proposalId,
            content: newComment.trim(),
            nickname: user.nickname
          });
        
        setNewComment('');
        fetchProposals();
      } catch (error) {
        console.error('Error al comentar:', error);
      }
    }
  };

  const handleNewProposal = () => {
    if (!user) {
      setIsRegisterModalOpen(true);
      return;
    }
    setIsNewProposalModalOpen(true);
  };

  const handleDeleteProposal = async (proposalId: string, nickname: string) => {
    try {
      const hasPermission = await checkDeletePermission('proposal', nickname);
      
      if (!hasPermission) {
        alert('No tienes permiso para eliminar esta propuesta');
        return;
      }

      if (window.confirm('¿Estás seguro de que quieres eliminar esta propuesta?')) {
        const { error } = await supabase
          .from('proposals')
          .delete()
          .eq('id', proposalId);

        if (error) throw error;
        fetchProposals();
      }
    } catch (error) {
      console.error('Error al eliminar la propuesta:', error);
      alert('Error al eliminar la propuesta');
    }
  };

  const handleDeleteComment = async (commentId: string, nickname: string) => {
    try {
      const hasPermission = await checkDeletePermission('comment', nickname);
      
      if (!hasPermission) {
        alert('No tienes permiso para eliminar este comentario');
        return;
      }

      if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
        const { error } = await supabase
          .from('comments')
          .delete()
          .eq('id', commentId);

        if (error) throw error;
        fetchProposals();
      }
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
      alert('Error al eliminar el comentario');
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('es-ES', {
      maximumFractionDigits: 0
    });
  };

  const renderProposalsByLevel = (level: string) => {
    const levelProposals = proposals.filter(p => p.level === level);
    
    return levelProposals.map((proposal) => (
      <div key={proposal.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div 
          className="p-4 cursor-pointer hover:bg-gray-50"
          onClick={() => setExpandedProposal(expandedProposal === proposal.id ? null : proposal.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {proposal.category}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  {new Date(proposal.created_at).toLocaleDateString('es-ES')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">{proposal.title}</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {formatNumber(proposal.savings)}M€
                </div>
                <div className="text-sm text-gray-500">Ahorro estimado</div>
              </div>
              {expandedProposal === proposal.id ? (
                <ChevronUp className="text-gray-400" />
              ) : (
                <ChevronDown className="text-gray-400" />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(proposal.id, 'up');
                }}
                className={`flex items-center gap-1 ${
                  votes[proposal.id]?.userVote === 'up'
                    ? 'text-green-600'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <ThumbsUp size={20} />
                <span>{votes[proposal.id]?.upvotes || 0}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(proposal.id, 'down');
                }}
                className={`flex items-center gap-1 ml-2 ${
                  votes[proposal.id]?.userVote === 'down'
                    ? 'text-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                <ThumbsDown size={20} />
                <span>{votes[proposal.id]?.downvotes || 0}</span>
              </button>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCommentClick(proposal.id);
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <MessageSquare size={20} />
              <span>{proposal.comments?.length || 0}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(proposal);
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <Share2 size={20} />
              Compartir
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProposal(proposal.id, proposal.nickname);
              }}
              className="text-gray-400 hover:text-red-600 transition-colors"
              title="Eliminar propuesta"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {expandedProposal === proposal.id && (
          <div className="p-4 border-t bg-gray-50">
            <p className="text-gray-600 mb-4 whitespace-pre-line">{proposal.description}</p>
            
            {showComments === proposal.id && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-gray-800 mb-4">Comentarios</h4>
                <div className="space-y-4">
                  {proposal.comments?.map((comment: any) => (
                    <div key={comment.id} className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-blue-600">{comment.nickname}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-500">
                            {new Date(comment.created_at).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteComment(comment.id, comment.nickname)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Eliminar comentario"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
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
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-8">
        <button
          onClick={handleNewProposal}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={20} />
          <span>Nueva Propuesta</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando propuestas...</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Propuestas Nacionales</h2>
            <div className="space-y-4">
              {renderProposalsByLevel('nacional')}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Propuestas Autonómicas</h2>
            <div className="space-y-4">
              {renderProposalsByLevel('autonomico')}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Propuestas Municipales</h2>
            <div className="space-y-4">
              {renderProposalsByLevel('municipal')}
            </div>
          </div>
        </div>
      )}

      <NewProposalModal
        isOpen={isNewProposalModalOpen}
        onClose={() => {
          setIsNewProposalModalOpen(false);
          fetchProposals();
        }}
        level="nacional"
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
};

export default ProposalsList;