import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Clock, 
  Users, 
  BookOpen,
  Award,
  Calendar,
  CheckCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/modals/Modal';
import DeleteConfirmationModal from '../components/modals/DeleteConfirmationModal';
import { mockCourses, mockStudents, mockEnrollments, mockFirearms, mockAdditionalElements } from '../data/mockData';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const course = mockCourses.find(c => c.id === id);
  const courseEnrollments = mockEnrollments.filter(e => e.courseId === id);
  const enrolledStudents = courseEnrollments.map(enrollment => {
    const student = mockStudents.find(s => s.id === enrollment.studentId);
    return {
      ...student,
      enrollmentStatus: enrollment.status,
      enrollmentDate: enrollment.enrollmentDate,
      completionDate: enrollment.completionDate,
      score: enrollment.score
    };
  });
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Course Not Found</h2>
          <p className="text-gray-400 mb-4">The course you're looking for doesn't exist.</p>
          <Button
            variant="primary"
            onClick={() => navigate('/courses')}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const handleUpdate = async (data: any) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsEditModalOpen(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate('/courses');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/courses')}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">Course Details</h1>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            leftIcon={<Edit size={16} />}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            leftIcon={<Trash2 size={16} />}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-bold text-white">{course.name}</h2>
                    <Badge 
                      variant={course.status === 'active' ? 'success' : 'warning'} 
                      size="sm"
                    >
                      {course.status}
                    </Badge>
                  </div>
                  <p className="mt-2 text-gray-400">{course.description}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center">
                    <Clock size={20} className="text-blue-400" />
                    <span className="ml-2 text-sm text-gray-300">Duration</span>
                  </div>
                  <p className="mt-1 text-xl font-bold text-white">{course.duration} hours</p>
                </div>

                <div className="p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center">
                    <Users size={20} className="text-blue-400" />
                    <span className="ml-2 text-sm text-gray-300">Enrolled</span>
                  </div>
                  <p className="mt-1 text-xl font-bold text-white">{enrolledStudents.length} students</p>
                </div>

                <div className="p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle size={20} className="text-blue-400" />
                    <span className="ml-2 text-sm text-gray-300">Completion Rate</span>
                  </div>
                  <p className="mt-1 text-xl font-bold text-white">
                    {Math.round((enrolledStudents.filter(s => s.enrollmentStatus === 'completed').length / enrolledStudents.length) * 100) || 0}%
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Requirements Met</h3>
                <div className="flex flex-wrap gap-2">
                  {course.requirementsMet.map((req, index) => (
                    <Badge key={index} variant="primary" size="sm" icon={<Award size={12} />}>
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card title="Training Elements">
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Firearms Included</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {course.firearms.map(firearmId => {
                    const firearm = mockFirearms.find(f => f.id === firearmId);
                    return (
                      <div key={firearmId} className="flex items-center space-x-2 p-3 bg-gray-750 rounded-lg">
                        <span className="text-sm text-gray-300">{firearm?.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Additional Elements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.legalKnowledge && (
                    <div className="p-4 bg-gray-750 rounded-lg">
                      <h4 className="text-sm font-medium text-white">Legal Knowledge Training</h4>
                      <p className="text-sm text-gray-400 mt-1">Includes legal aspects and requirements</p>
                    </div>
                  )}

                  {course.mentalHealthTraining && (
                    <div className="p-4 bg-gray-750 rounded-lg">
                      <h4 className="text-sm font-medium text-white">Mental Health Training</h4>
                      <p className="text-sm text-gray-400 mt-1">Includes mental health awareness</p>
                    </div>
                  )}

                  {course.additionalElements.map(elementId => {
                    const element = mockAdditionalElements.find(e => e.id === elementId);
                    return (
                      <div key={elementId} className="p-4 bg-gray-750 rounded-lg">
                        <h4 className="text-sm font-medium text-white">{element?.name}</h4>
                        <Badge 
                          variant="primary" 
                          size="sm" 
                          className="mt-2"
                        >
                          {element?.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          <Card title="Delivery & Assessment">
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Delivery Method</h3>
                <Badge 
                  variant="primary" 
                  size="sm"
                >
                  {course.deliveryMethod.charAt(0).toUpperCase() + course.deliveryMethod.slice(1)}
                </Badge>
              </div>

              <div className="pt-6 border-t border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Assessment Methods</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.assessments.writtenExam && (
                    <div className="p-4 bg-gray-750 rounded-lg">
                      <h4 className="text-sm font-medium text-white">Written Examination</h4>
                      <p className="text-sm text-gray-400 mt-1">Required for course completion</p>
                    </div>
                  )}

                  {course.assessments.verbalExam && (
                    <div className="p-4 bg-gray-750 rounded-lg">
                      <h4 className="text-sm font-medium text-white">Verbal Examination</h4>
                      <p className="text-sm text-gray-400 mt-1">Verbal assessment required</p>
                    </div>
                  )}

                  {course.assessments.rangeShooting && (
                    <div className="p-4 bg-gray-750 rounded-lg col-span-full">
                      <h4 className="text-sm font-medium text-white">Range Shooting Qualification</h4>
                      <p className="text-sm text-gray-400 mt-2">{course.assessments.qualificationStandards}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card title="Modification History">
            <div className="p-6">
              <div className="space-y-4">
                {course.modificationHistory.map((modification, index) => (
                  <div 
                    key={modification.id}
                    className={`p-4 bg-gray-750 rounded-lg ${
                      index === 0 ? 'border-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-300">{modification.changes}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Modified by {modification.modifiedBy}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(modification.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Enrolled Students">
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Student</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Enrolled Date</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Completion</th>
                      <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {enrolledStudents.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-750">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                              {student?.firstName.charAt(0)}{student?.lastName.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-white">
                                {student?.firstName} {student?.lastName}
                              </p>
                              <p className="text-xs text-gray-400">{student?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Badge 
                            variant={
                              student.enrollmentStatus === 'completed' ? 'success' :
                              student.enrollmentStatus === 'in-progress' ? 'warning' :
                              'primary'
                            } 
                            size="sm"
                          >
                            {student.enrollmentStatus}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(student.enrollmentDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                          {student.completionDate ? 
                            new Date(student.completionDate).toLocaleDateString() : 
                            '-'
                          }
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {student.score ? (
                            <span className="text-sm font-medium text-white">{student.score}%</span>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Course Statistics">
            <div className="p-4 space-y-4">
              <div className="p-4 bg-gray-750 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300">Completion Rate</h4>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-400">Progress</span>
                    <span className="text-xs font-medium text-white">75%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-750 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300">Average Score</h4>
                <p className="text-2xl font-bold text-white mt-1">
                  {Math.round(enrolledStudents.reduce((acc, student) => acc + (student.score || 0), 0) / enrolledStudents.length) || 0}%
                </p>
              </div>

              <div className="p-4 bg-gray-750 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300">Recent Activity</h4>
                <div className="mt-2 space-y-2">
                  {enrolledStudents.slice(0, 3).map((student, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="ml-2 text-sm text-gray-300">
                          {student.firstName} {student.lastName}
                        </span>
                      </div>
                      <Badge variant="primary" size="sm">
                        {student.enrollmentStatus}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card title="Course Resources">
            <div className="p-4">
              <div className="text-center py-6 text-gray-400">
                <BookOpen size={32} className="mx-auto mb-2" />
                <p>No resources available</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Course"
        size="lg"
      >
        {/* Course edit form will go here */}
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        isLoading={isLoading}
      />
    </div>
  );
};

export default CourseDetails;