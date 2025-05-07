import React from 'react';
import Card from '../ui/Card';
import { Student } from '../../types';

interface InsuranceStatusCardProps {
  students: Student[];
}

const InsuranceStatusCard: React.FC<InsuranceStatusCardProps> = ({ students }) => {
  // Calculate insurance stats
  const validInsurance = students.filter(student => student.insurance.hasValidInsurance);
  const expiringInsurance = students.filter(student => {
    const expiryDate = new Date(student.insurance.carryInsuranceExpirationDate);
    const now = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(now.getMonth() + 1);
    
    return expiryDate > now && expiryDate < oneMonthFromNow;
  });
  
  const expiredInsurance = students.filter(student => {
    const expiryDate = new Date(student.insurance.carryInsuranceExpirationDate);
    const now = new Date();
    
    return expiryDate < now;
  });
  
  const validPercentage = Math.round((validInsurance.length / students.length) * 100);
  
  // Get the three most urgent cases (expired or expiring soon)
  const urgentCases = [...expiredInsurance, ...expiringInsurance]
    .sort((a, b) => {
      const dateA = new Date(a.insurance.carryInsuranceExpirationDate);
      const dateB = new Date(b.insurance.carryInsuranceExpirationDate);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3);
  
  return (
    <Card title="Insurance Status" subtitle="Overview of student insurance coverage">
      <div className="p-3">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Valid Insurance</span>
            <span className="text-sm font-medium text-white">{validPercentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${validPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-gray-750">
            <p className="text-sm text-gray-400">Valid</p>
            <p className="text-xl font-bold text-green-400">{validInsurance.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-750">
            <p className="text-sm text-gray-400">Expiring Soon</p>
            <p className="text-xl font-bold text-amber-400">{expiringInsurance.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-gray-750">
            <p className="text-sm text-gray-400">Expired</p>
            <p className="text-xl font-bold text-red-400">{expiredInsurance.length}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Urgent Cases</h4>
          {urgentCases.length > 0 ? (
            <ul className="space-y-2">
              {urgentCases.map(student => (
                <li key={student.id} className="text-sm flex justify-between p-2 bg-gray-750 rounded">
                  <div>
                    <span className="text-white">{student.firstName} {student.lastName}</span>
                    <p className="text-xs text-gray-400">{student.insurance.carryInsuranceProvider}</p>
                  </div>
                  <span className={`text-${new Date(student.insurance.carryInsuranceExpirationDate) < new Date() ? 'red' : 'amber'}-400`}>
                    {new Date(student.insurance.carryInsuranceExpirationDate).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No urgent cases</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default InsuranceStatusCard;