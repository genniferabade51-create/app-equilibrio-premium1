import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface MeditationSession {
  id: string;
  user_id: string;
  program_name: string;
  duration_minutes: number;
  completed: boolean;
  created_at: string;
}

export function useMeditation(userId: string) {
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, [userId]);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('meditation_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Erro ao buscar sessões:', error);
      // Dados mock para desenvolvimento
      setSessions(generateMockSessions());
    } finally {
      setLoading(false);
    }
  };

  const startSession = async (programName: string, durationMinutes: number) => {
    try {
      const { data, error } = await supabase
        .from('meditation_sessions')
        .insert([
          {
            user_id: userId,
            program_name: programName,
            duration_minutes: durationMinutes,
            completed: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      
      setSessions([data, ...sessions]);
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao iniciar sessão:', error);
      return { success: false, error };
    }
  };

  const completeSession = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('meditation_sessions')
        .update({ completed: true })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;
      
      setSessions(sessions.map(s => s.id === sessionId ? data : s));
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao completar sessão:', error);
      return { success: false, error };
    }
  };

  const getTotalSessions = () => {
    return sessions.filter(s => s.completed).length;
  };

  const getTotalMinutes = () => {
    return sessions
      .filter(s => s.completed)
      .reduce((acc, s) => acc + s.duration_minutes, 0);
  };

  return {
    sessions,
    loading,
    startSession,
    completeSession,
    getTotalSessions,
    getTotalMinutes,
    refetch: fetchSessions,
  };
}

function generateMockSessions(): MeditationSession[] {
  return [
    {
      id: 'mock-1',
      user_id: 'demo-user-id',
      program_name: 'Meditação Matinal',
      duration_minutes: 10,
      completed: true,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mock-2',
      user_id: 'demo-user-id',
      program_name: 'Redução de Ansiedade',
      duration_minutes: 15,
      completed: true,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}
