import { User, Student, Course, Competency, Enrollment, Certificate, Insurance, DashboardStats, Organization, Certification } from '../types';

export const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Austin Police Department',
    type: 'Law Enforcement',
    contactPerson: 'John Smith',
    email: 'jsmith@apd.com',
    phone: '(512) 555-0123'
  },
  {
    id: '2',
    name: 'Travis County Sheriff',
    type: 'Law Enforcement',
    contactPerson: 'Sarah Johnson',
    email: 'sjohnson@tcsheriff.org',
    phone: '(512) 555-0124'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Juan Trevino',
    role: 'admin',
    createdAt: '2023-01-15T12:00:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    email: 'instructor@example.com',
    name: 'Sarah Smith',
    role: 'instructor',
    createdAt: '2023-02-10T14:30:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    email: 'student1@example.com',
    name: 'Mike Johnson',
    role: 'student',
    createdAt: '2023-03-05T09:15:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    email: 'student2@example.com',
    name: 'Jessica Williams',
    role: 'student',
    createdAt: '2023-03-08T11:45:00Z',
    profileImage: 'https://i.pravatar.cc/150?img=4'
  }
];

export const mockInsurance: Insurance[] = [
  {
    id: '1',
    studentId: '1',
    carryInsuranceProvider: 'Firearms Legal Protection',
    carryInsurancePolicyNumber: 'FLP12345678',
    carryInsuranceExpirationDate: '2024-04-15',
    umbrellaInsuranceProvider: 'State Farm',
    umbrellaInsurancePolicyNumber: 'SF87654321',
    umbrellaInsuranceExpirationDate: '2024-05-10',
    hasValidInsurance: true
  },
  {
    id: '2',
    studentId: '2',
    carryInsuranceProvider: 'USCCA',
    carryInsurancePolicyNumber: 'USC98765432',
    carryInsuranceExpirationDate: '2024-04-22',
    umbrellaInsuranceProvider: 'Allstate',
    umbrellaInsurancePolicyNumber: 'AS56781234',
    umbrellaInsuranceExpirationDate: '2024-04-30',
    hasValidInsurance: true
  },
  {
    id: '3',
    studentId: '3',
    carryInsuranceProvider: 'CCW Safe',
    carryInsurancePolicyNumber: 'CCW45678912',
    carryInsuranceExpirationDate: '2023-12-31',
    umbrellaInsuranceProvider: 'Progressive',
    umbrellaInsurancePolicyNumber: 'PG12348765',
    umbrellaInsuranceExpirationDate: '2024-01-15',
    hasValidInsurance: false
  },
  {
    id: '4',
    studentId: '4',
    carryInsuranceProvider: 'U.S. Law Shield',
    carryInsurancePolicyNumber: 'USLS87651234',
    carryInsuranceExpirationDate: '2024-04-28',
    umbrellaInsuranceProvider: 'Liberty Mutual',
    umbrellaInsurancePolicyNumber: 'LM13578642',
    umbrellaInsuranceExpirationDate: '2024-05-15',
    hasValidInsurance: true
  }
];

const mockCertifications: Certification[] = [
  {
    id: '1',
    name: 'Basic Firearms Safety',
    issuedDate: '2023-06-15',
    expirationDate: '2024-06-15',
    status: 'expiring'
  },
  {
    id: '2',
    name: 'Advanced Tactical Training',
    issuedDate: '2023-08-20',
    expirationDate: '2024-08-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Concealed Carry Certification',
    issuedDate: '2023-03-10',
    expirationDate: '2024-03-10',
    status: 'expired'
  }
];

