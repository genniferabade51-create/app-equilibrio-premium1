import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  streak_days: number;
  total_points: number;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular usuário para desenvolvimento
    // Em produção, isso viria da autenticação do Supabase
    const mockUser: User = {
      id: 'demo-user-id',
      email: 'usuario@exemplo.com',
      name: 'Usuário Demo',
      created_at: new Date().toISOString(),
      streak_days: 7,
      total_points: 1240,
    };
    
    setUser(mockUser);
    setLoading(false);
  }, []);

  return { user, loading };
}
