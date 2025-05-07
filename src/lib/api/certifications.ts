import { supabase, handleError } from '../supabase';

export const getCertificationTypes = async () => {
  const { data, error } = await supabase
    .from('certification_types')
    .select(`
      *,
      requirements:certification_requirements(*)
    `)
    .order('created_at', { ascending: false });

  if (error) return handleError(error);
  return data;
};

export const getCertificationType = async (id: string) => {
  const { data, error } = await supabase
    .from('certification_types')
    .select(`
      *,
      requirements:certification_requirements(*)
    `)
    .eq('id', id)
    .single();

  if (error) return handleError(error);
  return data;
};

export const createCertificationType = async (data: {
  name: string;
  description: string;
  validity_period: number;
  status: string;
  requirements: Array<{
    name: string;
    type: string;
    description: string;
  }>;
}) => {
  const { name, description, validity_period, status, requirements } = data;

  // Start a transaction
  const { data: certType, error: certError } = await supabase
    .from('certification_types')
    .insert({
      name,
      description,
      validity_period,
      status
    })
    .select()
    .single();

  if (certError) return handleError(certError);

  // Insert requirements
  const { error: reqError } = await supabase
    .from('certification_requirements')
    .insert(
      requirements.map(req => ({
        certification_type_id: certType.id,
        ...req
      }))
    );

  if (reqError) return handleError(reqError);

  return certType;
};

export const updateCertificationType = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    validity_period?: number;
    status?: string;
    requirements?: Array<{
      id?: string;
      name: string;
      type: string;
      description: string;
    }>;
  }
) => {
  const { requirements, ...certData } = data;

  // Update certification type
  const { error: certError } = await supabase
    .from('certification_types')
    .update(certData)
    .eq('id', id);

  if (certError) return handleError(certError);

  if (requirements) {
    // Delete existing requirements
    const { error: deleteError } = await supabase
      .from('certification_requirements')
      .delete()
      .eq('certification_type_id', id);

    if (deleteError) return handleError(deleteError);

    // Insert new requirements
    const { error: reqError } = await supabase
      .from('certification_requirements')
      .insert(
        requirements.map(req => ({
          certification_type_id: id,
          name: req.name,
          type: req.type,
          description: req.description
        }))
      );

    if (reqError) return handleError(reqError);
  }

  return getCertificationType(id);
};

export const deleteCertificationType = async (id: string) => {
  const { error } = await supabase
    .from('certification_types')
    .delete()
    .eq('id', id);

  if (error) return handleError(error);
};