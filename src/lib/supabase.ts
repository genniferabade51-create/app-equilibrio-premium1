import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          created_at: string;
          streak_days: number;
          total_points: number;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          created_at?: string;
          streak_days?: number;
          total_points?: number;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          created_at?: string;
          streak_days?: number;
          total_points?: number;
        };
      };
      mood_entries: {
        Row: {
          id: string;
          user_id: string;
          mood_value: number;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mood_value: number;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          mood_value?: number;
          note?: string | null;
          created_at?: string;
        };
      };
      meditation_sessions: {
        Row: {
          id: string;
          user_id: string;
          program_name: string;
          duration_minutes: number;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          program_name: string;
          duration_minutes: number;
          completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          program_name?: string;
          duration_minutes?: number;
          completed?: boolean;
          created_at?: string;
        };
      };
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: string;
          created_at?: string;
        };
      };
      community_posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          likes: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          likes?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          likes?: number;
          created_at?: string;
        };
      };
      post_comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          content?: string;
          created_at?: string;
        };
      };
    };
  };
};