export const mockStudents: Student[] = [
  {
    id: '1',
    userId: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'student1@example.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    dateOfBirth: '1985-07-15',
    enrollmentDate: '2023-03-05',
    status: 'active',
    emergencyContact: 'Jane Johnson',
    emergencyPhone: '(555) 987-6543',
    notes: 'Has prior military experience.',
    insurance: mockInsurance[0],
    organization: mockOrganizations[0],
    certifications: [mockCertifications[0], mockCertifications[1]]
  },
  {
    id: '2',
    userId: '4',
    firstName: 'Jessica',
    lastName: 'Williams',
    email: 'student2@example.com',
    phone: '(555) 234-5678',
    address: '456 Oak Avenue',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
    dateOfBirth: '1990-03-22',
    enrollmentDate: '2023-03-08',
    status: 'active',
    emergencyContact: 'Robert Williams',
    emergencyPhone: '(555) 876-5432',
    notes: 'First-time gun owner.',
    insurance: mockInsurance[1],
    organization: mockOrganizations[0],
    certifications: [mockCertifications[2]]
  },
  {
    id: '3',
    userId: '',
    firstName: 'David',
    lastName: 'Brown',
    email: 'student3@example.com',
    phone: '(555) 345-6789',
    address: '789 Pine Road',
    city: 'Round Rock',
    state: 'TX',
    zip: '78664',
    dateOfBirth: '1978-11-30',
    enrollmentDate: '2023-04-12',
    status: 'active',
    emergencyContact: 'Mary Brown',
    emergencyPhone: '(555) 765-4321',
    notes: 'Experienced shooter, competition background.',
    insurance: mockInsurance[2],
    organization: mockOrganizations[1],
    certifications: [mockCertifications[0]]
  },
  {
    id: '4',
    userId: '',
    firstName: 'Lisa',
    lastName: 'Garcia',
    email: 'student4@example.com',
    phone: '(555) 456-7890',
    address: '101 Cedar Lane',
    city: 'Georgetown',
    state: 'TX',
    zip: '78626',
    dateOfBirth: '1988-05-17',
    enrollmentDate: '2023-05-20',
    status: 'pending',
    emergencyContact: 'Carlos Garcia',
    emergencyPhone: '(555) 654-3210',
    insurance: mockInsurance[3],
    organization: mockOrganizations[1],
    certifications: [mockCertifications[1]]
  }
];

export const mockFirearms = [
  { id: 'pistol', name: 'Pistol/Handgun' },
  { id: 'revolver', name: 'Revolver' },
  { id: 'rifle', name: 'Rifle' },
  { id: 'shotgun', name: 'Shotgun' },
  { id: 'ar', name: 'AR Platform' },
  { id: 'precision', name: 'Precision Rifle' }
];

