import React from 'react';
import { ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { checkDeletePermission } from '../utils/passwordProtection';

interface CommentProps {
  id: string;
  content: string;
  nickname: string;
  createdAt: string;
  proposalId: string;
  votes: {
    upvotes: number;
    downvotes: number;
    userVote?: 'up' | 'down';
  };
  onDelete: (commentId: string) => void;
  onVote: (type: 'up' | 'down') => void;
}

const Comment: React.FC<CommentProps> = ({
  id,
  content,
  nickname,
  createdAt,
  proposalId,
  votes,
  onDelete,
  onVote
}) => {
  const { user } = useAuth();

  const handleVote = async (type: 'up' | 'down') => {
    try {
      // Get or generate user fingerprint
      let fingerprint = localStorage.getItem('userFingerprint');
      if (!fingerprint) {
        fingerprint = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('userFingerprint', fingerprint);
      }

      const commentNickname = user?.nickname || `anon_${fingerprint}`;
      
      // Check if user has already voted
      const { data: existingVote } = await supabase
        .from('comment_votes')
        .select('*')
        .eq('comment_id', id)
        .eq('nickname', commentNickname)
        .single();

      if (existingVote && existingVote.vote_type === type) {
        // Remove vote if clicking the same type
        await supabase
          .from('comment_votes')
          .delete()
          .eq('comment_id', id)
          .eq('nickname', commentNickname);
      } else {
        // Upsert vote
        await supabase
          .from('comment_votes')
          .upsert({
            comment_id: id,
            nickname: commentNickname,
            vote_type: type
          }, {
            onConflict: 'comment_id,nickname'
          });
      }

      onVote(type);
    } catch (error) {
      console.error('Error voting on comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const hasPermission = await checkDeletePermission('comment', nickname);
      
      if (!hasPermission) {
        alert('No tienes permiso para eliminar este comentario');
        return;
      }

      if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
        onDelete(id);
      }
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
      alert('Error al eliminar el comentario');
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-blue-600">{nickname}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500">
            {new Date(createdAt).toLocaleDateString('es-ES')}
          </span>
        </div>
        <button
          onClick={handleDelete}
          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          title="Eliminar comentario"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <p className="text-gray-700 mb-3">{content}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleVote('up')}
          className={`flex items-center gap-1 ${
            votes.userVote === 'up'
              ? 'text-green-600'
              : 'text-gray-600 hover:text-green-600'
          }`}
        >
          <ThumbsUp size={16} />
          <span>{votes.upvotes}</span>
        </button>
        <button
          onClick={() => handleVote('down')}
          className={`flex items-center gap-1 ${
            votes.userVote === 'down'
              ? 'text-red-600'
              : 'text-gray-600 hover:text-red-600'
          }`}
        >
          <ThumbsDown size={16} />
          <span>{votes.downvotes}</span>
        </button>
      </div>
    </div>
  );
};

export default Comment;