import { supabase, handleError } from '../supabase';

export const getCompetencies = async () => {
  const { data, error } = await supabase
    .from('competencies')
    .select(`
      *,
      requirements:competency_requirements(
        course:courses(*)
      )
    `)
    .order('created_at', { ascending: false });

  if (error) return handleError(error);
  return data;
};

export const getCompetency = async (id: string) => {
  const { data, error } = await supabase
    .from('competencies')
    .select(`
      *,
      requirements:competency_requirements(
        course:courses(*)
      ),
      student_competencies(
        student:students(*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) return handleError(error);
  return data;
};

export const createCompetency = async (data: {
  name: string;
  description: string;
  level: string;
  status: string;
  validity_period: number;
  recertification_required: boolean;
  course_ids: string[];
}) => {
  const { course_ids, ...competencyData } = data;

  // Start a transaction
  const { data: competency, error: compError } = await supabase
    .from('competencies')
    .insert(competencyData)
    .select()
    .single();

  if (compError) return handleError(compError);

  // Insert course requirements
  const { error: reqError } = await supabase
    .from('competency_requirements')
    .insert(
      course_ids.map(course_id => ({
        competency_id: competency.id,
        course_id
      }))
    );

  if (reqError) return handleError(reqError);

  return getCompetency(competency.id);
};

export const updateCompetency = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    level?: string;
    status?: string;
    validity_period?: number;
    recertification_required?: boolean;
    course_ids?: string[];
  }
) => {
  const { course_ids, ...competencyData } = data;

  // Update competency
  const { error: compError } = await supabase
    .from('competencies')
    .update(competencyData)
    .eq('id', id);

  if (compError) return handleError(compError);

  if (course_ids) {
    // Delete existing requirements
    const { error: deleteError } = await supabase
      .from('competency_requirements')
      .delete()
      .eq('competency_id', id);

    if (deleteError) return handleError(deleteError);

    // Insert new requirements
    const { error: reqError } = await supabase
      .from('competency_requirements')
      .insert(
        course_ids.map(course_id => ({
          competency_id: id,
          course_id
        }))
      );

    if (reqError) return handleError(reqError);
  }

  return getCompetency(id);
};

export const deleteCompetency = async (id: string) => {
  const { error } = await supabase
    .from('competencies')
    .delete()
    .eq('id', id);

  if (error) return handleError(error);
};