export const mockAdditionalElements = [
  { id: 'legal_basics', name: 'Basic Legal Knowledge', type: 'legal' },
  { id: 'legal_advanced', name: 'Advanced Legal Concepts', type: 'legal' },
  { id: 'mental_health_awareness', name: 'Mental Health Awareness', type: 'mental_health' },
  { id: 'crisis_intervention', name: 'Crisis Intervention', type: 'mental_health' },
  { id: 'first_aid', name: 'First Aid', type: 'other' },
  { id: 'tactical_medicine', name: 'Tactical Medicine', type: 'other' },
  { id: 'force_continuum', name: 'Force Continuum', type: 'other' },
  { id: 'situational_awareness', name: 'Situational Awareness', type: 'other' }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Concealed Carry Fundamentals',
    description: 'Essential training for concealed carry permits covering legal aspects, safety, and practical skills.',
    duration: 8,
    requirementsMet: ['Basic Safety', 'Legal Knowledge', 'Handgun Proficiency'],
    status: 'active',
    createdAt: '2023-01-10T10:00:00Z',
    firearms: ['pistol', 'revolver'],
    legalKnowledge: true,
    mentalHealthTraining: true,
    additionalElements: ['legal_basics', 'mental_health_awareness', 'situational_awareness'],
    deliveryMethod: 'hybrid',
    assessments: {
      writtenExam: true,
      verbalExam: true,
      rangeShooting: true,
      qualificationStandards: 'Must demonstrate proficiency with primary carry firearm: 80% hits in 8" circle at 7 yards, 15 yards, and 25 yards.'
    },
    modificationHistory: [
      {
        id: '1',
        timestamp: '2023-01-10T10:00:00Z',
        modifiedBy: 'John Smith',
        changes: 'Course created'
      },
      {
        id: '2',
        timestamp: '2023-02-15T14:30:00Z',
        modifiedBy: 'Sarah Johnson',
        changes: 'Updated qualification standards'
      }
    ]
  },
  {
    id: '2',
    name: 'Advanced Defensive Pistol',
    description: 'Advanced techniques for defensive shooting situations including movement, cover usage, and low-light conditions.',
    duration: 16,
    requirementsMet: ['Advanced Safety', 'Tactical Movement', 'Threat Assessment'],
    status: 'active',
    createdAt: '2023-02-15T11:30:00Z',
    firearms: ['pistol'],
    legalKnowledge: true,
    mentalHealthTraining: true,
    additionalElements: ['legal_advanced', 'crisis_intervention', 'tactical_medicine', 'force_continuum'],
    deliveryMethod: 'in-person',
    assessments: {
      writtenExam: true,
      verbalExam: true,
      rangeShooting: true,
      qualificationStandards: 'Must demonstrate advanced proficiency: 90% hits in 6" circle at 10 yards, 15 yards, and 25 yards under time pressure.'
    },
    modificationHistory: [
      {
        id: '1',
        timestamp: '2023-02-15T11:30:00Z',
        modifiedBy: 'Sarah Johnson',
        changes: 'Course created'
      }
    ]
  },
  {
    id: '3',
    name: 'Home Defense Shotgun',
    description: 'Comprehensive training on shotgun usage for home defense scenarios.',
    duration: 8,
    requirementsMet: ['Shotgun Safety', 'Home Defense Strategy', 'Shotgun Handling'],
    status: 'active',
    createdAt: '2023-03-20T09:45:00Z',
    firearms: ['shotgun'],
    legalKnowledge: true,
    mentalHealthTraining: false,
    additionalElements: ['legal_basics', 'situational_awareness', 'first_aid'],
    deliveryMethod: 'in-person',
    assessments: {
      writtenExam: true,
      verbalExam: true,
      rangeShooting: true,
      qualificationStandards: 'Must demonstrate proficiency with shotgun: Pattern testing and target engagement from 5-15 yards.'
    },
    modificationHistory: [
      {
        id: '1',
        timestamp: '2023-03-20T09:45:00Z',
        modifiedBy: 'John Smith',
        changes: 'Course created'
      }
    ]
  },
  {
    id: '4',
    name: 'Long Range Precision Rifle',
    description: 'Training focused on long-distance accuracy and precision shooting fundamentals.',
    duration: 24,
    requirementsMet: ['Ballistics Understanding', 'Range Estimation', 'Wind Reading'],
    status: 'draft',
    createdAt: '2023-04-25T14:15:00Z',
    firearms: ['precision', 'rifle'],
    legalKnowledge: false,
    mentalHealthTraining: false,
    additionalElements: ['situational_awareness'],
    deliveryMethod: 'in-person',
    assessments: {
      writtenExam: true,
      verbalExam: false,
      rangeShooting: true,
      qualificationStandards: 'Must demonstrate consistent hits on man-sized targets at 500+ yards with various wind conditions.'
    },
    modificationHistory: [
      {
        id: '1',
        timestamp: '2023-04-25T14:15:00Z',
        modifiedBy: 'Sarah Johnson',
        changes: 'Course created as draft'
      }
    ]
  }
];

