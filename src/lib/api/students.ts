import { supabase, handleError } from '../supabase';

export const getStudents = async () => {
  const { data, error } = await supabase
    .from('students')
    .select(`
      *,
      organization:organizations(*),
      insurance:student_insurance(*),
      certifications:student_certifications(
        certification:certification_types(*)
      )
    `)
    .order('last_name');

  if (error) return handleError(error);
  return data;
};

export const getStudent = async (id: string) => {
  const { data, error } = await supabase
    .from('students')
    .select(`
      *,
      organization:organizations(*),
      insurance:student_insurance(*),
      certifications:student_certifications(
        certification:certification_types(*)
      ),
      enrollments:course_enrollments(
        course:courses(*)
      ),
      competencies:student_competencies(
        competency:competencies(*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) return handleError(error);
  return data;
};

export const createStudent = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  date_of_birth: string;
  emergency_contact: string;
  emergency_phone: string;
  organization_id?: string;
  notes?: string;
  insurance: {
    carry_insurance_provider: string;
    carry_insurance_policy_number: string;
    carry_insurance_expiration_date: string;
    umbrella_insurance_provider?: string;
    umbrella_insurance_policy_number?: string;
    umbrella_insurance_expiration_date?: string;
  };
}) => {
  const { insurance, ...studentData } = data;

  // Start a transaction
  const { data: student, error: studentError } = await supabase
    .from('students')
    .insert(studentData)
    .select()
    .single();

  if (studentError) return handleError(studentError);

  // Create insurance record
  const { error: insuranceError } = await supabase
    .from('student_insurance')
    .insert({
      student_id: student.id,
      ...insurance
    });

  if (insuranceError) return handleError(insuranceError);

  return getStudent(student.id);
};

export const updateStudent = async (
  id: string,
  data: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    date_of_birth?: string;
    emergency_contact?: string;
    emergency_phone?: string;
    organization_id?: string;
    notes?: string;
    status?: string;
    insurance?: {
      carry_insurance_provider?: string;
      carry_insurance_policy_number?: string;
      carry_insurance_expiration_date?: string;
      umbrella_insurance_provider?: string;
      umbrella_insurance_policy_number?: string;
      umbrella_insurance_expiration_date?: string;
    };
  }
) => {
  const { insurance, ...studentData } = data;

  // Update student data
  const { error: studentError } = await supabase
    .from('students')
    .update(studentData)
    .eq('id', id);

  if (studentError) return handleError(studentError);

  // Update insurance if provided
  if (insurance) {
    const { error: insuranceError } = await supabase
      .from('student_insurance')
      .update(insurance)
      .eq('student_id', id);

    if (insuranceError) return handleError(insuranceError);
  }

  return getStudent(id);
};

export const deleteStudent = async (id: string) => {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);

  if (error) return handleError(error);
};