export interface Proposal {
  id: string;
  user_id: string;
  title: string;
  description: string;
  details: string;
  savings: number;
  category: string;
  level: string;
  created_at: string;
  updated_at: string;
}

export interface Vote {
  id: string;
  user_id: string;
  proposal_id: string;
  vote_type: 'up' | 'down';
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  proposal_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user?: {
    nickname: string;
  };
}