export const mockCompetencies: Competency[] = [
  {
    id: '1',
    name: 'Basic Firearms Safety',
    description: 'Fundamental safety skills and knowledge required for responsible firearms handling.',
    requiresCourses: ['1'],
    status: 'active',
    createdAt: '2023-01-05T08:30:00Z',
    level: 'basic',
    prerequisites: [],
    validityPeriod: 24,
    recertificationRequired: true,
    assessmentCriteria: [
      'Demonstrate proper firearm handling',
      'Pass written safety exam with 90% or higher',
      'Complete hands-on safety assessment'
    ],
    modificationHistory: [
      {
        id: '1',
        timestamp: '2023-01-05T08:30:00Z',
        modifiedBy: 'John Smith',
        changes: 'Competency created'
      }
    ]
  },
  {
    id: '2',
    name: 'Concealed Carry Certification',
    description: 'Comprehensive skills and knowledge required for legal concealed carry of firearms.',
    requiresCourses: ['1', '2'],
    status: 'active',
    createdAt: '2023-02-10T13:45:00Z',
    level: 'intermediate',
    prerequisites: ['1'],
    validityPeriod: 12,
    recertificationRequired: true,
    assessmentCriteria: [
      'Pass legal knowledge examination',
      'Complete situational judgment scenarios',
      'Demonstrate proficiency in concealed draw techniques',
      'Pass shooting qualification course'
    ],
    modificationHistory: [
      {
        id: '1',
        timestamp: '2023-02-10T13:45:00Z',
        modifiedBy: 'Sarah Johnson',
        changes: 'Competency created'
      }
    ]
  },
  {
    id: '3',
    name: 'Defensive Shooting Specialist',
    description: 'Advanced tactical skills for defensive shooting scenarios.',
    requiresCourses: ['2', '3'],
    status: 'active',
    createdAt: '2023-03-15T11:15:00Z',
    level: 'advanced',
    prerequisites: ['1', '2'],
    validityPeriod: 12,
    recertificationRequired: true,
    assessmentCriteria: [
      'Advanced shooting qualification course',
      'Tactical movement assessment',
      'Low-light shooting proficiency',
      'Force-on-force scenario completion'
    ],
    modificationHistory: [
      {
        id: '1',
        timestamp: '2023-03-15T11:15:00Z',
        modifiedBy: 'John Smith',
        changes: 'Competency created'
      }
    ]
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    enrollmentDate: '2023-03-10',
    completionDate: '2023-03-18',
    status: 'completed',
    score: 94,
    instructorNotes: 'Excellent performance, particularly in safety procedures.',
    certificateUrl: '/certificates/cert-1.pdf'
  },
  {
    id: '2',
    studentId: '1',
    courseId: '2',
    enrollmentDate: '2023-04-05',
    status: 'in-progress',
    instructorNotes: 'Making good progress. Needs work on tactical movement.'
  },
  {
    id: '3',
    studentId: '2',
    courseId: '1',
    enrollmentDate: '2023-03-15',
    completionDate: '2023-03-23',
    status: 'completed',
    score: 88,
    instructorNotes: 'Good understanding of legal aspects. Recommended additional practice for confidence.',
    certificateUrl: '/certificates/cert-2.pdf'
  },
  {
    id: '4',
    studentId: '3',
    courseId: '3',
    enrollmentDate: '2023-04-20',
    status: 'in-progress',
    instructorNotes: 'Excellent shotgun handling skills. Progressing rapidly.'
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    studentId: '1',
    courseId: '1',
    issueDate: '2023-03-18',
    expirationDate: '2025-03-18',
    certificateNumber: 'CCF-2023-001',
    fileUrl: '/certificates/cert-1.pdf',
    verified: true
  },
  {
    id: '2',
    studentId: '2',
    courseId: '1',
    issueDate: '2023-03-23',
    expirationDate: '2025-03-23',
    certificateNumber: 'CCF-2023-002',
    fileUrl: '/certificates/cert-2.pdf',
    verified: true
  },
  {
    id: '3',
    studentId: '1',
    competencyId: '1',
    issueDate: '2023-03-18',
    certificateNumber: 'BFS-2023-001',
    fileUrl: '/certificates/comp-1.pdf',
    verified: true
  }
];

export const mockDashboardStats: DashboardStats = {
  totalStudents: 24,
  activeStudents: 20,
  completedCourses: 67,
  pendingCertifications: 8,
  expiringInsurance: 3,
  upcomingRenewals: {
    students: [
      {
        student: mockStudents[0],
        certifications: [mockCertifications[0]],
        daysUntilExpiration: 30
      },
      {
        student: mockStudents[1],
        certifications: [mockCertifications[2]],
        daysUntilExpiration: 15
      }
    ],
    organizations: [
      {
        organization: mockOrganizations[0],
        studentCount: 15,
        nextRenewalDate: '2024-06-30'
      },
      {
        organization: mockOrganizations[1],
        studentCount: 8,
        nextRenewalDate: '2024-07-15'
      }
    ]
  }
};