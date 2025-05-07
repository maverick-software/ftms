export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      certification_requirements: {
        Row: {
          certification_type_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          certification_type_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          certification_type_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certification_requirements_certification_type_id_fkey"
            columns: ["certification_type_id"]
            isOneToOne: false
            referencedRelation: "certification_types"
            referencedColumns: ["id"]
          },
        ]
      }
      certification_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          status: string
          updated_at: string | null
          validity_period: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string | null
          validity_period: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string | null
          validity_period?: number
        }
        Relationships: []
      }
      competencies: {
        Row: {
          created_at: string | null
          description: string
          id: string
          level: string
          name: string
          recertification_required: boolean
          status: string
          updated_at: string | null
          validity_period: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          level: string
          name: string
          recertification_required?: boolean
          status?: string
          updated_at?: string | null
          validity_period: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          level?: string
          name?: string
          recertification_required?: boolean
          status?: string
          updated_at?: string | null
          validity_period?: number
        }
        Relationships: []
      }
      competency_requirements: {
        Row: {
          competency_id: string | null
          course_id: string | null
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          competency_id?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          competency_id?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "competency_requirements_competency_id_fkey"
            columns: ["competency_id"]
            isOneToOne: false
            referencedRelation: "competencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competency_requirements_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          certificate_url: string | null
          completion_date: string | null
          course_id: string | null
          created_at: string | null
          enrollment_date: string
          id: string
          instructor_notes: string | null
          score: number | null
          status: string
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          certificate_url?: string | null
          completion_date?: string | null
          course_id?: string | null
          created_at?: string | null
          enrollment_date?: string
          id?: string
          instructor_notes?: string | null
          score?: number | null
          status?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          certificate_url?: string | null
          completion_date?: string | null
          course_id?: string | null
          created_at?: string | null
          enrollment_date?: string
          id?: string
          instructor_notes?: string | null
          score?: number | null
          status?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      course_requirements: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_requirements_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          additional_elements: string[]
          created_at: string | null
          delivery_method: string
          description: string
          duration: number
          firearms: string[]
          id: string
          legal_knowledge: boolean
          mental_health_training: boolean
          name: string
          status: string
          updated_at: string | null
        }
        Insert: {
          additional_elements?: string[]
          created_at?: string | null
          delivery_method: string
          description: string
          duration: number
          firearms?: string[]
          id?: string
          legal_knowledge?: boolean
          mental_health_training?: boolean
          name: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          additional_elements?: string[]
          created_at?: string | null
          delivery_method?: string
          description?: string
          duration?: number
          firearms?: string[]
          id?: string
          legal_knowledge?: boolean
          mental_health_training?: boolean
          name?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      organization_members: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          role: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          contact_person: string
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string
          status: string
          type: string
          updated_at: string | null
        }
        Insert: {
          contact_person: string
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone: string
          status?: string
          type: string
          updated_at?: string | null
        }
        Update: {
          contact_person?: string
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          status?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      student_certifications: {
        Row: {
          certificate_number: string
          certification_type_id: string | null
          created_at: string | null
          expiration_date: string | null
          file_url: string | null
          id: string
          issue_date: string
          status: string
          student_id: string
          updated_at: string | null
        }
        Insert: {
          certificate_number: string
          certification_type_id?: string | null
          created_at?: string | null
          expiration_date?: string | null
          file_url?: string | null
          id?: string
          issue_date: string
          status?: string
          student_id: string
          updated_at?: string | null
        }
        Update: {
          certificate_number?: string
          certification_type_id?: string | null
          created_at?: string | null
          expiration_date?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string
          status?: string
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_certifications_certification_type_id_fkey"
            columns: ["certification_type_id"]
            isOneToOne: false
            referencedRelation: "certification_types"
            referencedColumns: ["id"]
          },
        ]
      }
      student_competencies: {
        Row: {
          achieved_date: string
          competency_id: string | null
          created_at: string | null
          expiration_date: string | null
          id: string
          status: string
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          achieved_date?: string
          competency_id?: string | null
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          status?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          achieved_date?: string
          competency_id?: string | null
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          status?: string
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_competencies_competency_id_fkey"
            columns: ["competency_id"]
            isOneToOne: false
            referencedRelation: "competencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_competencies_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_insurance: {
        Row: {
          carry_insurance_expiration_date: string
          carry_insurance_policy_number: string
          carry_insurance_provider: string
          created_at: string | null
          id: string
          student_id: string | null
          umbrella_insurance_expiration_date: string | null
          umbrella_insurance_policy_number: string | null
          umbrella_insurance_provider: string | null
          updated_at: string | null
        }
        Insert: {
          carry_insurance_expiration_date: string
          carry_insurance_policy_number: string
          carry_insurance_provider: string
          created_at?: string | null
          id?: string
          student_id?: string | null
          umbrella_insurance_expiration_date?: string | null
          umbrella_insurance_policy_number?: string | null
          umbrella_insurance_provider?: string | null
          updated_at?: string | null
        }
        Update: {
          carry_insurance_expiration_date?: string
          carry_insurance_policy_number?: string
          carry_insurance_provider?: string
          created_at?: string | null
          id?: string
          student_id?: string | null
          umbrella_insurance_expiration_date?: string | null
          umbrella_insurance_policy_number?: string | null
          umbrella_insurance_provider?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_insurance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          address: string
          city: string
          created_at: string | null
          date_of_birth: string
          email: string
          emergency_contact: string
          emergency_phone: string
          enrollment_date: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          organization_id: string | null
          phone: string
          state: string
          status: string
          updated_at: string | null
          user_id: string | null
          zip: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          date_of_birth: string
          email: string
          emergency_contact: string
          emergency_phone: string
          enrollment_date?: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          organization_id?: string | null
          phone: string
          state: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
          zip: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          date_of_birth?: string
          email?: string
          emergency_contact?: string
          emergency_phone?: string
          enrollment_date?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          organization_id?: string | null
          phone?: string
          state?: string
          status?: string
          updated_at?: string | null
          user_id?: string | null
          zip?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
