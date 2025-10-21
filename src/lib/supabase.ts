import { createClient } from '@supabase/supabase-js';
import { ProjectData } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const saveProjectData = async (data: ProjectData) => {
  const { data: result, error } = await supabase
    .from('projects')
    .upsert({
      id: data.id,
      data: data,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error saving project:', error);
    throw error;
  }

  return result;
};

export const getProjectData = async (id: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    throw error;
  }

  return data?.data as ProjectData;
};

export const getAllProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return data;
};
