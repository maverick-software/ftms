import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Award, Calendar, Clock, List, LayoutGrid } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Modal from '../components/modals/Modal';

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
  },
  {
    id: '2',
    name: 'Advanced Tactical Training',
    description: 'Advanced certification for tactical firearms operations',
    validityPeriod: 12,
    requirements: [
      {
        id: '1',
        name: 'Advanced Tactical Course',
        type: 'course',
        description: 'Must complete Advanced Tactical Training course'
      },
      {
        id: '2',
        name: 'Physical Assessment',
        type: 'other',
        description: 'Must pass physical fitness requirements'
      },
      {
        id: '3',
        name: 'Basic Firearms Safety',
        type: 'competency',
        description: 'Must hold valid Basic Firearms Safety certification'
      }
    ],
    status: 'active'
  }
];

const Certifications: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    validityPeriod: 12,
    requirements: [{ name: '', type: 'other' as const, description: '' }],
    status: 'active' as const
  });

  const filteredCertifications = mockCertificationTypes.filter(cert => 
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, { name: '', type: 'other', description: '' }]
    }));
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleRequirementChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => 
        i === index ? { ...req, [field]: value } : req
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsCreateModalOpen(false);
  };

  const ListView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Certification</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Status</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Validity Period</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Requirements</th>
            <th className="px-4 py-3.5 text-right text-sm font-semibold text-gray-300"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredCertifications.map(cert => (
            <tr key={cert.id} className="hover:bg-gray-750">
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <Award size={20} className="text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{cert.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{cert.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Badge 
                  variant={cert.status === 'active' ? 'success' : 'danger'} 
                  size="sm"
                >
                  {cert.status}
                </Badge>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-300">
                  <Clock size={16} className="text-gray-400 mr-2" />
                  {cert.validityPeriod} months
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-2">
                  {cert.requirements.map((req, index) => (
                    <Badge 
                      key={index} 
                      variant={
                        req.type === 'course' ? 'primary' :
                        req.type === 'competency' ? 'success' : 
                        'warning'
                      } 
                      size="sm"
                    >
                      {req.name}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => navigate(`/certifications/${cert.id}`)}
                >
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCertifications.map(cert => (
        <Card 
          key={cert.id}
          className="hover:border hover:border-blue-600 transition-colors cursor-pointer"
          bordered={false}
          onClick={() => navigate(`/certifications/${cert.id}`)}
        >
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <Award size={24} className="text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-white">{cert.name}</h3>
                  <Badge 
                    variant={cert.status === 'active' ? 'success' : 'danger'} 
                    size="sm"
                    className="mt-2"
                  >
                    {cert.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-400">{cert.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Clock size={16} className="text-gray-400 mr-2" />
                Validity: {cert.validityPeriod} months
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Requirements</h4>
              <div className="flex flex-wrap gap-2">
                {cert.requirements.map((req, index) => (
                  <Badge 
                    key={index} 
                    variant={
                      req.type === 'course' ? 'primary' :
                      req.type === 'competency' ? 'success' : 
                      'warning'
                    } 
                    size="sm"
                  >
                    {req.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="secondary" 
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/certifications/${cert.id}`);
                }}
              >
                View Details
              </Button>
              <Button 
                size="sm" 
                variant="primary" 
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle edit action
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Certifications</h1>
          <p className="text-gray-400 mt-1">
            Manage certification types and requirements
          </p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Certification
        </Button>
      </div>
      
      <Card>
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search certifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                leftIcon={<Filter size={16} />}
                size="sm"
              >
                Filters
              </Button>
              
              <div className="border-l border-gray-700 pl-2 flex space-x-1">
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          {viewMode === 'list' ? <ListView /> : <GridView />}
        </div>
      </Card>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Certification"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Certification Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter certification name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter certification description"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Validity Period (months)"
              type="number"
              value={formData.validityPeriod.toString()}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                validityPeriod: parseInt(e.target.value) || 0
              }))}
              leftIcon={<Calendar size={16} />}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-300">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  status: e.target.value as 'active' | 'inactive'
                }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Requirements
              </label>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                leftIcon={<Plus size={14} />}
                onClick={handleAddRequirement}
              >
                Add Requirement
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.requirements.map((req, index) => (
                <div key={index} className="p-4 bg-gray-750 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                      label="Requirement Name"
                      value={req.name}
                      onChange={(e) => handleRequirementChange(index, 'name', e.target.value)}
                      placeholder="Enter requirement name"
                    />
                    
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-gray-300">Type</label>
                      <select
                        value={req.type}
                        onChange={(e) => handleRequirementChange(index, 'type', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="course">Course</option>
                        <option value="competency">Competency</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Description
                    </label>
                    <textarea
                      value={req.description}
                      onChange={(e) => handleRequirementChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Describe the requirement"
                    />
                  </div>

                  {index > 0 && (
                    <div className="mt-4 flex justify-end">
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveRequirement(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsCreateModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isLoading}
            >
              Create Certification
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Certifications;