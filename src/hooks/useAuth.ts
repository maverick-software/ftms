import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // We don't necessarily want to set loading to false here again
      // as the initial loading is for the getSession call.
      // If session becomes null after being established, it means logout.
      // If it changes from one user to another, that's a session update.
      // setLoading(false); // Consider if this is needed or if initial setLoading(false) is enough
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    setLoading(true); // Optionally set loading true during logout
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
      // setLoading(false); // Ensure loading is set false even on error
      // You might want to throw the error or handle it further
    }
    // setUser(null); // Supabase onAuthStateChange should handle this
    // setLoading(false); // onAuthStateChange will set user to null, then loading could be set if needed
                      // but usually, redirection will happen before this matters much.
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout, // <<< EXPOSE LOGOUT FUNCTION
  };
}