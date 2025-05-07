import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Building2,
  Edit,
  Trash2,
  ArrowLeft,
  Award,
  Plus
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/modals/Modal';
import DeleteConfirmationModal from '../components/modals/DeleteConfirmationModal';
import IssueCertificateModal from '../components/modals/IssueCertificateModal';
import StudentForm from '../components/students/StudentForm';
import StudentRecommendations from '../components/students/StudentRecommendations';
import { mockStudents } from '../data/mockData';

const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isIssueCertificateModalOpen, setIsIssueCertificateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const student = mockStudents.find(s => s.id === id);
  
  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Student Not Found</h2>
          <p className="text-gray-400 mb-4">The student you're looking for doesn't exist.</p>
          <Button
            variant="primary"
            onClick={() => navigate('/students')}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back to Students
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
    navigate('/students');
  };

  const handleIssueCertificate = async (data: {
    certificateNumber: string;
    issueDate: string;
    expirationDate?: string;
    certificateFile?: File;
  }) => {
    setIsLoading(true);
    // Simulate API call
    console.log('Issuing certificate:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/students')}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">Student Profile</h1>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setIsIssueCertificateModalOpen(true)}
          >
            Issue Certificate
          </Button>
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
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl">
                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-white">
                      {student.firstName} {student.lastName}
                    </h2>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge 
                        variant={student.status === 'active' ? 'success' : 'warning'} 
                        size="sm"
                      >
                        {student.status}
                      </Badge>
                      {student.organization && (
                        <Badge variant="primary" size="sm">
                          {student.organization.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    {student.email}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    {student.phone}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin size={16} className="text-gray-400 mr-2" />
                    {student.address}, {student.city}, {student.state} {student.zip}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    Born: {new Date(student.dateOfBirth).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Shield size={16} className="text-gray-400 mr-2" />
                    Insurance: {student.insurance.carryInsuranceProvider}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    Expires: {new Date(student.insurance.carryInsuranceExpirationDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <User size={16} className="text-gray-400 mr-2" />
                    Emergency: {student.emergencyContact}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    Emergency Phone: {student.emergencyPhone}
                  </div>
                </div>
              </div>

              {student.notes && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Notes</h3>
                  <p className="text-gray-400">{student.notes}</p>
                </div>
              )}
            </div>
          </Card>

          <Card title="Current Certifications">
            <div className="p-4">
              <div className="space-y-4">
                {student.certifications.map((cert, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gray-750 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                        <Award size={20} className="text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-white">{cert.name}</h3>
                        <p className="text-xs text-gray-400">
                          Issued: {new Date(cert.issuedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={cert.status === 'active' ? 'success' : 'warning'} 
                      size="sm"
                    >
                      {cert.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <StudentRecommendations student={student} />
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student"
        size="xl"
      >
        <StudentForm
          student={student}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Student"
        message="Are you sure you want to delete this student?"
        isLoading={isLoading}
      />

      <IssueCertificateModal
        isOpen={isIssueCertificateModalOpen}
        onClose={() => setIsIssueCertificateModalOpen(false)}
        student={student}
        onSubmit={handleIssueCertificate}
      />
    </div>
  );
};

export default StudentProfile;