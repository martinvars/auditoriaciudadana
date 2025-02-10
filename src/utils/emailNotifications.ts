import { supabase } from '../lib/supabase';

interface DailyStats {
  newVotes: number;
  totalVotes: number;
  newComments: number;
  totalComments: number;
}

async function getDailyStats(): Promise<DailyStats> {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayISO = yesterday.toISOString();

  // Get new votes in last 24h
  const { data: newVotes } = await supabase
    .from('votes')
    .select('id')
    .gte('created_at', yesterdayISO);

  // Get total votes
  const { data: totalVotes } = await supabase
    .from('votes')
    .select('id');

  // Get new comments in last 24h
  const { data: newComments } = await supabase
    .from('comments')
    .select('id')
    .gte('created_at', yesterdayISO);

  // Get total comments
  const { data: totalComments } = await supabase
    .from('comments')
    .select('id');

  return {
    newVotes: newVotes?.length || 0,
    totalVotes: totalVotes?.length || 0,
    newComments: newComments?.length || 0,
    totalComments: totalComments?.length || 0
  };
}

export async function sendProposalNotification(proposal: any) {
  try {
    const stats = await getDailyStats();
    
    // Send email using Supabase Edge Function
    const { error } = await supabase.functions.invoke('send-proposal-email', {
      body: {
        to: 'martin@overture.life',
        subject: `Nueva Propuesta: ${proposal.title}`,
        proposal: {
          title: proposal.title,
          description: proposal.description,
          savings: proposal.savings,
          category: proposal.category,
          level: proposal.level,
          nickname: proposal.nickname
        },
        stats: stats
      }
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error sending proposal notification:', error);
  }
}