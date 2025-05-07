import React, { useState } from 'react';
import { Shield, AlertTriangle, Calendar, Search, MoreHorizontal, Download } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Student } from '../types';
import { mockStudents } from '../data/mockData';

const Insurance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'valid' | 'expiring' | 'expired'>('all');
  
  // Filter students based on search term and insurance status
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.insurance.carryInsuranceProvider.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filterStatus === 'all') return true;
    
    const now = new Date();
    const expiryDate = new Date(student.insurance.carryInsuranceExpirationDate);
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(now.getMonth() + 1);
    
    if (filterStatus === 'valid' && student.insurance.hasValidInsurance) return true;
    if (filterStatus === 'expiring' && expiryDate > now && expiryDate < oneMonthFromNow) return true;
    if (filterStatus === 'expired' && expiryDate < now) return true;
    
    return false;
  });
  
  const getInsuranceStatusColor = (student: Student) => {
    const now = new Date();
    const expiryDate = new Date(student.insurance.carryInsuranceExpirationDate);
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(now.getMonth() + 1);
    
    if (expiryDate < now) return 'danger';
    if (expiryDate < oneMonthFromNow) return 'warning';
    return 'success';
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Insurance Tracking</h1>
          <p className="text-gray-400 mt-1">
            Monitor and manage student insurance coverage
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download size={16} />}
          >
            Export Report
          </Button>
        </div>
      </div>
      
      <Card>
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-4 flex-wrap gap-y-3">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search students or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={16} />}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={filterStatus === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'valid' ? 'success' : 'ghost'}
                size="sm"
                onClick={() => setFilterStatus('valid')}
              >
                Valid
              </Button>
              <Button
                variant={filterStatus === 'expiring' ? 'warning' : 'ghost'}
                size="sm"
                onClick={() => setFilterStatus('expiring')}
              >
                Expiring
              </Button>
              <Button
                variant={filterStatus === 'expired' ? 'danger' : 'ghost'}
                size="sm"
                onClick={() => setFilterStatus('expired')}
              >
                Expired
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Student</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Carry Insurance</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Policy Number</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Expiration</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Umbrella Insurance</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-300"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-750">
                    <td className="whitespace-nowrap px-3 py-4">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
                          {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-white">{student.firstName} {student.lastName}</p>
                          <p className="text-xs text-gray-400">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                      <div className="flex items-center">
                        <Shield size={16} className="mr-2 text-blue-400" />
                        {student.insurance.carryInsuranceProvider}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                      {student.insurance.carryInsurancePolicyNumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span className={`text-${getInsuranceStatusColor(student)}-400`}>
                          {formatDate(student.insurance.carryInsuranceExpirationDate)}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                      {student.insurance.umbrellaInsuranceProvider}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <Badge 
                        variant={getInsuranceStatusColor(student) as any} 
                        size="sm"
                      >
                        {getInsuranceStatusColor(student) === 'danger' && (
                          <AlertTriangle size={12} className="mr-1" />
                        )}
                        {getInsuranceStatusColor(student) === 'success' ? 'Valid' : 
                         getInsuranceStatusColor(student) === 'warning' ? 'Expiring Soon' : 'Expired'}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-right">
                      <button className="text-gray-400 hover:text-white">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Insurance;