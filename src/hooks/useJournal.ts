import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
}

export function useJournal(userId: string) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, [userId]);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Erro ao buscar entradas do diário:', error);
      // Dados mock para desenvolvimento
      setEntries(generateMockEntries());
    } finally {
      setLoading(false);
    }
  };

  const createEntry = async (title: string, content: string) => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert([
          {
            user_id: userId,
            title,
            content,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      
      setEntries([data, ...entries]);
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao criar entrada:', error);
      return { success: false, error };
    }
  };

  const updateEntry = async (entryId: string, title: string, content: string) => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .update({ title, content })
        .eq('id', entryId)
        .select()
        .single();

      if (error) throw error;
      
      setEntries(entries.map(e => e.id === entryId ? data : e));
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao atualizar entrada:', error);
      return { success: false, error };
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', entryId);

      if (error) throw error;
      
      setEntries(entries.filter(e => e.id !== entryId));
      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar entrada:', error);
      return { success: false, error };
    }
  };

  return {
    entries,
    loading,
    createEntry,
    updateEntry,
    deleteEntry,
    refetch: fetchEntries,
  };
}

function generateMockEntries(): JournalEntry[] {
  return [
    {
      id: 'mock-1',
      user_id: 'demo-user-id',
      title: 'Primeiro dia de meditação',
      content: 'Hoje comecei minha jornada de bem-estar mental. Me sinto esperançoso!',
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'mock-2',
      user_id: 'demo-user-id',
      title: 'Reflexões sobre ansiedade',
      content: 'Percebi que minha ansiedade diminui quando pratico respiração profunda.',
      created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
  ];
}
