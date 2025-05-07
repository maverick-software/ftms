import React from 'react';
import { BookOpen, Award, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Student, Course, Competency } from '../../types';
import { mockCourses, mockCompetencies } from '../../data/mockData';

interface StudentRecommendationsProps {
  student: Student;
}

const StudentRecommendations: React.FC<StudentRecommendationsProps> = ({ student }) => {
  // Get student's current certifications
  const currentCertifications = student.certifications.map(cert => cert.name);
  
  // Filter courses that would help student progress
  const recommendedCourses = mockCourses.filter(course => {
    // Exclude courses that lead to certifications student already has
    return !currentCertifications.some(cert => 
      course.requirementsMet.includes(cert)
    );
  }).slice(0, 3);
  
  // Filter competencies student hasn't achieved yet
  const recommendedCompetencies = mockCompetencies.filter(comp => {
    return !currentCertifications.includes(comp.name);
  }).slice(0, 3);

  return (
    <div className="space-y-6">
      <Card title="Recommended Courses" className="bg-gray-800">
        <div className="p-4 space-y-4">
          {recommendedCourses.map(course => (
            <div 
              key={course.id}
              className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                    <BookOpen size={20} className="text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-white">{course.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{course.duration} hours</p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  rightIcon={<ArrowRight size={16} />}
                >
                  Enroll
                </Button>
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-gray-400 line-clamp-2">{course.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {course.requirementsMet.map((req, index) => (
                    <Badge key={index} variant="primary" size="sm">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Recommended Competencies" className="bg-gray-800">
        <div className="p-4 space-y-4">
          {recommendedCompetencies.map(competency => (
            <div 
              key={competency.id}
              className="p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-amber-900/50 flex items-center justify-center">
                    <Award size={20} className="text-amber-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-white">{competency.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {competency.requiresCourses.length} required courses
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  rightIcon={<ArrowRight size={16} />}
                >
                  View Path
                </Button>
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-gray-400 line-clamp-2">{competency.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudentRecommendations;