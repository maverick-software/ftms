export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      certification_types: {
        Row: {
          id: string
          name: string
          description: string | null
          validity_period: number
          status: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          validity_period: number
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          validity_period?: number
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      certification_requirements: {
        Row: {
          id: string
          certification_type_id: string | null
          name: string
          type: string
          description: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          certification_type_id?: string | null
          name: string
          type: string
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          certification_type_id?: string | null
          name?: string
          type?: string
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      student_certifications: {
        Row: {
          id: string
          student_id: string
          certification_type_id: string | null
          issue_date: string
          expiration_date: string | null
          certificate_number: string
          status: string
          file_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          student_id: string
          certification_type_id?: string | null
          issue_date: string
          expiration_date?: string | null
          certificate_number: string
          status?: string
          file_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string
          certification_type_id?: string | null
          issue_date?: string
          expiration_date?: string | null
          certificate_number?: string
          status?: string
          file_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          type: string
          contact_person: string
          email: string
          phone: string
          status: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          type: string
          contact_person: string
          email: string
          phone: string
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          type?: string
          contact_person?: string
          email?: string
          phone?: string
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      organization_members: {
        Row: {
          id: string
          organization_id: string | null
          user_id: string | null
          role: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          organization_id?: string | null
          user_id?: string | null
          role?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          organization_id?: string | null
          user_id?: string | null
          role?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      students: {
        Row: {
          id: string
          user_id: string | null
          organization_id: string | null
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string
          city: string
          state: string
          zip: string
          date_of_birth: string
          enrollment_date: string
          status: string
          emergency_contact: string
          emergency_phone: string
          notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          organization_id?: string | null
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string
          city: string
          state: string
          zip: string
          date_of_birth: string
          enrollment_date?: string
          status?: string
          emergency_contact: string
          emergency_phone: string
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          organization_id?: string | null
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          address?: string
          city?: string
          state?: string
          zip?: string
          date_of_birth?: string
          enrollment_date?: string
          status?: string
          emergency_contact?: string
          emergency_phone?: string
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      student_insurance: {
        Row: {
          id: string
          student_id: string | null
          carry_insurance_provider: string
          carry_insurance_policy_number: string
          carry_insurance_expiration_date: string
          umbrella_insurance_provider: string | null
          umbrella_insurance_policy_number: string | null
          umbrella_insurance_expiration_date: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          student_id?: string | null
          carry_insurance_provider: string
          carry_insurance_policy_number: string
          carry_insurance_expiration_date: string
          umbrella_insurance_provider?: string | null
          umbrella_insurance_policy_number?: string | null
          umbrella_insurance_expiration_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string | null
          carry_insurance_provider?: string
          carry_insurance_policy_number?: string
          carry_insurance_expiration_date?: string
          umbrella_insurance_provider?: string | null
          umbrella_insurance_policy_number?: string | null
          umbrella_insurance_expiration_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      courses: {
        Row: {
          id: string
          name: string
          description: string
          duration: number
          status: string
          firearms: string[]
          legal_knowledge: boolean
          mental_health_training: boolean
          additional_elements: string[]
          delivery_method: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description: string
          duration: number
          status?: string
          firearms?: string[]
          legal_knowledge?: boolean
          mental_health_training?: boolean
          additional_elements?: string[]
          delivery_method: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string
          duration?: number
          status?: string
          firearms?: string[]
          legal_knowledge?: boolean
          mental_health_training?: boolean
          additional_elements?: string[]
          delivery_method?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      course_requirements: {
        Row: {
          id: string
          course_id: string | null
          name: string
          type: string
          description: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          course_id?: string | null
          name: string
          type: string
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          course_id?: string | null
          name?: string
          type?: string
          description?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      course_enrollments: {
        Row: {
          id: string
          student_id: string | null
          course_id: string | null
          enrollment_date: string
          completion_date: string | null
          status: string
          score: number | null
          instructor_notes: string | null
          certificate_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          student_id?: string | null
          course_id?: string | null
          enrollment_date?: string
          completion_date?: string | null
          status?: string
          score?: number | null
          instructor_notes?: string | null
          certificate_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string | null
          course_id?: string | null
          enrollment_date?: string
          completion_date?: string | null
          status?: string
          score?: number | null
          instructor_notes?: string | null
          certificate_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      competencies: {
        Row: {
          id: string
          name: string
          description: string
          level: string
          status: string
          validity_period: number
          recertification_required: boolean
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description: string
          level: string
          status?: string
          validity_period: number
          recertification_required?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string
          level?: string
          status?: string
          validity_period?: number
          recertification_required?: boolean
          created_at?: string | null
          updated_at?: string | null
        }
      }
      competency_requirements: {
        Row: {
          id: string
          competency_id: string | null
          course_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          competency_id?: string | null
          course_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          competency_id?: string | null
          course_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      student_competencies: {
        Row: {
          id: string
          student_id: string | null
          competency_id: string | null
          achieved_date: string
          expiration_date: string | null
          status: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          student_id?: string | null
          competency_id?: string | null
          achieved_date?: string
          expiration_date?: string | null
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string | null
          competency_id?: string | null
          achieved_date?: string
          expiration_date?: string | null
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}