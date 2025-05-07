import { User } from './user';

export interface CourseRequirement {
  id: string;
  name: string;
  type: 'firearm' | 'legal' | 'mental_health' | 'other';
  description?: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: number;
  requirementsMet: string[];
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  firearms: string[];
  legalKnowledge: boolean;
  mentalHealthTraining: boolean;
  additionalElements: string[];
  deliveryMethod: 'online' | 'classroom' | 'hybrid';
  assessments: {
    writtenExam: boolean;
    verbalExam: boolean;
    rangeShooting: boolean;
    qualificationStandards?: string;
  };
  modificationHistory: Array<{
    id: string;
    timestamp: string;
    modifiedBy: string;
    changes: string;
  }>;
}

export interface Competency {
  id: string;
  name: string;
  description: string;
  requiresCourses: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  level: 'basic' | 'intermediate' | 'advanced';
  prerequisites: string[];
  validityPeriod: number; // in months
  recertificationRequired: boolean;
  assessmentCriteria: string[];
  modificationHistory: Array<{
    id: string;
    timestamp: string;
    modifiedBy: string;
    changes: string;
  }>;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentDate: string;
  completionDate?: string;
  status: 'enrolled' | 'in-progress' | 'completed' | 'failed' | 'withdrawn';
  score?: number;
  instructorNotes?: string;
  certificateUrl?: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  courseId?: string;
  competencyId?: string;
  issueDate: string;
  expirationDate?: string;
  certificateNumber: string;
  fileUrl: string;
  verified: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuedDate: string;
  expirationDate: string;
  status: 'active' | 'expired' | 'expiring';
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  completedCourses: number;
  pendingCertifications: number;
  expiringInsurance: number;
  upcomingRenewals: {
    students: Array<{
      student: Student;
      certifications: Certification[];
      daysUntilExpiration: number;
    }>;
    organizations: Array<{
      organization: Organization;
      studentCount: number;
      nextRenewalDate: string;
    }>;
  };
}

export interface Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dateOfBirth: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'pending';
  emergencyContact: string;
  emergencyPhone: string;
  notes?: string;
  insurance: Insurance;
  organization?: Organization;
  certifications: Certification[];
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  contactPerson: string;
  email: string;
  phone: string;
}

export interface Insurance {
  id: string;
  studentId: string;
  carryInsuranceProvider: string;
  carryInsurancePolicyNumber: string;
  carryInsuranceExpirationDate: string;
  umbrellaInsuranceProvider: string;
  umbrellaInsurancePolicyNumber: string;
  umbrellaInsuranceExpirationDate: string;
  hasValidInsurance: boolean;
}