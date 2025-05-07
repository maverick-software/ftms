import React, { useState } from 'react';
import { Award, Upload, Calendar, Search, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Input from '../ui/Input';
import { mockCourses } from '../../data/mockData';

interface StudentAchievementsProps {
  existingCourses?: string[];
  onUpdate?: (data: {
    completedCourses: Array<{
      courseId: string;
      completionDate: string;
      certificateFile?: File;
    }>;
  }) => void;
}

const StudentAchievements: React.FC<StudentAchievementsProps> = ({
  existingCourses = [],
  onUpdate
}) => {
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<Array<{
    courseId: string;
    completionDate: string;
    certificateFile?: File;
    isExpanded: boolean;
  }>>(existingCourses.map(id => ({
    courseId: id,
    completionDate: new Date().toISOString().split('T')[0],
    isExpanded: false
  })));

  const filteredCourses = mockCourses.filter(course => 
    course.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
    course.description.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const handleCourseToggle = (courseId: string) => {
    if (selectedCourses.some(c => c.courseId === courseId)) {
      setSelectedCourses(prev => prev.filter(c => c.courseId !== courseId));
    } else {
      setSelectedCourses(prev => [...prev, {
        courseId,
        completionDate: new Date().toISOString().split('T')[0],
        isExpanded: true
      }]);
    }
  };

  const toggleExpanded = (courseId: string) => {
    setSelectedCourses(prev => prev.map(course => 
      course.courseId === courseId 
        ? { ...course, isExpanded: !course.isExpanded }
        : course
    ));
  };

  const updateCourseDetails = (courseId: string, field: string, value: any) => {
    setSelectedCourses(prev => prev.map(course => 
      course.courseId === courseId 
        ? { ...course, [field]: value }
        : course
    ));
  };

  return (
    <Card title="Completed Courses">
      <div className="p-4 space-y-4">
        <Input
          placeholder="Search courses by name or description..."
          value={courseSearch}
          onChange={(e) => setCourseSearch(e.target.value)}
          leftIcon={<Search size={16} />}
        />
        
        <div className="space-y-3">
          {filteredCourses.map(course => {
            const selectedCourse = selectedCourses.find(c => c.courseId === course.id);
            const isSelected = !!selectedCourse;
            
            return (
              <div
                key={course.id}
                className={`
                  rounded-lg border transition-colors
                  ${isSelected
                    ? 'bg-blue-900/30 border-blue-500'
                    : 'bg-gray-750 border-gray-700 hover:border-blue-500'}
                `}
              >
                <div className="p-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                      checked={isSelected}
                      onChange={() => handleCourseToggle(course.id)}
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">{course.name}</p>
                          <p className="text-xs text-gray-400 mt-1">{course.duration} hours</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={course.status === 'active' ? 'success' : 'warning'} size="sm">
                            {course.status}
                          </Badge>
                          {isSelected && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleExpanded(course.id);
                              }}
                            >
                              {selectedCourse?.isExpanded ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{course.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {course.requirementsMet.map((req, index) => (
                          <Badge key={index} variant="primary" size="sm">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </label>
                </div>

                {isSelected && selectedCourse?.isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-700 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Completion Date"
                        type="date"
                        value={selectedCourse.completionDate}
                        onChange={(e) => updateCourseDetails(course.id, 'completionDate', e.target.value)}
                        leftIcon={<Calendar size={16} />}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Course Certificate
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <Upload size={24} className="mx-auto text-gray-400" />
                          <div className="flex text-sm text-gray-400">
                            <label className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400">
                              <span>Upload a file</span>
                              <input
                                type="file"
                                className="sr-only"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    updateCourseDetails(course.id, 'certificateFile', file);
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-400">
                            PDF, PNG, JPG up to 10MB
                          </p>
                        </div>
                      </div>
                      {selectedCourse.certificateFile && (
                        <p className="mt-2 text-sm text-gray-400">
                          Selected file: {selectedCourse.certificateFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredCourses.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              <p>No courses found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StudentAchievements;