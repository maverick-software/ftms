import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  Calendar,
  LayoutGrid,
  List,
  Building2
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { mockStudents } from '../data/mockData';

const Students: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  const filteredStudents = mockStudents.filter(student => 
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const renderStatus = (status: string) => {
    const statusProps = {
      active: { variant: 'success' as const, label: 'Active' },
      inactive: { variant: 'danger' as const, label: 'Inactive' },
      pending: { variant: 'warning' as const, label: 'Pending' }
    };
    
    const { variant, label } = statusProps[status as keyof typeof statusProps] || 
                               statusProps.pending;
    
    return <Badge variant={variant} size="sm">{label}</Badge>;
  };
  
  const getInsuranceStatusBadge = (student: typeof mockStudents[0]) => {
    if (!student.insurance.hasValidInsurance) {
      return <Badge variant="danger" size="sm">Uninsured</Badge>;
    }
    
    const expiryDate = new Date(student.insurance.carryInsuranceExpirationDate);
    const now = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(now.getMonth() + 1);
    
    if (expiryDate < oneMonthFromNow) {
      return <Badge variant="warning" size="sm">Expiring Soon</Badge>;
    }
    
    return <Badge variant="success" size="sm">Insured</Badge>;
  };

  const ListView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Student</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Organization</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Status</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Insurance</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Contact</th>
            <th className="px-4 py-3.5 text-left text-sm font-semibold text-gray-300">Enrolled</th>
            <th className="px-4 py-3.5 text-right text-sm font-semibold text-gray-300"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {filteredStudents.map(student => (
            <tr key={student.id} className="hover:bg-gray-750">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-xs text-gray-400">{student.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-300">
                  <Building2 size={16} className="text-gray-400 mr-2" />
                  {student.organization?.name || 'Independent'}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {renderStatus(student.status)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {getInsuranceStatusBadge(student)}
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-300">
                  <div className="flex items-center">
                    <Phone size={14} className="text-gray-400 mr-2" />
                    {student.phone}
                  </div>
                  <div className="flex items-center mt-1">
                    <MapPin size={14} className="text-gray-400 mr-2" />
                    {student.city}, {student.state}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                {new Date(student.enrollmentDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => navigate(`/students/${student.id}`)}
                >
                  View Profile
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredStudents.map(student => (
        <Card 
          key={student.id}
          className="hover:border hover:border-blue-600 transition-colors cursor-pointer"
          bordered={false}
          onClick={() => navigate(`/students/${student.id}`)}
        >
          <div className="p-4 space-y-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
                  {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-white">
                    {student.firstName} {student.lastName}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {renderStatus(student.status)}
                    {getInsuranceStatusBadge(student)}
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-300">
                <Building2 size={16} className="text-gray-400 mr-2" />
                {student.organization?.name || 'Independent'}
              </div>
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
                {student.city}, {student.state}
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar size={16} className="text-gray-400 mr-2" />
                Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
              </div>
              <div className="flex items-center text-gray-300">
                <Shield size={16} className="text-gray-400 mr-2" />
                {student.insurance.carryInsuranceProvider}
              </div>
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button 
                size="sm" 
                variant="secondary" 
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/students/${student.id}`);
                }}
              >
                Profile
              </Button>
              <Button 
                size="sm" 
                variant="primary" 
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle courses action
                }}
              >
                Courses
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
          <h1 className="text-2xl font-bold text-white">Students</h1>
          <p className="text-gray-400 mt-1">
            Manage all student information and enrollments
          </p>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => navigate('/students/new')}
        >
          Add Student
        </Button>
      </div>
      
      <Card>
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search students..."
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
    </div>
  );
};

export default Students;