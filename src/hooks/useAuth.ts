import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export interface AuthUser {
  id?: string;
  nickname: string;
  isAnonymous: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for anonymous user
    const anonymousNickname = localStorage.getItem('userNickname');
    const isAnonymous = localStorage.getItem('isAnonymous') === 'true';

    if (anonymousNickname && isAnonymous) {
      setUser({
        nickname: anonymousNickname,
        isAnonymous: true
      });
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          nickname: session.user.user_metadata.nickname || session.user.email?.split('@')[0] || 'Usuario',
          isAnonymous: false
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          nickname: session.user.user_metadata.nickname || session.user.email?.split('@')[0] || 'Usuario',
          isAnonymous: false
        });
      } else {
        // Check for anonymous user again when logging out
        const anonNickname = localStorage.getItem('userNickname');
        const isAnon = localStorage.getItem('isAnonymous') === 'true';
        
        if (anonNickname && isAnon) {
          setUser({
            nickname: anonNickname,
            isAnonymous: true
          });
        } else {
          setUser(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    if (user?.isAnonymous) {
      localStorage.removeItem('userNickname');
      localStorage.removeItem('isAnonymous');
      setUser(null);
    } else {
      await supabase.auth.signOut();
    }
  };

  return { user, loading, logout };
}