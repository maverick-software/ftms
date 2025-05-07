import React from 'react';
import { MoreHorizontal, ArrowUpRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Student } from '../../types';

interface RecentStudentsProps {
  students: Student[];
}

const RecentStudents: React.FC<RecentStudentsProps> = ({ students }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
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
  
  const renderInsuranceStatus = (hasValidInsurance: boolean) => {
    return hasValidInsurance 
      ? <Badge variant="success" size="sm">Insured</Badge>
      : <Badge variant="danger" size="sm">Uninsured</Badge>;
  };
  
  return (
    <Card
      title="Recent Students"
      subtitle="Latest student enrollments and updates"
      headerAction={
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal size={20} />
        </button>
      }
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Student</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Insurance</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">Enrolled</th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-300"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {students.map((student) => (
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
                <td className="whitespace-nowrap px-3 py-4">
                  {renderStatus(student.status)}
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  {renderInsuranceStatus(student.insurance.hasValidInsurance)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                  {formatDate(student.enrollmentDate)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-right">
                  <button className="text-blue-400 hover:text-blue-300">
                    <ArrowUpRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentStudents;