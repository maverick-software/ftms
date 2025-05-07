import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Building2, Users, Mail, Phone, MoreHorizontal, List, LayoutGrid } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Modal from '../components/modals/Modal';
import { useOrganizations, useCreateOrganization } from '../hooks/useOrganizations';
import { Database } from '../lib/database.types';

type Organization = Database['public']['Tables']['organizations']['Row'];

const Organizations: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    contact_person: '',
    email: '',
    phone: ''
  });

  const { data: organizations = [], isLoading, error } = useOrganizations();
  const createOrganization = useCreateOrganization();

  const filteredOrganizations = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.contact_person.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrganization.mutateAsync(formData);
      setIsCreateModalOpen(false);
      setFormData({
        name: '',
        type: '',
        contact_person: '',
        email: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error creating organization:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center text-red-500">
          <p>Error loading organizations</p>
          <p className="text-sm">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  const ListView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Organization</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Type</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Contact Person</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Contact Info</th>
            <th className="px-4 py-3.5 text-right text-sm font-semibold text-gray-300"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredOrganizations.map(org => (
            <tr key={org.id} className="hover:bg-gray-750">
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <Building2 size={20} className="text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{org.name}</p>
                    <Badge 
                      variant={org.status === 'active' ? 'success' : 'warning'} 
                      size="sm"
                      className="mt-1"
                    >
                      {org.status}
                    </Badge>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Badge variant="primary" size="sm">{org.type}</Badge>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                {org.contact_person}
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-300">
                  <div className="flex items-center">
                    <Mail size={14} className="text-gray-400 mr-2" />
                    {org.email}
                  </div>
                  <div className="flex items-center mt-1">
                    <Phone size={14} className="text-gray-400 mr-2" />
                    {org.phone}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => navigate(`/organizations/${org.id}`)}
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
      {filteredOrganizations.map(org => (
        <Card 
          key={org.id}
          className="hover:border hover:border-blue-600 transition-colors cursor-pointer"
          bordered={false}
          onClick={() => navigate(`/organizations/${org.id}`)}
        >
          <div className="p-4 space-y-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <Building2 size={24} className="text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-white">{org.name}</h3>
                  <Badge variant="primary" size="sm" className="mt-1">{org.type}</Badge>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-300">
                <Users size={16} className="text-gray-400 mr-2" />
                Members
              </div>
              <div className="flex items-center text-gray-300">
                <Mail size={16} className="text-gray-400 mr-2" />
                {org.email}
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="text-gray-400 mr-2" />
                {org.phone}
              </div>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button 
                size="sm" 
                variant="secondary" 
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/organizations/${org.id}`);
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
                  navigate(`/organizations/${org.id}/edit`);
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
          <h1 className="text-2xl font-bold text-white">Organizations</h1>
          <p className="text-gray-400 mt-1">
            Manage partner organizations and their students
          </p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add Organization
        </Button>
      </div>
      
      <Card>
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search organizations..."
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
        title="Add Organization"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Organization Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                leftIcon={<Building2 size={16} />}
                placeholder="Enter organization name"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-300">Organization Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full min-w-[240px] bg-gray-700 border border-gray-600 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select type</option>
                  <option value="Law Enforcement">Law Enforcement</option>
                  <option value="Military">Military</option>
                  <option value="Security">Security</option>
                  <option value="Training Center">Training Center</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <Input
              label="Contact Person"
              value={formData.contact_person}
              onChange={(e) => setFormData(prev => ({ ...prev, contact_person: e.target.value }))}
              leftIcon={<Users size={16} />}
              placeholder="Enter contact person name"
              required
            />
            
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              leftIcon={<Mail size={16} />}
              placeholder="contact@organization.com"
              required
            />
            
            <Input
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              leftIcon={<Phone size={16} />}
              placeholder="(555) 123-4567"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsCreateModalOpen(false)}
              disabled={createOrganization.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={createOrganization.isPending}
            >
              Create Organization
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Organizations;