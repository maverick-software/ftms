import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Award, 
  Clock, 
  Users,
  Calendar,
  CheckCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import DeleteConfirmationModal from '../components/modals/DeleteConfirmationModal';

interface CertificationType {
  id: string;
  name: string;
  description: string;
  validityPeriod: number;
  requirements: {
    id: string;
    name: string;
    type: 'course' | 'competency' | 'other';
    description: string;
  }[];
  status: 'active' | 'inactive';
}

const mockCertificationTypes: CertificationType[] = [
  {
    id: '1',
    name: 'Basic Firearms Safety',
    description: 'Certification for basic firearms safety and handling',
    validityPeriod: 24,
    requirements: [
      {
        id: '1',
        name: 'Basic Safety Course',
        type: 'course',
        description: 'Must complete the Basic Safety Course'
      },
      {
        id: '2',
        name: 'Written Exam',
        type: 'other',
        description: 'Must pass written examination with 80% or higher'
      },
      {
        id: '3',
        name: 'Practical Assessment',
        type: 'other',
        description: 'Must demonstrate proficiency in safe handling'
      }
    ],
    status: 'active'
  }
];

const CertificationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const certification = mockCertificationTypes.find(c => c.id === id);
  
  if (!certification) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Certification Not Found</h2>
          <p className="text-gray-400 mb-4">The certification you're looking for doesn't exist.</p>
          <Button
            variant="primary"
            onClick={() => navigate('/certifications')}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back to Certifications
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate('/certifications');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/certifications')}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">Certification Details</h1>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            leftIcon={<Edit size={16} />}
            onClick={() => navigate(`/certifications/${id}/edit`)}
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
                    <h2 className="text-xl font-bold text-white">{certification.name}</h2>
                    <Badge 
                      variant={certification.status === 'active' ? 'success' : 'danger'} 
                      size="sm"
                    >
                      {certification.status}
                    </Badge>
                  </div>
                  <p className="mt-2 text-gray-400">{certification.description}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center">
                    <Clock size={20} className="text-blue-400" />
                    <span className="ml-2 text-sm text-gray-300">Validity Period</span>
                  </div>
                  <p className="mt-1 text-xl font-bold text-white">{certification.validityPeriod} months</p>
                </div>

                <div className="p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center">
                    <Users size={20} className="text-blue-400" />
                    <span className="ml-2 text-sm text-gray-300">Active Holders</span>
                  </div>
                  <p className="mt-1 text-xl font-bold text-white">24 students</p>
                </div>

                <div className="p-4 bg-gray-750 rounded-lg">
                  <div className="flex items-center">
                    <Calendar size={20} className="text-blue-400" />
                    <span className="ml-2 text-sm text-gray-300">Expiring Soon</span>
                  </div>
                  <p className="mt-1 text-xl font-bold text-white">3 certificates</p>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Requirements">
            <div className="p-6 space-y-4">
              {certification.requirements.map((req, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gray-750 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-white">{req.name}</h3>
                        <Badge 
                          variant={
                            req.type === 'course' ? 'primary' :
                            req.type === 'competency' ? 'success' : 
                            'warning'
                          } 
                          size="sm"
                        >
                          {req.type}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-gray-400">{req.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Recent Certifications">
            <div className="p-4">
              <div className="text-center py-6 text-gray-400">
                <Award size={32} className="mx-auto mb-2" />
                <p>No recent certifications</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Statistics">
            <div className="p-4 space-y-4">
              <div className="p-4 bg-gray-750 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300">Certification Rate</h4>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-400">Success Rate</span>
                    <span className="text-xs font-medium text-white">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-750 rounded-lg">
                <h4 className="text-sm font-medium text-gray-300">Recent Activity</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle size={14} className="text-green-400" />
                      <span className="ml-2 text-sm text-gray-300">
                        John Smith certified
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle size={14} className="text-green-400" />
                      <span className="ml-2 text-sm text-gray-300">
                        Sarah Johnson certified
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">5 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Certification"
        message="Are you sure you want to delete this certification type? This action cannot be undone."
        isLoading={isLoading}
      />
    </div>
  );
};

export default CertificationDetails;