import { supabase, handleError } from '../supabase';

export const getCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      requirements:course_requirements(*)
    `)
    .order('created_at', { ascending: false });

  if (error) return handleError(error);
  return data;
};

export const getCourse = async (id: string) => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      requirements:course_requirements(*),
      enrollments:course_enrollments(
        student:students(*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) return handleError(error);
  return data;
};

export const createCourse = async (data: {
  name: string;
  description: string;
  duration: number;
  status: string;
  firearms: string[];
  legal_knowledge: boolean;
  mental_health_training: boolean;
  additional_elements: string[];
  delivery_method: string;
  requirements: Array<{
    name: string;
    type: string;
    description?: string;
  }>;
}) => {
  const { requirements, ...courseData } = data;

  // Start a transaction
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .insert(courseData)
    .select()
    .single();

  if (courseError) return handleError(courseError);

  // Insert requirements
  const { error: reqError } = await supabase
    .from('course_requirements')
    .insert(
      requirements.map(req => ({
        course_id: course.id,
        ...req
      }))
    );

  if (reqError) return handleError(reqError);

  return getCourse(course.id);
};

export const updateCourse = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    duration?: number;
    status?: string;
    firearms?: string[];
    legal_knowledge?: boolean;
    mental_health_training?: boolean;
    additional_elements?: string[];
    delivery_method?: string;
    requirements?: Array<{
      id?: string;
      name: string;
      type: string;
      description?: string;
    }>;
  }
) => {
  const { requirements, ...courseData } = data;

  // Update course
  const { error: courseError } = await supabase
    .from('courses')
    .update(courseData)
    .eq('id', id);

  if (courseError) return handleError(courseError);

  if (requirements) {
    // Delete existing requirements
    const { error: deleteError } = await supabase
      .from('course_requirements')
      .delete()
      .eq('course_id', id);

    if (deleteError) return handleError(deleteError);

    // Insert new requirements
    const { error: reqError } = await supabase
      .from('course_requirements')
      .insert(
        requirements.map(req => ({
          course_id: id,
          name: req.name,
          type: req.type,
          description: req.description
        }))
      );

    if (reqError) return handleError(reqError);
  }

  return getCourse(id);
};

export const deleteCourse = async (id: string) => {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id);

  if (error) return handleError(error);
};