import { supabase, handleError } from '../supabase';

export const getOrganizations = async () => {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('name');

  if (error) return handleError(error);
  return data;
};

export const getOrganization = async (id: string) => {
  const { data, error } = await supabase
    .from('organizations')
    .select(`
      *,
      organization_members (
        id,
        role,
        user_id
      ),
      students (*)
    `)
    .eq('id', id)
    .single();

  if (error) return handleError(error);
  return data;
};

export const createOrganization = async (data: {
  name: string;
  type: string;
  contact_person: string;
  email: string;
  phone: string;
  status?: string;
}) => {
  const { data: org, error } = await supabase
    .from('organizations')
    .insert(data)
    .select()
    .single();

  if (error) return handleError(error);
  return org;
};

export const updateOrganization = async (id: string, data: {
  name?: string;
  type?: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  status?: string;
}) => {
  const { data: org, error } = await supabase
    .from('organizations')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) return handleError(error);
  return org;
};

export const deleteOrganization = async (id: string) => {
  const { error } = await supabase
    .from('organizations')
    .delete()
    .eq('id', id);

  if (error) return handleError(error);
};