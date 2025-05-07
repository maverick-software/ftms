import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Phone, 
  Users,
  Edit,
  Trash2,
  ArrowLeft,
  User,
  Shield,
  Calendar
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/modals/Modal';
import DeleteConfirmationModal from '../components/modals/DeleteConfirmationModal';
import { mockOrganizations, mockStudents } from '../data/mockData';

const OrganizationProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const organization = mockOrganizations.find(org => org.id === id);
  const organizationStudents = mockStudents.filter(student => student.organization?.id === id);
  
  if (!organization) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Organization Not Found</h2>
          <p className="text-gray-400 mb-4">The organization you're looking for doesn't exist.</p>
          <Button
            variant="primary"
            onClick={() => navigate('/organizations')}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back to Organizations
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
    navigate('/organizations');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/organizations')}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">Organization Profile</h1>
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
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center">
                    <Building2 size={32} className="text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-white">
                      {organization.name}
                    </h2>
                    <Badge variant="primary" size="sm" className="mt-2">
                      {organization.type}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <User size={16} className="text-gray-400 mr-2" />
                    Contact: {organization.contactPerson}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Mail size={16} className="text-gray-400 mr-2" />
                    {organization.email}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone size={16} className="text-gray-400 mr-2" />
                    {organization.phone}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Users size={16} className="text-gray-400 mr-2" />
                    {organizationStudents.length} Active Students
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Shield size={16} className="text-gray-400 mr-2" />
                    {organizationStudents.filter(s => s.insurance.hasValidInsurance).length} Insured Students
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar size={16} className="text-gray-400 mr-2" />
                    Member since: {new Date().getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Students">
            <div className="p-4">
              <div className="space-y-4">
                {organizationStudents.map(student => (
                  <div 
                    key={student.id}
                    className="p-4 bg-gray-750 rounded-lg flex items-center justify-between hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => navigate(`/students/${student.id}`)}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-white">
                          {student.firstName} {student.lastName}
                        </h3>
                        <p className="text-xs text-gray-400">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={student.status === 'active' ? 'success' : 'warning'} 
                        size="sm"
                      >
                        {student.status}
                      </Badge>
                      <Badge 
                        variant={student.insurance.hasValidInsurance ? 'success' : 'danger'} 
                        size="sm"
                      >
                        {student.insurance.hasValidInsurance ? 'Insured' : 'Uninsured'}
                      </Badge>
                    </div>
                  </div>
                ))}

                {organizationStudents.length === 0 && (
                  <div className="text-center py-6 text-gray-400">
                    <p>No students found for this organization</p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Quick Stats">
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-750 rounded-lg">
                  <h4 className="text-sm text-gray-400">Total Students</h4>
                  <p className="text-2xl font-bold text-white mt-1">
                    {organizationStudents.length}
                  </p>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg">
                  <h4 className="text-sm text-gray-400">Active Students</h4>
                  <p className="text-2xl font-bold text-white mt-1">
                    {organizationStudents.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg">
                  <h4 className="text-sm text-gray-400">Insured</h4>
                  <p className="text-2xl font-bold text-white mt-1">
                    {organizationStudents.filter(s => s.insurance.hasValidInsurance).length}
                  </p>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg">
                  <h4 className="text-sm text-gray-400">Certifications</h4>
                  <p className="text-2xl font-bold text-white mt-1">
                    {organizationStudents.reduce((acc, student) => acc + student.certifications.length, 0)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Recent Activity">
            <div className="p-4">
              <div className="space-y-4">
                <div className="text-center py-6 text-gray-400">
                  <p>No recent activity</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Organization"
        size="lg"
      >
        {/* Organization edit form will go here */}
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Organization"
        message="Are you sure you want to delete this organization?"
        isLoading={isLoading}
      />
    </div>
  );
};

export default OrganizationProfile;