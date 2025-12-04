import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface MoodEntry {
  id: string;
  user_id: string;
  mood_value: number;
  note: string | null;
  created_at: string;
}

export function useMood(userId: string) {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoodHistory();
  }, [userId]);

  const fetchMoodHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) throw error;
      setMoodHistory(data || []);
    } catch (error) {
      console.error('Erro ao buscar histórico de humor:', error);
      // Dados mock para desenvolvimento
      setMoodHistory(generateMockMoodData());
    } finally {
      setLoading(false);
    }
  };

  const addMoodEntry = async (moodValue: number, note?: string) => {
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .insert([
          {
            user_id: userId,
            mood_value: moodValue,
            note: note || null,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      
      setMoodHistory([data, ...moodHistory]);
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao adicionar humor:', error);
      return { success: false, error };
    }
  };

  const getWeeklyAverage = () => {
    if (moodHistory.length === 0) return 0;
    const lastWeek = moodHistory.slice(0, 7);
    const sum = lastWeek.reduce((acc, entry) => acc + entry.mood_value, 0);
    return (sum / lastWeek.length).toFixed(1);
  };

  return {
    moodHistory,
    loading,
    addMoodEntry,
    getWeeklyAverage,
    refetch: fetchMoodHistory,
  };
}

function generateMockMoodData(): MoodEntry[] {
  const mockData: MoodEntry[] = [];
  const now = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    mockData.push({
      id: `mock-${i}`,
      user_id: 'demo-user-id',
      mood_value: Math.floor(Math.random() * 3) + 3, // 3-5
      note: null,
      created_at: date.toISOString(),
    });
  }
  
  return mockData;
}
