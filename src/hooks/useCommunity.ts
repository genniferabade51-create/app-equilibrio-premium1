import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  likes: number;
  created_at: string;
  author_name?: string;
  comments_count?: number;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author_name?: string;
}

export function useCommunity() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      // Dados mock para desenvolvimento
      setPosts(generateMockPosts());
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (userId: string, content: string) => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert([
          {
            user_id: userId,
            content,
            likes: 0,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      
      setPosts([data, ...posts]);
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao criar post:', error);
      return { success: false, error };
    }
  };

  const likePost = async (postId: string) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return { success: false };

      const { data, error } = await supabase
        .from('community_posts')
        .update({ likes: post.likes + 1 })
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;
      
      setPosts(posts.map(p => p.id === postId ? data : p));
      return { success: true, data };
    } catch (error) {
      console.error('Erro ao curtir post:', error);
      return { success: false, error };
    }
  };

  return {
    posts,
    loading,
    createPost,
    likePost,
    refetch: fetchPosts,
  };
}

function generateMockPosts(): CommunityPost[] {
  return [
    {
      id: 'mock-1',
      user_id: 'user-1',
      content: 'Hoje consegui completar minha primeira semana de meditação! Muito feliz com o progresso 🎉',
      likes: 24,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      author_name: 'Usuário Anônimo',
      comments_count: 8,
    },
    {
      id: 'mock-2',
      user_id: 'user-2',
      content: 'Alguém tem dicas para lidar com ansiedade no trabalho? Estou precisando de apoio.',
      likes: 18,
      created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      author_name: 'Membro da Comunidade',
      comments_count: 12,
    },
    {
      id: 'mock-3',
      user_id: 'user-3',
      content: 'A meditação matinal mudou minha vida. Recomendo para todos!',
      likes: 42,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      author_name: 'Praticante Regular',
      comments_count: 15,
    },
  ];
}
