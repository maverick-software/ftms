import React from 'react';
import { Calendar, Building2, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { DashboardStats } from '../../types';

interface RenewalCardProps {
  renewals: DashboardStats['upcomingRenewals'];
}

const RenewalCard: React.FC<RenewalCardProps> = ({ renewals }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card title="Upcoming Renewals" subtitle="Students and organizations requiring attention">
      <div className="p-4 space-y-6">
        {/* Student Renewals */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Student Certifications</h4>
          {renewals.students.length > 0 ? (
            <div className="space-y-3">
              {renewals.students.map(({ student, certifications, daysUntilExpiration }) => (
                <div key={student.id} className="bg-gray-750 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm">
                        {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {student.organization?.name || 'Independent'}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={daysUntilExpiration <= 15 ? 'danger' : 'warning'} 
                      size="sm"
                    >
                      {daysUntilExpiration} days
                    </Badge>
                  </div>
                  <div className="mt-2 space-y-1">
                    {certifications.map(cert => (
                      <div key={cert.id} className="flex items-center text-sm">
                        <Calendar size={14} className="text-gray-400 mr-2" />
                        <span className="text-gray-300">{cert.name}</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-400">
                          Expires {formatDate(cert.expirationDate)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No upcoming student renewals</p>
          )}
        </div>

        {/* Organization Renewals */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Organization Renewals</h4>
          {renewals.organizations.length > 0 ? (
            <div className="space-y-3">
              {renewals.organizations.map(({ organization, studentCount, nextRenewalDate }) => (
                <div key={organization.id} className="bg-gray-750 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <Building2 size={20} className="text-blue-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">{organization.name}</p>
                        <p className="text-xs text-gray-400">{studentCount} students</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">
                        {formatDate(nextRenewalDate)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No upcoming organization renewals</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RenewalCard;